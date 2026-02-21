import fs from 'fs';
import path from 'path';

/**
 * Configura la consola para guardar logs en un archivo.
 * @param {string} fileName - Nombre o ruta del archivo de log.
 */
export function inicializarLogger(fileName) {
    const logPath = path.resolve(fileName);
    // 'a' asegura que NO se borre lo anterior (Append)
    const logStream = fs.createWriteStream(logPath, { flags: 'a' });

    const niveles = ['log', 'warn', 'error'];

    niveles.forEach(metodo => {
        const original = console[metodo];

        console[metodo] = function (...args) {
            // Usamos toLocaleString para que sea tu hora local real
            const timestamp = new Date().toLocaleString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            
            const nivel = metodo.toUpperCase();
            
            const mensajeTexto = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg) : arg
            ).join(' ');

            const lineaLog = `[${nivel}] [${timestamp}] ${mensajeTexto}\n`;

            logStream.write(lineaLog);
            original.apply(console, args);
        };
    });

    console.log(`--- Logger activado: guardando en ${logPath} ---`);
}