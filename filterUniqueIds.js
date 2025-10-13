import fs from "fs";

const INPUT_FILE = "serviceMessages.json";
const OUTPUT_FILE = "miembros-unicos.json";

try {
  // 1️⃣ Leer el archivo de mensajes de servicio
  const raw = fs.readFileSync(INPUT_FILE, "utf8");
  const serviceMessages = JSON.parse(raw);

  // 2️⃣ Crear un Set para eliminar duplicados
  const idsSet = new Set();

  for (const msg of serviceMessages) {
    // Actor (quien hizo la acción)
    if (msg.actorId) idsSet.add(String(msg.actorId));

    // Usuarios afectados (los targets)
    if (Array.isArray(msg.targetIds)) {
      for (const tid of msg.targetIds) {
        if (tid) idsSet.add(String(tid));
      }
    }
  }

  // 3️⃣ Convertir el Set a un array de objetos
  const uniqueIds = Array.from(idsSet).map(id => ({ id }));

  // 4️⃣ Guardar el resultado en un nuevo archivo
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(uniqueIds, null, 2));

  console.log(`✅ ${uniqueIds.length} IDs únicos guardados en "${OUTPUT_FILE}"`);
} catch (err) {
  console.error("❌ Error al procesar el archivo:", err.message);
}
