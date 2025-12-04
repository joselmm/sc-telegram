import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import { Api } from "telegram/tl/index.js";
import input from "input";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


const apiId = process.env.TELEGRAM_API_ID;
const apiHash = process.env.TELEGRAM_API_HASH;

const stringSession = new StringSession(process.env.SC_TELEGRAM_SESSION_STRING);


(async () => {
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });

    // 🔹 Iniciar sesión (solo la primera vez)
    await client.start({
        phoneNumber: async () => await input.text("📱 Número de teléfono: "),
        password: async () => await input.text("🔐 Contraseña (2FA si aplica): "),
        phoneCode: async () => await input.text("💬 Código de Telegram: "),
        onError: (err) => console.error(err),
    });

    console.log("✅ Sesión iniciada");
    console.log("Session string:\n", client.session.save());

    // Cambia esto por el grupo/canal que quieras analizar
    const chat = "https://t.me/mwcmd_canal";
    const entity = await client.getEntity(chat);

    let offsetId = 0;
    const serviceMessages = [];

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

        // 🔸 Filtrar solo mensajes de servicio
        const serviceOnly = history.messages.filter(m => m.className === "MessageService");

        for (const msg of serviceOnly) {
            const action = msg.action.className;
            const from = msg.fromId?.userId || null;
            let targetIds = [];

            // Algunos tipos de acciones contienen otros usuarios
            if (msg.action.users) targetIds = msg.action.users;
            if (msg.action.userId) targetIds.push(msg.action.userId);

            serviceMessages.push({
                id: msg.id,
                type: action,
                actorId: from,
                targetIds,
                date: new Date(msg.date * 1000).toISOString(),
            });
        }

        // Pasar al siguiente bloque
        offsetId = history.messages.at(-1).id;
        console.log(`📥 Total hasta ahora: ${serviceMessages.length}`);

        // Detener si llegamos al final
        if (history.messages.length < 100) break;
    }

    // 🔹 Guardar en archivo JSON
    const fileName = "serviceMessages.json";
    fs.writeFileSync(fileName, JSON.stringify(serviceMessages, null, 2));

    console.log(`✅ Guardado ${serviceMessages.length} mensajes de servicio en "${fileName}"`);
    await client.disconnect();
})();
