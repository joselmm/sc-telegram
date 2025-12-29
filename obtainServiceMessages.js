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
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });

    await client.start({
        phoneNumber: async () => await input.text("📱 Número de teléfono: "),
        password: async () => await input.text("🔐 Contraseña (2FA si aplica): "),
        phoneCode: async () => await input.text("💬 Código de Telegram: "),
        onError: (err) => console.error(err),
    });

    console.log("✅ Sesión iniciada");

    const chat = process.argv[2] || "https://t.me/netf32";
    const entity = await client.getEntity(chat);

    const username =
        entity.username ||
        entity.title?.replace(/\s+/g, "_") ||
        chat.replace(/https?:\/\/t\.me\//, "");

    let offsetId = 0;
    const idsSet = new Set();

    console.log("📡 Descargando mensajes de servicio...");

    while (true) {
        const history = await client.invoke(
            new Api.messages.GetHistory({
                peer: entity,
                offsetId,
                limit: 100,
            })
        );

        if (!history.messages.length) break;

        const serviceOnly = history.messages.filter(
            m => m.className === "MessageService"
        );

        for (const msg of serviceOnly) {
            if (msg.fromId?.userId) {
                idsSet.add(String(msg.fromId.userId));
            }

            if (msg.action?.users) {
                for (const uid of msg.action.users) {
                    if (uid) idsSet.add(String(uid));
                }
            }

            if (msg.action?.userId) {
                idsSet.add(String(msg.action.userId));
            }
        }

        offsetId = history.messages.at(-1).id;

        console.log(`👥 Miembros únicos hasta ahora: ${idsSet.size}`);

        if (history.messages.length < 100) break;
    }

    const uniqueIds = Array.from(idsSet).map(id => ({ id }));

    const OUTPUT_FILE = `miembros-unicos-${username}.json`;
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(uniqueIds, null, 2));

    console.log(`✅ Total final: ${uniqueIds.length} miembros únicos`);
    console.log(`📄 Archivo generado: "${OUTPUT_FILE}"`);

    await client.disconnect();
})();
