import fs from "fs";
var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..bjDi0-A9tJrhPjhj.67SE5uxtJ5LCAZpNfzJhIdM5Fxz62t4-L6_GXIx3N1SL9cSI77EBlX55CyqPcfZIbr-EAWUqCwFrbeJ1974PvhPKs_PKxyNhYf9YhjNmkrFw_fLlOKdd-M_OExvtO-zmIthSfEzyXQRgcMB249Q-qkWRcqLQlVc41urUzYjv55awMjNXWZlKvzAvge3s03F4GsN3Dkm9Mb7dFEfU72YKqFqcWt_r8IqNUd1Q48XuN6yXkP9GiAGFKTZbI25mvDgm_WBEu1d8egmPv4Qy5gak7wfBy9usbRZ16I3t2oI6_9zX5z051h2ErxfULQaNOSoUQ-rDxHwP2yQb9UKWcNvNCiTBxGRu6cCDfNK3SEfNFvKpb0-iXg1o3Vst6BLCAsx5K1AoBZwOAfwOh9E-gBrmIY_ZpEand1Slng9f0mHBTrNGoKzLh7SrpUaBJsgRDDV0gX7Z2obXbQq2d1Tbv5qF9DzQuRVdpCtYymW0OfE4iJ3RUoSLalHaT8PbrdnLJrXNcEvHcUDCq9u5w10lK4UV_MXguL1IzkczU2TF5xnQaLrv5ikQneL2Q9RM6UAqG4kT_gN5wGQSv5h0F2N8xNR3b1nQw-XkyaXTnIINLFP1puYtjZhoZWvmrGKvaI9J3vE08iJ7H67ShdLXOOi80v-Ps2Gw-TXMLVzE0dyuVz0I0Exw-BAsXuCn1LDXBN1Da1ZtuG99dlFT-IRMuypv8GREtYUxNSJ4su4pUorp_2f2Cm1t34tQ2VcgrvkUABckBPfHMOX09sZXmagNPW4xYcYRzhJT8YixNCNPjZSDDalKhfIPuD2H8GAdTMF9NFGgCpqI1NCznkKHAUE7f1-ITj-6oWtBm4r_ep_VZxgtfE0qiAO9rM993m6SvU5m-xJpD_S1UYwKHZFFk7hGepId0gtcQ5U61OzWw60UBu2Tdzss7mHNTYn6MOR_GIxoCzKLdWgLGvfe2aRNCNLQRz0r1n9JyjHi8SuctQWqHKudusjns40xO5onoIjdUoaXxplc3W1-Alr5Si1EvRjB-HAz-xtyMgb7fzFrEdJpI6HLpYqGTvILavi4ndEugPaFtAa_92fMOVdMREX39dUnt1Mt9wTyG7xW7eyys3iMYTALkDpcU4HpLYYTJzEJM4y5YCNUkx-1EX1RwGm3vn62_zu8xKNwGCwvmO4mwDoeNWlRnxNTm7QNgu0foHKDgmqjYWlpCNvOwuso-_mW6sVJSfuC26W5T861-wPY5vU11BFfdsmTHQmmVWRVWFDDtwAcOZcCyLxEaU2YRA_imya_heHlk1L8beS7Ff6HHny-nWj9tW1LeIeykB53KtJ5Loo64r1ylqP0Mhw_qEdFeikIp9C1iNMnkZGxCDIbLTeAPnMXC9cOBXKm4fc6KwiAdeAPhn9A0zeq_RQqd4UDfwElNY1Y-iPpwsXgERd9BRgrNqA5pJ9tI3FP8Ub3JqacxhujRlDLfZPBQ01naUs8ifWntepKhUmQdoJlkVjXJl3-7RtSR_TbdkZ-QlB0WIz1G6oE-QU_hb5GC4zi8fZIDTm0fn8PGRxmQmeZw1LyIKRXQmLfEf4h9coZWJJft-WN3E__Q-pto8b1RSg3M8NCy94XPMOzpXw_7pv0wy-jc7N4SMGY6GyiPr72okcHzkH7TUrpyx2hEeNfwvEKosJ_s9U86mxQXvqr2G-uqkHDVMf4-rYPSJWR1juA6orMRTiRmHdt0pNF0jFRUl7xregSPSBoLGReKJl1Ca3mYznWFaV5fC3MBAHDQTdSd4NhAB7ykqXTkvlrIO3q5hgq7QYYVellUC2jz31v0viFdQP_pY2NYLjRX2sdZgW448dlFZA8Oo7E6yXda3WHDPz6LqiDF8FzrXOvHI028XNb0KCvplI_kbgoauKQOU7S_nit4vOqi1leJWlw9XSgTy7Zaxioa-GexqyoTpYqyAml0FNMcrogVxntzltn-gwE-4U-mnsrix0QcrlqaEuWs6M0hDsgFmWcRbZgG6YZeaQtcbbcvhRxYtufvgq0p8WsYGFh-74MqP3hzsn7ADTrfEmxtSO2HBmVtkxZC9-wuT4-xE2l53lJyT3UxyYKy3XkiHiGHt5We-RdpVeuZ5WTs9LHLmFYkHeovDPevwdn5ue5txt_qnl06GEe3xGL3YoIqm7rejGoYIPFmUC8LWZuNqh929CdulkKIPTSYzZ8slOhHsjXw8hYqEyyJzxzv0XQCUlR2kbD5phgyHMebMweDcDO1BuBhL6Lkyp_OlyRGSe8PnHI1YBydZKeuYcdzGb4lkHN9k_adClQWvkQr_-3RmrWMaIN-HDoD-6TmBH4lNEJTqpiygOp2_85koqKeNgGyozRcXmSabxS0n1DdGB9UlhJ1utgMCPXKVX_gjYY9Uv21xQSprq6z9pKUFI_OnTPE8UUZWodmmswsv4eG9CMZt6vEMGukNpCVJc6w1f615yTMdR7Mpdygr0qHwUlqho3Idjv7Lq2Maez280-1xNY6SahWQS45wP8qCcW-obbFs4aUAmS_0xDcMMeQZ7zeEgU8-2HIgKMKf9HDAbiiI16Zj_mAF5h_9U7i3xNvbeY6buuIrsRfpcI4Yc8gDQuBlRk.W0xKXja7MtEr1s590624dQ"
var basedisney = "disneyplus";
var dominio = "@ttvgt.com"
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

