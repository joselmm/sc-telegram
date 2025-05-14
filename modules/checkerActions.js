
import { connect, onMessageEvent, sendMessageByUserName, closeConnection } from "./telegramActions.js";
import { generateCardFromString } from "./genCard.js";
import colors from "colors/safe.js";
export var par = null;
var queue = [];
var attempts = 0;
var foundLives = 0;
var lastCardSentCommand = "";

export async function startChecking(args) {
    queue=[];
    attempts = 0;
    par = args;
    foundLives=0;
    lastCardSentCommand = "";
    
    try {
        
        await connect();
        
        onMessageEvent({ on: "edit", handler: handleMessageEdited, userName: par.userName });
        onMessageEvent({ on: "new", handler: handleNewMessage, userName: par.userName });
        
        console.log(colors.bgCyan("Se comenzon a checkear "+args.gate+" "+args.bin)) 
        sendCard({ bin: par.bin, gate: par.gate })

    } catch (err) {
        console.log(err)
        debugger
        await closeConnection();
        throw new Error(err.message)
    }
}

export async function stopChecking() {

   
    await closeConnection();

}



async function handleMessageEdited(event) {
    const message = event.message;
    var text = message.message;
    var cardRegex = /\d{16,16}\|\d{2,2}\|\d{2,4}\|\d{3,4}/;

    // Checks if it's a private message (from user or bot)

    // prints sender id
    var sender = await message.getSender();
    var cardMatch = text.match(cardRegex);
    var cardNumber = cardMatch[0];
    

    if (sender.username === par.userName && cardMatch.length > 0 && text.includes(par.live_if_contains)) {
        text+="\n\n*Bin:* `"+par.gate+" "+par.bin+"`"
        await sendMessageByUserName({ userName: "me", message: text }, () => {
            console.log(colors.green("Se encontro y se envio live " + cardMatch + " a mensajes guardados"))
        });
        foundLives++;
        debugger
    }

    var cardIndex = queue.indexOf(cardNumber)
    if (cardIndex >= 0) {
        queue.splice(cardIndex)
        attempts++;
        
        console.log(colors.red("Intento "+attempts+", La tarjeta recibida " + cardNumber + " se borro de la cola"))
        
        if (attempts === par.max_atemps_per_bin) {
            
            console.log("Se termino de checkear por intentos maximos")
            return await closeConnection();
        }

        if(foundLives===par.num_to_find){
             console.log("Se termino de checkear por lives encontradas maximas")
            return await closeConnection();
        }
        debugger
    } else {
        console.log("La tarjeta recibida " + cardNumber + " no esta en la cola y se omitira")
    }


    debugger
    await waitForTimeout(par.to_wait_card_send * 1000);
    sendCard({ gate: par.gate, bin: par.bin })
    debugger
    // read message
    /* if (message.text == "hello") {
        /* const sender = await message.getSender();
        console.log("sender is", sender);
        await client.sendMessage(sender, {
            message: `hi your id is ${message.senderId}`
        }); */

}


async function handleNewMessage(event) {
    const message = event.message;
    const text = message.message;
    var toWaitRegex = / \d+ /;
    var secondsToWait = text.match(toWaitRegex);
    if (text.includes("⚠️ Rate limit: ") && secondsToWait && secondsToWait.length > 0) {
        console.log("se detecto antibot, esperando por" + secondsToWait[0] + "segundos");
        await waitForTimeout(parseInt(secondsToWait[0]) * 1000);
        debugger

        sendCard({  message: lastCardSentCommand })
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
        if (!queue.includes(card)) queue.push(card)
        
    })
}