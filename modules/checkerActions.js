
import { connect, onMessageEvent, sendMessageByUserName, closeConnection } from "./telegramActions.js";
import { generateCardFromString } from "./genCard.js";
import colors from "colors/safe.js";
import Timer from 'cli-timer';
export var par = null;
var checking = false;
var cardRegex = /\d{16,16}\|\d{2,2}\|\d{2,4}\|\d{3,4}/;
var queue = [];
var attempts = 0;
var foundLives = 0;
var lastCardSentCommand = "";
var stop = false;

export async function startChecking(args) {

    if(checking)throw new Error("Ya se esta checkeando");
    checking=true
    queue = [];
    attempts = 0;
    par = args;
    foundLives = 0;
    stop = false;
    lastCardSentCommand = "";

    try {

        await connect();

        onMessageEvent({ on: "edit", handler: handleMessageEdited, userName: par.userName });
        onMessageEvent({ on: "new", handler: handleNewMessage, userName: par.userName });

        console.log(colors.bgCyan("Se comenzon a checkear " + args.gate + " " + args.bin))
        sendCard({ bin: par.bin, gate: par.gate })

    } catch (err) {
        console.log(err)
        
        await closeConnection();
        throw new Error(err.message)
    }
}

export async function stopChecking() {

    checking=false;
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


    // Checks if it's a private message (from user or bot)

    // prints sender id
    var sender = await message.getSender();
    var cardMatch = text.match(cardRegex);
    var cardNumber = cardMatch ? cardMatch[0] : null;
    cardNumber=processCardFormat(cardNumber);



    if (sender.username === par.userName && cardMatch?.length > 0 && text.includes(par.live_if_contains)) {
        text += "\n\n*Bin:* `" + par.gate + " " + par.bin + "`"
        await sendMessageByUserName({ userName: "me", message: text }, () => {
            console.log(colors.green("Se encontro y se envio live " + cardMatch + " a mensajes guardados"))
        });
        foundLives++;

    }

    var cardIndex = queue.indexOf(cardNumber)
    var isResult = eval(par.eval_result);
    debugger
    if (cardIndex >= 0 && isResult)  {

        queue.splice(cardIndex, 1)
        attempts++;

        console.log(colors.red("Intento " + attempts + ", La tarjeta recibida " + cardNumber + " se borro de la cola"))

        if (attempts === par.max_atemps_per_bin) {

            console.log("Se termino de checkear por intentos maximos")
            return await stopChecking();
        }

        if (foundLives === par.num_to_find) {
            console.log("Se termino de checkear por lives encontradas maximas")
            return await stopChecking();
        }

        if (stop) {
            console.log("Se termino de checkear por peticion externa")

            return await stopChecking();

        }

    } /* else {
        console.log("La tarjeta recibida " + cardNumber + " no esta en la cola y se omitira")
    } */

    await waitForTimeout(par.to_wait_card_send * 1000);
    debugger
    if (queue.length === 0) sendCard({ gate: par.gate, bin: par.bin })
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
            console.log("se soluciono captcha " + captchaResolution);
            sendCard({ message: lastCardSentCommand })
        }
    }

    if (text.includes(par.antibot_if_contains) && secondsToWait && secondsToWait.length > 0) {
        console.log("se detecto antibot, esperando por" + secondsToWait[0] + "segundos");
        var millisecondsToWait = parseInt(secondsToWait[0]) * 1000;

        await waitForTimeout(millisecondsToWait);

        sendCard({ message: lastCardSentCommand })
    }
}

export function waitForTimeout(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}



function sendCard({ gate, bin, message }) {

    if (!message && gate && bin) {
        var card = generateCardFromString(bin);
        var command = `${gate} ${card}`
        lastCardSentCommand = "" + command;
    }

    sendMessageByUserName({ userName: par.userName, message: message ? message : command }, () => {
        console.log("Se envio tarjeta " + (card || lastCardSentCommand));
        if (message) card = lastCardSentCommand.split(" ")[1];

        if (!queue.includes(card)) queue.push(card)
    })
}

function processCardFormat(cardNumber) {
    var [a, b, yearB, e] = par.bin.split("|");
    var [numberN, monthN, yearN, cvvN] = cardNumber.trim().split("|");
    if (yearB.length === yearN.length) return cardNumber;
    if(yearB.length===4)return `${numberN}|${monthN}|20${yearN}|${cvvN}`
    if(yearB.length===2)return `${numberN}|${monthN}|${yearN.slice(2)}|${cvvN}`

}
