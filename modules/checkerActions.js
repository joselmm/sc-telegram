import { connect, onMessageEvent, sendMessageByUserName, closeConnection } from "./telegramActions.js";
import { generateCardFromString } from "./genCard.js";
import colors from "colors/safe.js";
import Timer from 'cli-timer';

export var par = null;
var lastSendTs = null;
var checking = false;
var cardRegex = /\d{16,16}\|\d{2,2}\|\d{2,4}\|\d{3,4}/;
var queue = [];
var attempts = 0;
var foundLives = 0;
var lastCardSentCommand = "";
var stop = false;
var maxAttempsTimeout = 0;

export var arrayBins = [];
export var arrayGates = [];
var currentBinIndex = 0;
var currentGateIndex = 0;

export async function monitorTimeout() {
    await new Promise(r => setTimeout(r, 1000));
    if (maxAttempsTimeout === 3) {
        maxAttempsTimeout = 0;
        await advanceToNextGate();
    }

    const hasQueue = queue.length > 0;
    if (
        hasQueue &&
        lastSendTs &&
        Date.now() - lastSendTs >= (par.timeout * 1000) &&
        lastCardSentCommand &&
        lastCardSentCommand.includes(queue[queue.length - 1])
    ) {
        queue.pop();
        console.warn("Se superó el tiempo de espera, enviando nueva tarjeta");
        maxAttempsTimeout++;
        sendCard({ bin: par.bin, gate: par.gate });
    }

    monitorTimeout();
}

export async function startChecking(args) {
    if (checking) throw new Error("Ya se está checkeando");
    checking = true;

    queue = [];
    attempts = 0;
    foundLives = 0;
    stop = false;
    lastCardSentCommand = "";

    arrayBins = String(args.bin || "")
        .split(",")
        .map(b => b.trim())
        .filter(Boolean);

    if (arrayBins.length === 0) {
        checking = false;
        throw new Error("No se proporcionó ningún bin válido.");
    }

    arrayGates = String(args.gate || "")
        .split(",")
        .map(g => g.trim())
        .filter(Boolean);

    if (arrayGates.length === 0) {
        checking = false;
        throw new Error("No se proporcionó ningún gate válido.");
    }

    currentBinIndex = 0;
    currentGateIndex = 0;

    par = args;
    par.bin = arrayBins[currentBinIndex];
    par.gate = arrayGates[currentGateIndex];

    try {
        monitorTimeout();

        await connect();


        onMessageEvent({ on: "edit", handler: handleMessageEdited, userName: par.userName });
        onMessageEvent({ on: "new", handler: handleNewMessage, userName: par.userName });

        console.log(colors.bgCyan(`Se comenzó a checkear (bins: ${arrayBins.join(", ")}, gates: ${arrayGates.join(", ")})`));
        sendCard({ bin: par.bin, gate: par.gate });

    } catch (err) {
        console.log(err);
        await closeConnection();
        throw new Error(err.message);
    }
}

export async function stopChecking() {
    checking = false;
    await closeConnection();
}

export function stopNextTime() {
    stop = true;
}

async function handleMessageEdited(event) {
    const message = event.message;
    var text = message.message;

    if (text.match(cardRegex)) {
        await handleCardCheckResult(event);
    }
}

async function handleCardCheckResult(event) {
    const message = event.message;
    var text = message.message;

    var sender = await message.getSender();

    var cardMatch = text.match(cardRegex);
    var cardNumber = cardMatch ? cardMatch[0] : null;
    cardNumber = processCardFormat(cardNumber);

    if (sender.username.toLowerCase() === par.userName.toLowerCase().replace("@", "") && cardMatch?.length > 0 && text.includes(par.live_if_contains)) {
        text += `\n\n*Bin:* \`${par.bin}\` *Gate:* \`${par.gate}\``;
        await sendMessageByUserName({ userName: par.me, message: text }, () => {
            console.log(colors.green(`Se encontró y se envió live ${cardMatch} a ${par.me}`));
        });
        foundLives++;
    }

    var cardIndex = queue.map(card => processCardFormat(card)).indexOf(cardNumber);
    var isResult = eval(par.eval_result);

    if (cardIndex >= 0 && isResult) {

        queue.splice(cardIndex, 1);
        attempts++;
        maxAttempsTimeout = 0; // Reset max attempts counter after successful processing
        console.log(colors.red(`Intento ${attempts} (bin ${currentBinIndex + 1}/${arrayBins.length}, gate ${currentGateIndex + 1}/${arrayGates.length}). La tarjeta ${cardNumber} se borró de la cola`));

        if (attempts === par.max_atemps_per_bin) {
            console.log(colors.yellow(`Se alcanzó el máximo de intentos para el BIN actual: ${par.bin}`));
            const advanced = await advanceToNextBin();
            if (!advanced) {
                return;
            }
            return;
        }

        if (foundLives === par.num_to_find) {
            console.log(colors.yellow(`Se alcanzó el número máximo de lives (${foundLives}) para el BIN actual: ${par.bin}`));
            const advanced = await advanceToNextBin();
            if (!advanced) {
                console.log(colors.bgMagenta("No hay más BINs ni GATES. Se termina el proceso."));
                return await stopChecking();
            }
            return; // continúa con el siguiente BIN automáticamente
        }


        if (stop) {
            console.log("Se terminó de checkear por petición externa");
            return await stopChecking();
        }
    }

    await waitForTimeout(par.to_wait_card_send * 1000);

    if (queue.length === 0) {
        sendCard({ gate: par.gate, bin: par.bin });
    }
}

async function handleNewMessage(event) {
    const message = event.message;
    const text = message.message;

    if (text.match(cardRegex)) {
        await handleCardCheckResult(event);
    }

    var toWaitRegex = new RegExp(par.antibot_seconds_regex);
    var secondsToWait = text.match(toWaitRegex);

    if (text.includes("Resuelve")) {
        var captchaResolution = (text.match(/ \d+\n/)[0]).trim();
        if (captchaResolution) {
            await sendMessageByUserName({ userName: par.userName, message: "/captcha " + captchaResolution });
            console.log("Se solucionó captcha " + captchaResolution);
            sendCard({ message: lastCardSentCommand, anyway: true });
        }
    }

    if (text.includes(par.antibot_if_contains) && secondsToWait && secondsToWait.length > 0) {
        console.log("Se detectó antibot, esperando por " + secondsToWait[0] + " segundos");
        var millisecondsToWait = parseInt(secondsToWait[0]) * 1000;

        await waitForTimeout(millisecondsToWait);

        sendCard({ message: lastCardSentCommand });
    }
}

export function waitForTimeout(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function advanceToNextBin() {
    queue = [];
    lastCardSentCommand = "";

    if (currentBinIndex < arrayBins.length - 1) {
        currentBinIndex++;
        par.bin = arrayBins[currentBinIndex];
        attempts = 0;
        foundLives = 0; // 🔁 Reiniciar contador de lives al cambiar de BIN
        console.log(colors.bgCyan(`Cambiando al siguiente BIN (${currentBinIndex + 1}/${arrayBins.length}): ${par.bin}`));
        sendCard({ gate: par.gate, bin: par.bin });
        return true;
    }
    else {
        // Avanzar al siguiente gate
        const advancedGate = await advanceToNextGate();
        if (advancedGate) {
            currentBinIndex = 0; // Reiniciar los bins
            par.bin = arrayBins[currentBinIndex];
            sendCard({ gate: par.gate, bin: par.bin });
        }
        return false; // No hay más bins ni gates
    }
}

async function advanceToNextGate() {
    if (currentGateIndex < arrayGates.length - 1) {
        currentGateIndex++;
        par.gate = arrayGates[currentGateIndex];
        attempts = 0;
        console.log(colors.bgCyan(`Cambiando al siguiente gate (${currentGateIndex + 1}/${arrayGates.length}): ${par.gate}`));
        return true; // Hay más gates
    } else {
        console.log(colors.bgMagenta("No hay más gates. Se termina el proceso."));
        await stopChecking();
        return false; // No hay más gates
    }
}

function sendCard({ gate, bin, message, anyway = false }) {
    if (!anyway && lastSendTs && (Date.now() - lastSendTs <= 3000)) return;

    let card;
    let command;

    if (!message && gate && bin) {
        card = generateCardFromString(bin);
        command = `${gate} ${card}`;
        lastCardSentCommand = "" + command;
    }

    lastSendTs = Date.now();

    sendMessageByUserName({ userName: par.userName, message: message ? message : command }, () => {
        console.log("Se envió tarjeta " + (card || lastCardSentCommand));
        if (message) card = lastCardSentCommand.split(" ")[1];
        if (card && !queue.includes(card)) queue.push(card);
    });
}

function processCardFormat(cardNumber) {
    var [a, b, yearB, e] = par.bin.split("|");
    var [numberN, monthN, yearN, cvvN] = cardNumber.trim().split("|");
    if (yearB.length === yearN.length) return cardNumber;
    if (yearB.length === 4) return `${numberN}|${monthN}|20${yearN}|${cvvN}`;
    if (yearB.length === 2) return `${numberN}|${monthN}|${yearN.slice(2)}|${cvvN}`;
}