import fs from "fs";
import { contacts as fullContactsArray } from "./contacts-array.js";

var saveContactsFile = fs.readFileSync("./contactos-progresivos.json");
var saveContactsArray = JSON.parse(saveContactsFile.toString());

// 1. EXTRAER Y LIMPIAR NUMEROS ADDED (ya vienen sin + ni espacios)
var addedPPLContacts = saveContactsArray
  .filter(e => e.firstName?.startsWith("PPL ") || e.firstName?.includes("PLEX"))
  .map(e => e.phone) // ya vienen limpios tipo 573016977654
  .filter(Boolean);

// 2. LIMPIAR FULL PARA QUE TENGAN LA MISMA FORMA
var fullContactsArrayClean = fullContactsArray.map(e =>
  e.replace(/\+/g, "").replace(/\s+/g, "")
);

// 3. FILTRAR LOS QUE NO HAN SIDO AGREGADOS
var notAddedContactsFilter = fullContactsArrayClean.filter(
  c => !addedPPLContacts.includes(c)
);

console.log("Total FULL:", fullContactsArrayClean.length);
console.log("Total ADDED:", addedPPLContacts.length);
console.log("Faltan por agregar:", notAddedContactsFilter.length);
console.log(notAddedContactsFilter);


fs.writeFileSync(
  "./no-agregados-PPL.json",
  JSON.stringify(notAddedContactsFilter, null, 2),
  "utf8"
);

console.log("Archivo creado: no-agregados.json");
