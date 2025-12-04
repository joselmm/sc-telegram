import fs from 'node:fs';
import path from 'node:path';
import colors from 'colors';

// --- CONFIGURACIÓN DE ARCHIVOS ---
const OUT_FILE = './unique-ids.json';
const SCAN_DIRECTORY = './'; // Directorio a escanear (el directorio actual)

/**
 * Función para escanear recursivamente archivos JSON en un directorio,
 * excluyendo el archivo de resultados.
 * @param {string} dir Directorio actual a escanear
 * @param {string[]} fileList Lista de archivos encontrados (se usa para la recursividad)
 * @returns {string[]} Lista de rutas de archivos JSON válidos
 */
function findJsonFiles(dir, fileList = []) {
    try {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                // Si es un directorio, buscar recursivamente
                findJsonFiles(filePath, fileList);
            } else if (filePath.endsWith('.json') && path.basename(filePath) !== path.basename(OUT_FILE)) {
                // Si es un archivo JSON y no es el archivo de salida
                fileList.push(filePath);
            }
        });
    } catch (error) {
        console.error(colors.red(`Error al escanear el directorio ${dir}: ${error.message}`));
    }
    return fileList;
}

/**
 * Lee un archivo JSON, verifica que sea un array y que sus objetos tengan una propiedad 'id'.
 * @param {string} filePath Ruta del archivo JSON
 * @returns {Array<Object> | null} El array de objetos si es válido, o null si falla la validación/lectura
 */
function validateAndExtractData(filePath) {
    let data;
    try {
        const rawData = fs.readFileSync(filePath, 'utf8');
        data = JSON.parse(rawData);
    } catch (e) {
        console.warn(colors.yellow(`[SKIP] No se pudo leer o parsear JSON en: ${filePath}`));
        return null;
    }

    if (!Array.isArray(data)) {
        console.warn(colors.yellow(`[SKIP] Archivo ${filePath} no es un Array.`));
        return null;
    }

    // Verificar si es un array de objetos y si el primer elemento tiene 'id'
    if (data.length > 0 && typeof data[0] === 'object' && data[0] !== null && 'id' in data[0]) {
        console.log(colors.green(`[OK] Procesando ${data.length} elementos de: ${filePath}`));
        return data;
    } else if (data.length === 0) {
        // Permitir arrays vacíos, pero no se procesan elementos.
        return data;
    } else {
        console.warn(colors.yellow(`[SKIP] Array en ${filePath} no contiene objetos válidos con 'id'.`));
        return null;
    }
}

/**
 * Función principal para escanear, validar y agregar todos los datos,
 * asegurando que no haya IDs duplicados.
 */
async function processAllFiles() {
    console.log(colors.cyan(`\n1. 🔎 Escaneando archivos JSON en el directorio: ${path.resolve(SCAN_DIRECTORY)}`));

    // 1. Encontrar todos los archivos JSON excepto el de salida
    const jsonFiles = findJsonFiles(SCAN_DIRECTORY);

    if (jsonFiles.length === 0) {
        console.log(colors.yellow("No se encontraron archivos JSON para procesar."));
        return;
    }

    // Usaremos un Map para almacenar los elementos, utilizando el 'id' como clave.
    // Esto garantiza que solo el último elemento encontrado para un 'id' específico sea guardado.
    const uniqueElementsMap = new Map();
    let totalElementsFound = 0;
    let processedFilesCount = 0;

    console.log(colors.cyan(`\n2. 📄 Procesando ${jsonFiles.length} archivos encontrados...`));

    // 2. Procesar cada archivo
    for (const filePath of jsonFiles) {
        const data = validateAndExtractData(filePath);
        if (data) {
            processedFilesCount++;
            for (const item of data) {
                // Solo si el ítem tiene una propiedad 'id' válida
                if (item && item.id !== undefined && item.id !== null) {
                    const idString = String(item.id);
                    // Agrega el elemento al Map. Si el ID ya existe, será sobrescrito.
                    uniqueElementsMap.set(idString, item);
                    totalElementsFound++;
                }
            }
        }
    }

    // 3. Convertir el Map a un Array para la salida
    const aggregatedData = Array.from(uniqueElementsMap.values());
    const uniqueCount = aggregatedData.length;
    const duplicatedCount = totalElementsFound - uniqueCount;


    // 4. Guardar resultados
    try {
        fs.writeFileSync(OUT_FILE, JSON.stringify(aggregatedData, null, 2), 'utf8');
        console.log(colors.magenta(`\n3. ✅ Proceso Completado.`));
        console.log(colors.magenta(`   Archivos procesados válidos: ${processedFilesCount}`));
        console.log(colors.magenta(`   Elementos encontrados totales: ${totalElementsFound}`));
        console.log(colors.yellow(`   Elementos duplicados eliminados: ${duplicatedCount}`));
        console.log(colors.green(`   Elementos únicos finales: ${uniqueCount}`));
        console.log(colors.magenta(`   Resultados guardados en: ${OUT_FILE}`));
    } catch (error) {
        console.error(colors.red(`\nFATAL: Error al escribir en ${OUT_FILE}: ${error.message}`));
    }
}

// Ejecutar el proceso
processAllFiles().catch((e) => {
    console.error(colors.red("Error fatal en el proceso: " + e.message));
    process.exit(1);
});