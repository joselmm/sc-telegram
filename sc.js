import { TelegramClient, Api } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import dotenv from "dotenv";
import readline from "readline";
import fs from "fs";


dotenv.config();
console.log("API_ID:", process.env.TELEGRAM_API_ID);
console.log("API_HASH:", process.env.TELEGRAM_API_HASH);



(async () => {
  const apiId = +process.env.TELEGRAM_API_ID;
  const apiHash = process.env.TELEGRAM_API_HASH;
  const session = new StringSession(process.env.SC_TELEGRAM_SESSION_STRING_2);
  const client = new TelegramClient(session, apiId, apiHash, { connectionRetries: 5 });

  await client.start({
    phoneNumber: async () => process.env.TELEGRAM_PHONE,
    phoneCode: async () => process.env.TELEGRAM_CODE,
    password: async () => process.env.TELEGRAM_PASS,
    onError: (err) => console.error("Login error:", err)
  });

  console.log("✅ Conectado correctamente");

  // Obtiene la entidad del grupo o canal
  var chat = "https://t.me/cracking_Web";
  const entity = await client.getEntity(chat);
  console.log("Tipo de chat:", JSON.stringify(entity));

  const participantes = [];

  // Si es supergrupo/canal
  if (entity.className === "Channel" /* && entity.megagroup */) {
    console.log("📢 Es un supergrupo — usando channels.GetParticipants");

    let offset = 0;
    const limit = 200;

    while (true) {
      try {
        const res = await client.invoke(
          new Api.channels.GetParticipants({
            channel: entity,
            filter: new Api.ChannelParticipantsRecent(""),
            offset,
            limit,
            hash: 0
          })
        );

        if (!res.participants.length) break;

        // Asocia info de cada participante con su usuario
        for (const p of res.participants) {
         // const userObj = res.users.find(u => u.id === p.userId);
          participantes.push({
            id: p.userId?.toString?.() ?? p.userId,

          });
        }

        console.log(`🧩 Obtenidos ${participantes.length} miembros hasta ahora`);
        if (res.participants.length < limit) break;

        offset += res.participants.length;
        await new Promise(r => setTimeout(r, 400)); // evita FloodWait
      } catch (err) {
        console.error("Error en GetParticipants:", err.message || err);
        break;
      }
    }
  }

  // Si es un grupo clásico (no supergrupo)
  else if (entity.className === "Chat") {
    console.log("👥 Es un grupo básico — usando messages.GetFullChat");

    const res = await client.invoke(
      new Api.messages.GetFullChat({ chatId: entity.id })
    );

    for (const p of res.fullChat.participants.participants) {
      const userObj = p.user ?? {};
      participantes.push({
        id: userObj.id?.toString?.() ?? userObj.id,
        username: userObj.username ?? null,
        firstName: userObj.firstName ?? null,
        lastName: userObj.lastName ?? null,
        phone: userObj.phone ?? null
      });
    }
  }

  else {
    console.log("⚠️ No es grupo ni supergrupo (probablemente un usuario o canal sin chat).");
  }

  // Guarda los miembros en archivo
  var fileName= "miembros-"+(entity.username ? entity.username : chat)+".json";
  fs.writeFileSync(fileName, JSON.stringify(participantes, null, 2));
  console.log(`✅ Guardados ${participantes.length} usuarios en ${fileName}`);
})();