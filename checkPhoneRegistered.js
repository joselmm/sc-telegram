import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";
import readline from "readline";
import fs from "fs";
import {contacts} from "./contactsCompraYVentaColombia.js"

dotenv.config();
console.log("API_ID:", process.env.TELEGRAM_API_ID);
console.log("API_HASH:", process.env.TELEGRAM_API_HASH);



(async () => {
  const apiId = +process.env.TELEGRAM_API_ID;
  const apiHash = process.env.TELEGRAM_API_HASH;
  const session = new StringSession(process.env.SC_TELEGRAM_SESSION_STRING);
  const client = new TelegramClient(session, apiId, apiHash, { connectionRetries: 5 });

  await client.start({
    phoneNumber: async () => process.env.TELEGRAM_PHONE,
    phoneCode: async () => process.env.TELEGRAM_CODE,
    password: async () => process.env.TELEGRAM_PASS,
    onError: (err) => console.error("Login error:", err)
  });

  console.log("✅ Conectado correctamente");

  // ---------------------------------------------------------------------
  // 🔥 LÓGICA MÍNIMA: chequear números y guardar solo los que tienen Telegram
  // ---------------------------------------------------------------------
  const validos = [];

  for (const phone of contacts) {
    try {
      const res = await client.invoke(
        new Api.auth.Check({
          phoneNumber: phone
        })
      );

      console.log(phone, "=>", res.phoneRegistered ? "✔ Tiene Telegram" : "❌ No tiene");

      if (res.phoneRegistered) {
        validos.push(phone);
      }

      await new Promise(r => setTimeout(r, 300)); // evita flood
    } catch (err) {
      console.log(phone, "ERROR:", err.message);
    }
  }

  fs.writeFileSync("con_telegram.json", JSON.stringify(validos, null, 2));
  console.log("📁 Guardado en con_telegram.json:", validos.length, "números");
  // ---------------------------------------------------------------------

})();
