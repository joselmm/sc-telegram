import fs from "fs";
var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..b9yzaIGyk5N0WA1_.DGKMF99Zw9aQ0ZpZackkLqls0Mfffd5YDkrE-Onx_7IRyUEIsWyFUn6RNOkPz7OIk6zjaKwbvfVP3B1YQH_aMSSeLp2mlBlr9seH1nM4thO5GXkCxJQquFRDqeDGlbBTL-zFRZeSXyCK7ULAvRIt-rIKycgvRRL1SeWV-Djtq0s14CQmQGHGlLa3Ph2j0yqY98u8TfkFEoqeHaIVyCTqrLnyeLdWvcwphNNJeIGIRv4558yIDbqqidLiEAY6rODPRB0XGEHHK8BK1XcRUxPuj7mvVppzD1q884Yn_d67K6-twbvhztPufMTKNvVHC5xeYwCzxP8bHLLk2GZUqysmvS2X5jBcx-v7BtBPqoC9HdBNNriOdMkktWIKQ8s2Qvpw1XJn6DztmIrOQxgKbm6JBDw93M9taP6qvVjF-5YiS2_MgHhLseLoFUKtYKyc5gofHnGLBvl5gFWlH38SGXWE4plRN5nMNjAHPIaONECjxtjIZqbCYo0YYcJ5zGql9IJEAa3XkFd_TMUkSg1XfldEWb9fWWUsisLQwSNnndKsRIoaExoJNLzdy8VLMlY4aJEs7OfmAlBmXzyK2keeV0yNZ4S9Eh8bGWv0zxdFN-Rpjk95WKUV7ff2lL-Z2VU392Bduo-MUNZSQBwE0y9EOcKwqLwnKMN-1oHuPUV2j-JSjOnpXACoCLTNkhSZpjcy0nYMmI0rEuHoUNa7R9WEbThWctplb-l1zu7XMInFOMhGAMhhwXXecA1ds-xo1hFPVEybtMZuv9iMldfxV_2Y3pHQHGD-Gpnw6ViQbttd6jrxRWF9HqE8hdtyUu4KUWylA44GwdzAjJ-gwmGtBJNnlWzne0cLG48zTRnyuytb6d8Hlo9WV__cZwjL6p5gtSkuWOWvW7NPavev9-2OUUnZtyfN2yGZWRVRIpmqsuUcPxrjiCfoZSt1_KP86W6Ga0dJ7LTRTCpyZE9wfHGqdN6csPV65mQ0Z0Fzmj7DN_SaK8APsgQIBLidWvSRafgxEHYsT3CZWP33DJmJtolswbuLsBeo0j6tnmfhy0Te0wMGT00gK8Rp5OdjQNV815YludJZZOqBFuNVhDvw8WR0ukOwVFsvz6EMaFmvWcb0GhDEM9XVVzQMML4xcF-Q_G56kGZ5ZDS9RTk2IGVbI0s4u_QM9FDfcPwKEHt_ARiSu2M5Aj2OR3Hz7xXMQpTERCq391LzdyBgztuzeokqwwVElGaYni3ZnRIA-T1EY6eDqlua6M3efV_UQ8rc99lQw8R2aPLkHyEvwOsAYGBD2FsnIQXepZj6p9IBn-v_8RCBLCaqZS8n1HMjZzrhIRsSoonXsCpB7s4Kx1MtVCpyog1z87YT_HrS-6n2tjH1b0KZ8BoPLhgE8pue5oSsOaSIuXKdPYCM9wuhEFal4hdi54alw3Ic00j9_gh15ajvNOWn3-sVAK3IImgCml7C6XyxEJe_TPMwNPm5bNdBz2E2g9OncbvXPKUHwLHoQ8dlUGsQ1VE4NJI97VM0y0z-8zECIKp6W30HGBEvft_FqKJeNpS7368UjkJRR5ekqfhpV-MBEWweQ2Q8UrMc1CGZerRO1yvM-j3BvKKsff0NBHs2KlaELi6k7mW2jpubKtLyPFZLr3zw02Cq8F264rHhE-KpvpaoFLUXMNJgfjNwLkhkUrwKSdeDH_BnXAnO1-ZyD5i55BwDbOorwfXW_WIru4yby2QLa4wXlwKGcnyzZlfB5FYzWCRMnBz8pQ0_WpbU2Iinw0qh6aGZemdgolpDGF_bV8K-phH8YZa-pvD-o6xR5gNHCpCOp8awjFKy8EcR1uUSFLNWvnwrFMTyyfub1Nz44rT_9CTTyPrjZCzeMVR-LWFm2wO8cMPDocUX6J5xCqKsluYF8NZdKaKEO5P-2bbvohV0BH4PdNNoBJbL_ULm0AIswKTSbEtO8XFNbZe4OJe5pilTlTg4bbOzQj1ZFeFsEcMv9sdspiWiK-mUtNsQ7-kIk2UYSeYWOb4mCgppYmVwPOw20w9yw4xmYcZ9b4qnY7NjbsEWBHspLw0-fB5CkZEOh2lLk1FJaCFJ5DyKnn-BiRXwtPPT-ggVz1jSODayDlfksPae_l6CYGT1MFSn6CAMjJv87yWZnF3lc8fRWM8WwzKgwdBkzumTVQOSOr6Fpb-YFnVWfNgiR25UG9AIFEWEpxdAQjGpbVWhoVRc2pR6kLc8DAmalg1WVKSlohjIU7i6Zmrhx3V3EzE928lPFHPfnLDjHPktKiwE-axVLdPr87Hz7nfu8RvQwmIohiNTERq2c_IBxSaIQaAPr8a61ZsQaIA9_MRNv4DDL1YBNjITDhI-HXjFu6-hnuNj-2gYZl62c_wAZJPQ0Q3zfG1YUTnJQG8qz8yyWX5K0AweEGgwOkW6jdNmGeIsXBRJIjvvtEgwKOEQ-e8ucx9pC04wl4SNWBu4ofGc_A1uEE-Epw9zwEQAPdOsPhWfe-ELnHnf3vmGTJXGirYtGbQZWYCR0yITT2ebvdnFmaUt7d_H2pfSzUZRrIZyMqQfPfn0rua2KSWGvEtxYcx3PYe8TtEOqoixqMq1IG0R1V8NUCS6H9gUmHtYhlTvEWW-rz-QmhyKfsNYc_edk1cV0zvbbzzdXrpJCI5rcgiQ3_DCw0re4dlpndw-dG045A.6Nem6zYqXuDlgYbo5W5ZXw"
var basedisney = "amx";
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
marte2@gejarvis.net no llega code
buba1@gejarvis.net
buba2@gejarvis.net
buba3@gejarvis.net
buba4@gejarvis.net
buba5@gejarvis.net no llega code
tonik@gejarvis.net
pipo10@gejarvis.net
amx1@gejarvis.net
amx2@gejarvis.net
amx3@gejarvis.net
amx4@gejarvis.net
amx5@gejarvis.net
amx6@gejarvis.net


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
