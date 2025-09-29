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

// ✅ NUEVO: soporte multi-bin
export var arrayBins = [];         // siempre declarado/creado
var currentBinIndex = 0;           // índice del bin actual

export async function monitorTimeout() {
    await new Promise(r => setTimeout(r, 1000));

    // Evita errores si la cola está vacía o no hay último comando
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
        sendCard({ bin: par.bin, gate: par.gate });
    }

    // Mantén el loop de monitoreo
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

    // ✅ Preparar arrayBins a partir de args.bin (puede venir como CSV)
    arrayBins = String(args.bin || "")
        .split(",")
        .map(b => b.trim())
        .filter(Boolean);

    if (arrayBins.length === 0) {
        checking = false;
        throw new Error("No se proporcionó ningún bin válido.");
    }

    currentBinIndex = 0;

    // Guardamos par y fijamos el bin inicial
    par = args;
    par.bin = arrayBins[currentBinIndex];

    try {
        monitorTimeout();

        await connect();

        onMessageEvent({ on: "edit", handler: handleMessageEdited, userName: par.userName });
        onMessageEvent({ on: "new", handler: handleNewMessage, userName: par.userName });

        console.log(colors.bgCyan(`Se comenzó a checkear ${args.gate} (bins: ${arrayBins.join(", ")})`));
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

    // prints sender id
    var sender = await message.getSender();
    var cardMatch = text.match(cardRegex);
    var cardNumber = cardMatch ? cardMatch[0] : null;
    cardNumber = processCardFormat(cardNumber);
    

    if (sender.username === par.userName && cardMatch?.length > 0 && text.includes(par.live_if_contains)) {
        text += "\n\n*Bin:* `" + par.gate + " " + par.bin + "`";
        await sendMessageByUserName({ userName: par.me, message: text }, () => {
            console.log(colors.green("Se encontró y se envió live " + cardMatch + " a " + par.me));
        });
        foundLives++;
    }

    var cardIndex = queue.indexOf(cardNumber);
    var isResult = eval(par.eval_result);

    if (cardIndex >= 0 && isResult) {
        queue.splice(cardIndex, 1);
        attempts++;

        console.log(colors.red(`Intento ${attempts} (bin ${currentBinIndex + 1}/${arrayBins.length}). La tarjeta ${cardNumber} se borró de la cola`));

        // ✅ Si llegamos al máximo de intentos por BIN, pasamos al siguiente BIN
        if (attempts === par.max_atemps_per_bin) {
            console.log(colors.yellow(`Se alcanzó el máximo de intentos para el BIN actual: ${par.bin}`));
            const advanced = await advanceToNextBin();
            if (!advanced) {
                // No hay más bins; stopChecking ya fue llamado dentro de advanceToNextBin
                return;
            }
            // Al avanzar a siguiente BIN, ya se envió una nueva tarjeta; terminamos aquí.
            return;
        }

        if (foundLives === par.num_to_find) {
            console.log("Se terminó de checkear por lives encontradas máximas");
            return await stopChecking();
        }

        if (stop) {
            console.log("Se terminó de checkear por petición externa");
            return await stopChecking();
        }
    }

    await waitForTimeout(par.to_wait_card_send * 1000);

    if (queue.length === 0) {
        // Con multi-bin, par.bin siempre apunta al bin actual
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

// ✅ NUEVO: avanzar al siguiente BIN o terminar si no hay más
async function advanceToNextBin() {
    // Limpiamos estado del BIN actual
    queue = [];
    lastCardSentCommand = "";

    if (currentBinIndex < arrayBins.length - 1) {
        currentBinIndex++;
        par.bin = arrayBins[currentBinIndex];
        attempts = 0; // Reinicia intentos por BIN
        console.log(colors.bgCyan(`Cambiando al siguiente BIN (${currentBinIndex + 1}/${arrayBins.length}): ${par.bin}`));

        // Enviar primera tarjeta del nuevo BIN
        sendCard({ gate: par.gate, bin: par.bin });
        return true;
    } else {
        console.log(colors.bgMagenta("No hay más BINs. Se termina el proceso."));
        await stopChecking();
        return false;
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
