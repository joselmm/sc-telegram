import fs from "fs";
var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..C6M8azqb3KgvA_Zp.kzqYxzZMocoPGxNUFiGDZtRGJhKxcFVYokhyil6fxSkOCakclCa4HCQtVVU0ZSKvLfJHxidQFqt0RFSzsvuo1J5HnwH9O47_-x4AviVhZDKiZlslaYYIWD_T36ZS8iYsFNLRH1L2DlhY2ZlLlCsUQCVgUW0_P5mifae6rIqtqsDZZjCakBJBK6s7vRUylWC28h-TZMhYe-pNPby1JYOf4Lzk2qgM6mdGH-JDplS3eJGD-cGJPB_hrUTrPlkwwFSjtksPOS9BwTPw3RWyWaBFnOMO47RX69sk_mMMA6YC-s-mTee-hsBcN-b4SyYzFf883N5xuKnTeG2Syq_BmdkazWahyzCTHueQG-QcxsHpiYlK_lo8-4HDf-0AgtWxsz1VvFlBWyQN4dBYbsoYS8rA4VWoB_65fxDLYTu_CtM8U8tk6AIuEjRYeTVbJlii7fqs2uA6FwZVYGX9FZ3FIYpSbDeZsmlHYD1NyxMRdxoGF3WBgo-y-GXZVFhSNcWRUXCYYc7n9UUbxApIPoE77gh8WYCIy5Hi9FM4NVMpFDc1mM79AdkLdnqOTQ76gsdfLiPRAg2In0W3PtIYEX3pUgqWkyQwU0NgmY31lvlTUWXZ1vnIlaA46vuzVaHCvImBBJboYMcHqEdb6aas3EUAEJhySz6xyX90SiRbkU72Kl-JGVXepGchueQprDP6NcZLrSUO2fqTG-6YA9UduwEtbe-4-48xScFZOZrYZa4DCSkg6ljOII5J8kJLlZRjIym-ddVUupUJ6AC_GjWLNF8lHGPmTcePcE_zTR3XkpxDr5XOPrsJjvDgYvKI7qDcOBzpt7SP14jwOBJE5Csai94Khb9SR-im0VXsbGqNCRXfJJordp4HE6QRVe9WtsVvqUFpP1HMQ5qW21Ayx7qqXu0G7CSVgWtIJZ2Kjj9cBf6aQdjEhB-_brE2BkHKmzs8N5UcURvKoBxZeOGD9kJLnLdYMmmMUVU2Gstu4Dlokd7XRI2LiUJmKPMwSYKGDRU-AI58XSeC65iwBet7VB-m4lN-v3cqa_ys0U__Smz9JPPsKeoAIUFGD8AZU0J-r5P3hLU0NWWjXkqDZy3Ph5aqXEkehxyWDXunrRy6sR2hyLd-Z-w6Yx-AmEGD7g0YviFsecCfwfWt-4Whpwo75pZLMkvKAOqxwGpVkPCYFZ0wOIekZjsblMZJ1BTFeQQGwLEYMk9Tk4-NiM9heaikcXNg0enxZ1Fo7uNMrWZpmXB_TTv0xOTfj86aU8rWitlGCoHiNb_0DcziAZmfzXh5FArtMBJXXSSGrRiiWAqggxZvDxuZym9ISJw17CimjA2hDHWpaC59mHh_nKxprbuAuNi06-x9i2tEbeZFaBOhkXhYlpdIUWfJAKDGv8IWsOBGqgg1Jz8jqwuKE2nZhaPdZPMotlXwnH9_Z-zZs_VpFB2pENLZwtvhw_Nk-Z9UTkAG7we8Pt1EjA-WfpKo6RBP9VWRvRAmb1wGqhiRE1JcW-El2gyYyAJlxf17C85o01gCAERZO0Nse1QRGVSXqWX3nFCJ-rwmwZ_Ow-rfpso7mMjDCY5ezE7pSIQDov_j-ZQweoDA0hoCjVTXZYS8z3t_iHkl6iFFffeWqMdAlByek32NQ_Q03o2IMePKbP-PH1W7QhdTQzl6yAaxBXFGuduwoU1JzQ91mFZPW8Gdb6xLYytwP3xpozcRlZcYMa9F5q4l9kaJyXjgcakTp-qYB2_6CAENVsJNmLYLcB3mJgRlZG5Ccr_C1BnfxSalCW4ga4O1Ya4x_DideD6Ty5lnZ22fAfDhBvLfxE6WSfbuJ-oHk5MFBadSLhQ3WxHd4jnikj2CerV4DwXxoCA0-Np3ESbImAT2Kp2S8OjwrL3Tw45IrP9C3D1yhzN8RAfaBKZzjGi1QtsCa0_mM_2rE3rOhsovN4p-ptAjhu70YruYc3mbIJSypCM4VaiC5VAK2n1XrHUgI6_-ccf9Tf1oDZqFOrGjamHy-9_uCIrW7fAhLJrCMQqt9OVKBCAvZw1dBiMHy7_px_x6g9yrnVbpzZb7Ry-XXE9eeXXepuJP7Xb2ZA3GvvkqvtS9oMZ5t6gC4UMCFT_uo4eqtUhfE7xOLVqS3Hr6vEOuC12Og29w2FWpJjZkD5_7wd9ghB_5eAlRbjgdwWAFt92f8zFhEtb8BH-bQBefKbCLhoSXNpnKSySu48OLmHTFnoK3OkJ9MlP41t6kHA2EwwNkyutg5DakH6-vE0DD2ZTOmQdTha3HppkFxvqroGfEblAJhqkAmH-sUTNl5oJboFi6GI5uE14aSOEsBdISab5RhkYQIKwvGrtUyRxPOp459gRrO6m4AdxHX3OH69VSOy2p0vOgPuudzWnEva_Ec-OR42kS3Ez6KMf-ggw0hNO4C2gf_dhsNzn2qwjzoCE4_-Q-q2CHgO9OTmnnP43Qzuboyy-UjLuNbq2q8YYoNYJ6rinKuOmsGI8k7LJyH81mOc308lA2XvB3HFFzu_qI7piTXgS7HmIg06vg-2phi1Aad8KqitARZFaMUPZtZtTzJkO0cpPp9WObU9W2NgCeRS_qt0WLjuzZzAFWL4Joe6Vh9Fd5Xzt4VbdaQrw.nu5sHLP480oAkITJf2W3GA"
var basedisney = "disneyplus";
var dominio = "@procelltv.co"
// este man sirve para consultar codigos arservik.com
//este man si sirve para consultar codigos: "ikerbotz.com";
//NO SIRVE EL IMAP CON @bamgtv.com
//NO SIRVE EL IMAP nicaregalos.com
const rutaArchivo = "./resultados.json";

fs.writeFileSync(rutaArchivo, "[]", "utf8");


// Cargar lo que ya exista en el JSON
function cargarJSON() {
    try {
        const data = fs.readFileSync(rutaArchivo, "utf8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Guardar sin borrar lo anterior
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

for (let i = 1; i < 10000; i++) {
    const correoFormado = `${basedisney}${i}${dominio}`;
    //console.log(correoFormado)
    var result = await checkDisneyExists(correoFormado);

    // 👉 Guardar cada iteración inmediatamente
    guardarResultado(correoFormado, result);

    // 👉 Logs como ya los tenías
    if(result.noError){
        if(result.exist===true){
            console.log(correoFormado + " PERRO existeeeeeeeeeeeeeeeeeeee")
        }
        
        if(result.exist===false){
            console.log(i+ " no existe")
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


        var serverResponse = await fetch("https://disney.api.edge.bamgrid.com/v1/public/graphql", {
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
                "Referer": "https://www.disneyplus.com/",
                "authorization": TOKEN,
            },
            "body": "{\"query\":\"\\n    query check($email: String!) {\\n        check(email: $email) {\\n            operations\\n            nextOperation\\n        }\\n    }\\n\",\"variables\":{\"email\":\"" + email + "\"},\"operationName\":\"check\"}",
            "method": "POST"
        })

        var jsonResponse = await serverResponse.json();
       // console.log(jsonResponse)
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
                    console.log("SHUR")

                    }
                    if (jsonResponse.data.check.operations.includes("Register")) {
                        result.exist = false;
                        result.noError = true;
                    console.log("SHUR")
                        
                    }
                }

            }
        }
        if(result.exist===null)
        {
            throw new Error("No se pudo determinar si existe")
        }
        

    } catch (error) {

        result.errorMessage = error.message;
        result.noError = false;


    } finally {
        return result
    }
}

