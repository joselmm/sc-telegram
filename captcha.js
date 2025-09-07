import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";
import readline from "readline";
import { NewMessage } from "telegram/events/index.js";
import { EditedMessage } from "telegram/events/EditedMessage.js";
import { solveCaptcha } from "./modules/captchaSolver.js"

import cors from "cors";
import express from "express"
const port = process.env.PORT || 3000;
let lastImageTime = null;
const WATCHDOG_INTERVAL = 10 * 1000; // revisa cada 10 segundos
const IMAGE_TIMEOUT = 2 * 60 * 1000; // 2 minutos

// chat de destino donde mandar el "Start work"
const WATCHDOG_TARGET = "@My2CaptchaBot"; // usa tu chat/peer donde debe llegar
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
        503474174n
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
    const groupWhereToSave = await client.getEntity(-4687999165);

    // Handlers
    //client.addEventHandler(handleMessage, new EditedMessage({ chats: filtroChats, incoming: true }));
    client.addEventHandler(handleMessage, new NewMessage({ chats: filtroChats, incoming: true }));

    // ================== Watchdog ==================


    function startWatchdog() {
        // mandar "Start work" al iniciar
        client.sendMessage(WATCHDOG_TARGET, { message: "Start work" })
            .then(() => console.log("🚀 Mensaje inicial 'Start work' enviado"))
            .catch(err => console.error("❌ Error enviando mensaje inicial:", err));

        // lanzar el vigilador
        setInterval(async () => {
            try {
                if (!lastImageTime) return; // aún no se recibió ninguna imagen

                const elapsed = Date.now() - lastImageTime;
                if (elapsed > IMAGE_TIMEOUT) {
                    console.log("⏰ Han pasado más de 2 minutos sin imágenes. Enviando 'Start work'...");
                    await client.sendMessage(WATCHDOG_TARGET, { message: "Start work" });
                    lastImageTime = Date.now(); // reinicia contador para evitar spam
                }
            } catch (err) {
                console.error("❌ Error en watchdog:", err);
            }
        }, WATCHDOG_INTERVAL);
    }
    // =============================================
    startWatchdog();

    // dentro de tu handleMessage:
    async function handleMessage(event) {
        const msg = event.message;
        const sender = await msg.getSender().catch(() => null);
        const username = sender?.username || "desconocido";
        const messageText = msg.message || "";

        console.log("📩 Nuevo mensaje recibido:");
        console.log("   🆔 SenderId:", msg.senderId?.toString());
        console.log("   👤 Username:", username);
        console.log("   💬 Texto:", messageText || "(sin texto)");

        if (msg.media && msg.photo) {
            try {
                console.log("   ⬇️  Descargando foto...");
                const buffer = await client.downloadMedia(msg, { outputFile: false });
                console.log("   ✅ Foto descargada. Tamaño:", buffer.length, "bytes");

                // actualizar vigilador
                lastImageTime = Date.now();

                const base64 = buffer.toString("base64");
                console.log("   🔄 Convertida a base64. Primeros 100 chars:", base64.slice(0, 100) + "...");

                const mimeType = "image/jpeg";
                const dataUrl = `data:${mimeType};base64,${base64}`;

                console.log("   🤖 Enviando imagen al solver...");
                const solved = await solveCaptcha(dataUrl, { apiKey: process.env.GROQ_API_KEY });
                console.log("   ✅ Solver respondió:", solved);

                console.log("   📤 Enviando respuesta al usuario...");
                await client.sendMessage(msg.senderId, {
                    message: solved.solved,
                });
                console.log("   ✅ Respuesta enviada:", solved.solved);

            } catch (error) {
                console.error("   ❌ Error en procesamiento de foto:", error);
            }
        }
    }

})();
