import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";
import fs from "fs";
import { contacts } from "./contacts-array.js";

dotenv.config();

(async () => {
    const apiId = +process.env.TELEGRAM_API_ID;
    const apiHash = process.env.TELEGRAM_API_HASH;
    const session = new StringSession(process.env.SC_TELEGRAM_SESSION_STRING);
    const client = new TelegramClient(session, apiId, apiHash, { connectionRetries: 5 });

    await client.start({retries:5});

    console.log("✅ Conectado correctamente");

    const resultados = [];

    for (let i = 0; i < contacts.length; i++) {
        const phoneNumber = contacts[i];

        try {

            await new Promise(r=>setTimeout(r, 1000))
            const entity = await client.getEntity(phoneNumber);

            resultados.push(JSON.stringify(entity));

            console.log("✔ Existe en Telegram: " + phoneNumber);

        } catch (error) {
            console.log("❌ No existe: " + phoneNumber+", error: "+error.message);

            resultados.push({
                phone: phoneNumber,
                exists: false
            });
        }
    }

    // Guardar JSON
    fs.writeFileSync("resultados PPL.json", JSON.stringify(resultados, null, 2));

    console.log("📁 Archivo guardado: resultados.json");
})();
