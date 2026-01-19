import fs from "fs";
var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..8vRGa6SDCEpvEq0y.DsUG9VHkDSKX6yWLbKvoEjlH84-QWkUuVnstBb6aI_N9J56M9JqySimso6X_lRRa9JLoTPd_CpLa4rs29IO-jxdoia-u8HJzK5Ox7R0BIMzZG_7u5-QHlHQNU8GCY8iZhFoCA0kSM_VAtvCPlVBvJ3s4zrCD-ebqttNdLU6da8MhAQdzoQCowl4gLtWGu5ouW03GeiGApINPPQZDT_ChgbMKgKzbNWSOtvF4FznDpQZPb9Kl9rNfzlulluhZdOB_LvZUUnf0QW0a-hL8sTGjOni86MXMCYGkj6fReMpL5maP43kLj9BpvsubfVYF_zhFfg9JWZnPsTk6xLfn7fh64r1BKGe8jispf7xFM_PRidbQnml4r99tk2kH0Wtk7-TqfO5NbfOcqieBVeMPnrrQlhz_Wwp7d0xtPjgztXP-eezxpdKvzoaQVzjgeaTWjaGbACSv8q1M6u5rFc5A7Cw0_5A6179kpqeHKw5IWsqH3b355RpRk-9f5EktBXXKfqldm-o-H5tnGA15dMA5kzAYHaD6ru65jxXkTnA-VL4xPaxk6D1-k-pgMdWp232Nkdu8wTfh4KgSap-ytQBvvQnDDVZf0ixPOlsADX4ZPI8npFfto_qGj_GDjzDhZwOqn9K-j_L9_7itxUP_2uSWyYaI-vzeREXrfdowp8dBfPynOUscHocs0jslMfGYW3r_BfRyU65A2ny3L0pGPm1l-GstjCGszRBWvxMQSsLkVwItyRItRxVwWIr5nUMCP5hICbgiKD-wXB-RJoA1Qag0Xov74aEYvZV6gEkC4Ie820oEdTAgDS_dGQ_3b-4LH_uF7wtkRQFRQjubLbd6uBu29bIJbyj4CgqItYWGr2U72MSbTRFcA7NIRgWT-62Q-tL7AHf2DMtjKMYE_-OoVYk8pSfpyGtrf_0F8yCRkOBXP3VlNYQB5TW1vdgXjT0PFc3mux1k0osZi8H-Iz-YnToQ3ZF3pSJ32X63Lsnpt4-qZSEzfj5MP0ADWUAJdHDEitvq-mOBy9Q4oSfNDHp97zdnhD8cStWVntwMp7OPwY9ENTyj_KG2XB8vb5Gud2N23mFE5oG-Ighw4WWTtQq7Zcpw4d2xn38-poUgFCYBv4kSJQ8Sl-8hTBtSMVat7JpKHuyfcHJrM_ulqDXZ_dXZnVwicYEleJtuL87iVTBZh33BPKkzKBlyh4wAGqEQRBYQZF316N2PXu40i_JBcO-ipgWsJyMjZnAkWt3VYXGiVFDcDLHe2HbCIHZonAd9DV7-RLdBR_rE1E6_YMc1yuvqqVZwn63gYTzDhEn3IuBahpouebGnquHfvZQEXgqfomky2ySSdB7s4035nKVuE6mm6_SJJD9bIA4B3yiZvmkbfhzrwvm6ZkwPrPlcTd_W6GVROo1wGrJPh8HVfcZdk7e5us42_N0xWq0EDsQPGKfOPQzOJ62xPpaX_xMZ974dVd6A-JYU5wSWA0uPCmEUqKPZP8WZI8_p64Jjym22vDwNXy2i9kyC3cc1sXKCJv0lvQQ5NNVIOW-AyxZJx0XwlV5-6mt2XaXDD5a6HfibjlbQOEHdFh-MU6V9TNzNQb7IhxpEv2f4H4I0u6Ujkp0rCOJFd4SXZ_X-ws4fT4HMhmYLWL52N0-VsIegYPRwUlBl6QvBDOEzyL_u5turlpHHme5YNZhfBRLhO-ufafXVh6559T6on8WsxoJIDOwP-gprdFIDTWr9vKvWoPC0KgBgbRYswt3OWtNEn7k_zmn2_mlfjDpncz_NvcZeP6ySTEhhNfnXTEIJWUjHTqJZdnzxBuY5eM5vKJiEs0u22wJXSD_iFl6isJa5PEdcW1X3U-flT3tOGnSPZFQSuvXPVrNZLqnhamRqmnob8g4KbnjYduu57UfDbEfB64kwCK910nuYEDBDyL7wY78y5qKGa7L24OPQb5mldCKFxXgxmGlf7NiZAbumqqUSyo68aIdbpNlqlfgNbCHuiFomfcLAwPRJSASnWKmSwyp5Gi0vhYwb5WToxVQ5-WkD1GAXGU8KHLVIGdM-WDW2j6sXtReGu6rIQGU2wgyBf9qwZH3PmT3XGk2uF68BVf6ipkXwSw98TPKLiisfkhIagFqabuuq3FyEuRRBhmK8UWS7WYtcsDJrYkEpkxWzfaH2DKtQhY2QXv8F2RtaBKVgq1bhKoUDOYJnWYEiExcQShLvSow8Cp98MkvUqnAbe9vb3QJCF2IWtQzDAmaa6qc9u80TPf6HhIa0R88YkuZiQkuZxxtwc_HEdrDLUaCNaagK-dl0lzLIsXzbxKfOISBgTLO7tEIk5g_csS9BIxdXVoObW4r4MktvT264mXDqCclKcaTSWl8e2QodfAsNLdLjSQ-KwncvBv22MdBiFv8dl248u07mk9ODLH_YiJLxp9BB_s6zo_0iPHcg1iOzBtXxfgeyBwkWOeThOXQ7NzGobhp-UsC05ldocHcyhMbm36EzsMLiNwZfCSq1By5fZad1bfVxDPVuiRzo60BL6mxsou6gvyQPs5SSOWENEu3eqtvcqoL7DKDUcV3Vn4UpuKJSo64mak2k8uZk0w2c6qq7ab_bCAvnoX5vGEMa3c-9w9Q-mQslnJAsdATmdRh-TY2Xd5KtxNeoNPZPZVgRqElGwW1JbRldF-b3sd1Wvf1eRo38WOWn6dUgtWWN04Y.xsCBsfRTShDv_g-CFsQTJQ"
var basedisney = "popxe";
var dominio = "@gejarvis.net"

var inicio=1

/* 

brooky1@gejarvis.net  sirve
brooky2@gejarvis.net sirve
brooky3@gejarvis.net sirve
brooky4@gejarvis.net no
brooky5@gejarvis.net sirve
miner1@gejarvis.net sirve
miner2@gejarvis.net sirve
miner3@gejarvis.net sirve
miner4@gejarvis.net sirve
miner5@gejarvis.net sirvve
yuyis1@gejarvis.net no 
yuyis2@gejarvis.net no
yuyis3@gejarvis.net no
yuyis4@gejarvis.net no
yuyis5@gejarvis.net no
yuyis6@gejarvis.net no
yuyis7@gejarvis.net sirve
yuyis8@gejarvis.net no
yuyis9@gejarvis.net no
yuyis10@gejarvis.net no
ent01@gejarvis.net no
ent02@gejarvis.net  NO
ent03@gejarvis.net no
ent04@gejarvis.net no
ent05@gejarvis.net no
ent06@gejarvis.net no
ent07@gejarvis.net no
corel1@gejarvis.net si
corel2@gejarvis.net si
corel3@gejarvis.net  sirve
corel4@gejarvis.net no llegan codigos
corel5@gejarvis.net no llegan codigos
qrc01@gejarvis.net si
qrc02@gejarvis.net si
qrc03@gejarvis.net si
qrc04@gejarvis.net si
qrc05@gejarvis.net si
susteg1@gejarvis.net si
susteg2@gejarvis. si
susteg3@gejarvis.net si
susteg4@gejarvis.net si
susteg5@gejarvis.net si
pipo1@gejarvis.net no
pipo2@gejarvis.net si
pipo3@gejarvis.net no
pipo4@gejarvis.net no llega code
pipo5@gejarvis.net no
pipa1@gejarvis.net si
pipa2@gejarvis.net no
pipa3@gejarvis.net no
pipa4@gejarvis.net no
pipa5@gejarvis.net no
pipa6@gejarvis.net no
pipa7@gejarvis.net no
pipa8@gejarvis.net si
pipa9@gejarvis.net si
pipa10@gejarvis.net no
cuenta1@gejarvis.net no
cuenta10@gejarvis.net no
cuenta11@gejarvis.net no
germa1@gejarvis.net no
germa2@gejarvis.net no
germa3@gejarvis.net no
germa4@gejarvis.net no
germa5@gejarvis.net no
popxe2@gejarvis.net no

 */
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

for (let i = inicio; i < 10000; i++) {
//for (let i = inicio; i=>0; i--) {
    const correoFormado = `${basedisney}${i}${dominio}`;
    //console.log(correoFormado)
   // console.log(correoFormado)
    var result = await checkDisneyExists(correoFormado);

    // 👉 Guardar cada iteración inmediatamente
    //guardarResultado(correoFormado, result);

    // 👉 Logs como ya los tenías
    if(result.noError){
        if(result.exist===true){
            console.log(correoFormado + " ")
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
                    

                    }
                    if (jsonResponse.data.check.operations.includes("Register")) {
                        result.exist = false;
                        result.noError = true;
                    
                        
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

