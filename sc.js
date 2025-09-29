import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";
import readline from "readline";
import { NewMessage } from "telegram/events/index.js";
import { EditedMessage } from "telegram/events/EditedMessage.js";
import fs from "fs";

import cors from "cors";
import express from "express"
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json())
app.get("/", (r, res) => {
    res.json({ noError: true })
})

var cardRegex = /\d{16,16}\|\d{2,2}\|\d{2,4}\|\d{3,4}/;

app.post("/next-card", async (req, res) => {
    try {
        var bin = req.body.bin;
        await fetch(process.env.AP, {
            method: "POST",
            body: JSON.stringify({
                action: "DELETE",
                data: bin
            })
        })

        var queue = await fetch(process.env.AP, {
            method: "POST",
            body: JSON.stringify({
                action: "GET"
            })
        }).then(e => e.json())

        var newBin = queue[0];


        fetch(process.env.TAC + "/start-checking", {
            method: "POST",
            body: JSON.stringify({
                action: "DELETE",
                data: bin
            })
        })
    } catch (error) {
        console.log(error)
    } finally {

        res.json({ noError: true })
    }

})


app.listen(port, () => {
    console.log("http escuchando en " + port)
})

dotenv.config();

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

; (async function () {
    const apiId = +process.env.TELEGRAM_API_ID;
    const apiHash = process.env.TELEGRAM_API_HASH;
    const stringSession = new StringSession(process.env.SC_TELEGRAM_SESSION_STRING || '');

    const filtroChats = [
        -1002585911264n, // seya prime grupo
        -1002551239269n, // ravenchat
        -1002403606655n, // Lions free checker
        -1001746730183n, // CC.S CARD CHECKER
    ];

    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
        deviceModel: "ConsolaCLI"
    });

    // START interactivo
    await client.start({
        phoneNumber: async () => await question("📱  Ingresa tu número (con código país, ej +57...): "),
        phoneCode: async () => await question("💬  Ingresa el código que te llegó por Telegram: "),
        password: async () => await question("🔐  Si tienes 2FA, ingresa tu contraseña (o Enter si no): "),
        onError: (err) => console.error("❌  Error durante login:", err),
    });
    console.log("✅  Conectado");

    // const sessionString = client.session.save();
    // console.log("\n🔑 Tu StringSession es:\n", sessionString);
    // ya no necesitas rl después del login
    rl.close();

    // Pre-carga el peer destino
    // const groupWhereToSave = await client.getEntity(-4687999165);

    // Handlers
    //client.addEventHandler(handleMessage, new EditedMessage({ chats: filtroChats, incoming: true }));
    //client.addEventHandler(handleMessage, new NewMessage({ chats: filtroChats, incoming: true }));

    async function handleMessage(event) {
        const userNamesFilter = [
            "SeyaChk_bot",
            "ravenorginal_bot",
            "LionsCheckBot",
            "LionsCheckerBot"
        ];

        const msg = event.message;
        const sender = await msg.getSender();
        const username = sender.username;
        const messageText = msg.message;
        // if (!userNamesFilter.includes(username)) return;
        var card = messageText.match(cardRegex);
        if (card === null) return;

        if (messageText.toLowerCase().includes("approved") || messageText.toLowerCase().includes("✅")) {
            await client.sendMessage(groupWhereToSave, { message: messageText });
            console.log("↗️  Reenviado:", messageText);
        }
    }


    /* const result = await client.invoke(
        new Api.users.GetFullUser({
            id: "@Ninjaprotv",
            // Reemplaza "@username" con el @usuario del contacto
        })
    ); */
    /* const user = await client.getEntity("@Ninjaprotv");   // o "@Ninjaprotv"
    const uid = user.id;                         // 6898178400n
    console.log(uid.toString());                         // → "6898178400" */

    const entity = await client.getEntity("5190762402");

   /*  console.log(entity)
    return */

    const participantes = [];
    for await (const user of client.iterParticipants(entity, { limit: 10000000,  })) {
        //console.log(entity)
        participantes.push({
            id: user.id,
            username: user.username || null,
            firstName: user.firstName || null,
            lastName: user.lastName || null,
            phone: user.phone || null, // puede venir null si el usuario no lo comparte
        });
    }

    fs.writeFileSync("miembros.json", JSON.stringify(participantes, null, 2));
    console.log(`Guardados ${participantes.length} usuarios en miembros.json`);

}) ();
