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

var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..VOA914_pByqrrumU.aw3BzTv7vI78XYkgWGhigu98SYZ9gIjZ7FxEHeCkYmL9Nu924-1yVZN1qak3y8FXCGusse08cVT7IumcJ48lHfcb_aLKtxveiYdAoeEyM39mLOtnxI_dpHrc82HmxhsjoTYD4rJAcRcIUUtc5awbbwPGuZ2PYjLHpw_sxGxLku4q-W81IwF1prw66-zztVv6ndsYZCdR_oPjKO0CTCjYksfNiWrvwl7U0rm7tg_2KLTexh2lV1cX2LNR64yNrv-Bkgxt5KFZaPf3axwz_sCGLYVa3-VrkdG-CmcWBbJq-QgnC_nckGG5bx-rAo6Y0Sm_HcYA3tUsqfORkFWMS8DVmahWTDvSGO9YnBMeTdkZ_Jyn80fPQKJ7lL5-Ojsqai9lRz651Xyaq8QWm192RFJ0QnZBFy0gmyHsYeoX8PILzM9NDBPsptBVtoi3vU91KvdC1IpDvp66-BS17HkAnm0MhsTwIgq777TWwPKPNN5ABqse5lphSoFx4R9sW66IKkW4FkNaUp13nOPQHqD0XBXh0cLiQDfSqADzAP6eHziTXwtlHwujj2j6oj5CZq9FuAXpfQzM_F-IrZjfjS6KxAU4Wyvz7n_ZuCWuiBwwzk2gcKjo7rmljBVGRURWjI3TdsZ21Z5Xmnxu5OAXLvrOzwyv-Gu4y5we10Dz3ptj4FBMQQ1DjN3HBJzcbfy-h0QfGYlkl9A8GxAR6l2Loa2yo4PDNUjoGUrG5zCkd3NrSxFHjjtZszuLke5bFf_M_VN5mnpjraxtOjWl538CD7CltYZKLqNpAnxscfm1D2XscMYT4wpUsVA7wn7MBRM0pXabctQDOmNP_HrAaLnXSGCzIYqju8qOZO8hFnubTUONNwztq_LOij6zArP64jXRy_oiDsbXdSqxzbUZxRQKwmtJcBaQLYmsT8ojXFWQblLRuxMMXknk-oia8TC5NX4gQPSxUxa09EhCXBLISip_2UmXiQymQ5M2ZFbN2BJ9o1qqSS1nFIRBEGnUHnf4aemoTpnYsw1i2EqK3WBlqlH35a_xIiUOPlNtmgrlWnExhWh_rTTwv3xwrO2x_eDZhf6Tg04NmoDokJa6V5KVWXwBOiSsobKx5-bczKwfyCOpOI8iGw1cm3ejviOR1OViiIBLx9KyD9tJQhoSsXzsHSdDw6XckFxLPghIGsUNLrWKOF-3LR3uLgwShtrpoU9bcyqO9y3sIoVo5vxkHo-OE3gJypeAeh3iK8mD4o6btOcAYlJVnWZmgA-YG04-lkWHwlv7XqX3Cs01Y-GpL5cnqZcyK1JSaEgLXG5994Kb4JGnfx1WJlGLZFh8UXf4PPBuswPA6WF8K9MrTVcNjH82WOTqZvsk7nvd2m1rW3CaBO267fO_prVDNM6XhsDXwg6nKUPJlz19VDCk_PFERry6EbERLAdF4xDQ0MfBPNVhAvWTdwBtU9slV7pihhT4sita6QGUnW7Ld8vSkrFYRvV7UhCCyEgalZ1FCbZv8K9RJnNkuMEIHiISa-tAwzZlOnbdtWE4t_ydihtM2gfEahyq7X4f5ZNv3K0FB-o9FwMZY5VweIqbC58cM67g_zo5L7s_H4P-fsFpymBRLWPL9zZGHPkSFsVtyRYmWCy6SjWD9Z0T1YeAnmUFGXOHWH4gPovbOzoyHjybUO38EmibGzwbwzH2ZVA_H0uc3s7bmvZX8GHNTXHP96KmfTqXhcM-5-GJYtiuOjYeN4AzqrPaCPiCq-oW_3K-yq6VxtEPDjQhkyi2iRjvhKDkPmCjaZabtvanFc5pCd-7B6W9aW7T6LCaFLqwTkoi_KTzwju-MYKS0Sv8jUYPj62kiKEf-tV1BzWZFnGp7ahgTtYscEu1YMjpamaSNtFSIx6pmlLsuR7YnfomrUm5dxdpWIbwrkefBnie47O6U-0745HV3rlyx-PtZl8TX9-9IBYSXov6a917b0G-kZycnuPgZel7x2X8sLOQrnbmPQh8maT8fqQadtzkReeniLq1-ysfKDyXN8jHnH9WiGzI3MeUDvRiYJUC3V3EApJch178QWpIYba8gbeUyCDpVDxV6a4QX5inmZNYrdP7HF8l1icVlLaKiw8aprkqS3dlInKJnyQKbn_bhdAf-8PReGooYpV_Tvr_s-STofKLrQwCYo9lB9YorFe1Azd3WDAjVzNunm4UgJuKCPK6VIY51ROs00gFuUM_WUkfqwTK8J6HmDdz9sp0gIc2GTzYXX7in64d7WuvFtCnLYYdL3Dme1aGkPWZi0VPZ-7ChEhNjvI-V8NgQjgY--1Y5w3uFlrbXe0VOzrrKVAnwDnGzHRMhnLUkJoJsJlbAxdMbVSwT6fTlPmpAAoTO9SEAmn-4rRyJbgqdOQg8M-5xvE3EW42tIc-rmaGU6m2iTO1wdMYVctm_APW2RmJs5MfPkXnnHW84J2GnRt1XTSxHWy7eeK0Uiy94FkdWK4PiPhfEtUUCzUw9HODJYNC6fGF16DJe0VusEN8F97uBHyysjdEllC2EOV0xLfqaUpECgeeI9Bm5obYmB9-NgElGfSgUYoVjorEQ_-HmSMA9iwZwHJItIdaxCoITy7yKheny4oNBryIVEuVvVBcTevlvWocGthzo_8UznQnScmcGBMQ.nPNJJze8aLXBrdXvvsnz5g"

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

    if(result.noError){
        if(result.exist===true){
            console.log(correoFormado + " PERRO existeeeeeeeeeeeeeeeeeeee")
        }
        if(result.exist===false){
            console.log((i+1) + " no existe")
        }
    }

    if(result.noError===false){
        if(result.serverError){
            console.error("🖥🖥🖥🖥 Error servidor: "+result.errorMessage)
        } else {
            console.log("🌐🌐🌐🌐 Error solicitud: "+result.errorMessage);
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
                    }
                    if (jsonResponse.data.check.operations.includes("Register")) {
                        result.exist = false;
                        result.noError = true;
                    }
                }
            }
        }
        if(result.exist===null) {
            throw new Error("No se pudo determinar si existe")
        }

    } catch (error) {
        result.errorMessage = error.message;
        result.noError = false;
    } finally {
        return result
    }
}