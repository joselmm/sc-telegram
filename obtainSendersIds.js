import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import { Api } from "telegram/tl/index.js";
import input from "input";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const apiId = process.env.TELEGRAM_API_ID;
const apiHash = process.env.TELEGRAM_API_HASH;
const stringSession = new StringSession(process.env.SC_TELEGRAM_SESSION_STRING_2);

(async () => {
    const client = new TelegramClient(
        stringSession,
        apiId,
        apiHash,
        { connectionRetries: 5 }
    );

    await client.start({
        phoneNumber: async () => await input.text("📱 Número de teléfono: "),
        password: async () => await input.text("🔐 Contraseña (2FA si aplica): "),
        phoneCode: async () => await input.text("💬 Código de Telegram: "),
        onError: (err) => console.error(err),
    });

    console.log("✅ Sesión iniciada");
    console.log("Session string:\n", client.session.save());

    // 🔹 Grupo o canal a analizar
    const chat = "https://t.me/aprendiendo_streaming";
    const entity = await client.getEntity(chat);

    let offsetId = 0;
    const senderIds = new Set();

    console.log("📡 Descargando historial de mensajes (solo IDs)...");

    while (true) {
        const history = await client.invoke(
            new Api.messages.GetHistory({
                peer: entity,
                offsetId,
                limit: 100,
            })
        );

        if (!history.messages.length) break;

        for (const msg of history.messages) {
            if (!msg.fromId) continue;

            if (msg.fromId.userId) {
                senderIds.add(String(msg.fromId.userId));
            }


        }

        offsetId = history.messages.at(-1).id;
        console.log(`📥 IDs únicos hasta ahora: ${senderIds.size}`);

        if (history.messages.length < 100) break;
    }

    // 🔹 Guardar solo IDs numéricos
    // username del grupo o fallback
    let groupUsername = entity.username;

    if (!groupUsername) {
        const random5 = Math.floor(10000 + Math.random() * 90000);
        groupUsername = `private-group-${random5}`;
    }

    const safeUsername = groupUsername.replace(/[^a-z0-9_-]/gi, "_");
    const fileName = `senders-ids-${safeUsername}.json`;

    fs.writeFileSync(
        fileName,
        JSON.stringify(Array.from(senderIds).map(e => {
            return {
                id: String(e)
            }
        }), null, 2)
    );

    console.log(`✅ Guardados ${senderIds.size} sender IDs en "${fileName}"`);

    await client.disconnect();
})();
