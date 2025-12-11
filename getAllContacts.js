import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

(async () => {
    const apiId = +process.env.TELEGRAM_API_ID;
    const apiHash = process.env.TELEGRAM_API_HASH;
    const session = new StringSession(process.env.SC_TELEGRAM_SESSION_STRING);

    const client = new TelegramClient(session, apiId, apiHash, {
        connectionRetries: 5,
    });

    await client.start({
        phoneNumber: async () => process.env.TELEGRAM_PHONE,
        phoneCode: async () => process.env.TELEGRAM_CODE,
        password: async () => process.env.TELEGRAM_PASS,
        onError: (err) => console.error("Error:", err),
    });

    console.log("✅ Conectado. Obteniendo contactos...");

    // Obtener todos los contactos
    const result = await client.invoke(
        new Api.contacts.GetContacts({
            hash: BigInt(0),
        })
    );

    console.log("Total reportado por Telegram:", result.users.length);

    const file = "contactos-mios-10-dic-2025.json";

    // Si no existe el archivo, lo creamos vacío
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify([], null, 2));
    }

    for (const user of result.users) {
        const contacto = {
            id: user.id?.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            phone: user.phone,
        };

        // Leer el archivo actual
        const data = JSON.parse(fs.readFileSync(file, "utf8"));

        // Agregar el contacto nuevo
        data.push(contacto);

        // Guardar inmediatamente
        fs.writeFileSync(file, JSON.stringify(data, null, 2));

        console.log(`📌 Guardado: ${contacto.phone || contacto.username || contacto.id}`);
    }

    console.log("📁 Finalizado. Todos los contactos han sido almacenados progresivamente.");
})();
