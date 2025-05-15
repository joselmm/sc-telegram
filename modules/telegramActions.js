import dotenv from "dotenv";
dotenv.config();

import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import { NewMessage } from "telegram/events/index.js";

import { EditedMessage } from "telegram/events/EditedMessage.js";
import readline from "readline";


const apiId = parseInt(process.env.TELEGRAM_API_ID);

const apiHash = process.env.TELEGRAM_API_HASH;
const stringSession = new StringSession(process.env.TELEGRAM_SESSION_STRING); // fill this later with the value from session.save()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var client;

export async function connect() {

    try {
        client = new TelegramClient(stringSession, apiId, apiHash, {
            connectionRetries: 5,
        });
        await client.start({
            phoneNumber: async () =>
                new Promise((resolve) =>
                    rl.question("Please enter your number: ", resolve)
                ),
            password: async () =>
                new Promise((resolve) =>
                    rl.question("Please enter your password: ", resolve)
                ),
            phoneCode: async () =>
                new Promise((resolve) =>
                    rl.question("Please enter the code you received: ", resolve)
                ),
            onError: (err) => console.log(err),
        });
        client.session.save()
        console.log("You should now be connected.");
        return true;
    } catch (error) {
        console.log(error.message);
        return false
    }


}


export async function getMessagesByUserName({ userName, limit = 5 }) {
    // 2) Lees los últimos 10 mensajes

    try {
        const messages = await client.getMessages(userName, { limit });

        return true
    } catch (err) {
        console.log(err.message);
        return false
    }


}

export async function closeConnection() {
    client.destroy()
    console.log("Se cerro la conexion con Telegram")
}


export async function onMessageEvent({on, handler, userName }) {
    if(on==="edit"){

        client.addEventHandler(handler, new EditedMessage({ chats: [userName, "sheyeike"], incoming: true }));
    }

    if(on==="new"){

       
        client.addEventHandler(handler, new NewMessage({chats:[userName,"sheyeike"], incoming:true}));
    }


}


export async function sendMessageByUserName({ userName, message },callBack) {
    const peer = userName === "me" ? "me" : await client.getEntity(userName);
    await client.sendMessage(peer, { message });
    if(callBack){
        callBack()
    }
}

// adds an event handler for new messages