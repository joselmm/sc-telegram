import fs from "fs";

// archivo de entrada
const inputFile = "res.txt";
// archivo de salida
const outputFile = "resulta.txt";

// leer el archivo
const content = fs.readFileSync(inputFile, "utf8");

// convertir a array por saltos de línea
const lines = content.split("\n");

// filtrar líneas que NO tengan @gmail.com
const filteredLines = lines.filter(line => !line.match(/@yahoo\./g));

// guardar resultado
fs.writeFileSync(outputFile, filteredLines.join("\n"), "utf8");

console.log("Archivo resulta.txt generado correctamente");
