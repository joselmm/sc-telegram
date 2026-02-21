import { chromium } from 'playwright-core';
import fs from 'fs';
import { parse } from 'node-html-parser';
import { inicializarLogger } from "./modules/logger.js"

(async () => {
    inicializarLogger("Latiendajq.log")
    const browser = await chromium.launch({
        headless: true,
        channel: 'chrome'
    });

    const data = fs.readFileSync("./emails2.txt", "utf-8");
    const emails = data.split("\n")
        .map(email => email.trim())
        .filter(email => email.length > 0).reverse();

    const CONCURRENCIA_MAXIMA = 1;

    const ejecutarTarea = async (email, id) => {
        console.log(`[Slot ${id}] Procesando: ${email}`);
        const context = await browser.newContext();
        const page = await context.newPage();

        try {

            await page.goto('https://www.disneyplus.com/login');
            const emailInput = page.locator('#email');
            await emailInput.waitFor({ state: 'visible', timeout: 50000 });
            await page.waitForTimeout(1500);

            await emailInput.click();
            await emailInput.fill(email);
            await page.keyboard.press('Enter');

            const selBtn = '[class="password-links"] [class="flex flex-col gap-24"] > button';
            const selInput = '[data-testid="code-input"]';
            const selPass = '#password';

            const pasoSiguiente = await Promise.race([
                page.waitForSelector(selBtn, { timeout: 15000 }).then(() => 'BOTON_OTP'),
                page.waitForSelector(selInput, { timeout: 15000 }).then(() => 'INPUT_DIRECTO'),
                page.waitForSelector(selPass, { timeout: 15000 }).then(() => 'BOTON_OTP')
            ]).catch(() => 'TIMEOUT');

            const inputYaPresente = await page.locator(selInput).first().isVisible();

            if (inputYaPresente) {
                console.log(`[Slot ${id}] OTP enviado directo...`);
            } else if (pasoSiguiente === 'BOTON_OTP') {
                console.log(`[Slot ${id}] Haciendo click en botón OTP...`);
                await page.locator(selBtn).click();
                await page.locator(selInput).first().waitFor({ timeout: 10000 });
            } else {
                throw new Error("No se reconoció la siguiente pantalla");
            }

            // --- LLAMADA MODIFICADA: Ahora pasamos el browser ---
            var result = await getCode1clickPlay(email, 1, 6);

            /* console.log(result) */
            if (!result || !result.noError) throw new Error(result?.errorMessage || "Error obteniendo código");

            await page.locator(selInput).first().waitFor();
            await page.locator(selInput).first().click();
            await page.keyboard.type(result.code);
            await page.keyboard.press('Enter');

            let detectado = false;
            for (let i = 0; i < 20; i++) {
                const url = page.url();
                if (url.includes('profile') || url.includes('home')) {
                    console.log(email + ' ✅ Tiene suscripción: ' + url);
                    detectado = true;
                    break;
                }
                if (url.includes('welcome-back') || url.includes('plan') || url.includes('account')) {
                    console.log(email + ' ❌ NO tiene suscripción: ' + url);
                    detectado = true;
                    break;
                }

                if (url.includes('password')) {
                    console.log(email + ' 🔑 PASSWORD pide contraseña: ' + url);
                    detectado = true;
                    break;
                }

                await page.waitForTimeout(1000);
            }

            if (!detectado) {
                console.log(`Timeout ⏱️: ${email} - URL actual: ${page.url()}`);
            }

        } catch (err) {
            console.error(`[Slot ${id}] Error en ${email}:`, err.message);
        } finally {
            await context.close();
        }
    };

    const copiaEmails = [...emails];
    async function worker(workerId) {
        while (copiaEmails.length > 0) {
            const email = copiaEmails.shift();
            await ejecutarTarea(email, workerId);
        }
    }

    const pool = [];
    for (let i = 0; i < CONCURRENCIA_MAXIMA; i++) {
        pool.push(worker(i + 1));
    }

    await Promise.all(pool);
    await browser.close();
})();

//lermos document.querySelector('[style*="font-size: 28px"]');

async function getCode1clickPlay(email, attemp = 1, maxAttemps = 3, test) {
    var result = { noError: true };
    if (test) console.log(attemp);

    try {
        await new Promise(r => setTimeout(r, 20_000))
        const url = `https://codigos.szencuenta.com/index.php?p=disney&email=${encodeURIComponent(email)}`;

        // Vamos a la página y esperamos que el JS del anti-bot termine (6-8 segundos)
        var res = await fetch(url, { signal: AbortSignal.timeout(80_000) });

        // Extraemos el contenido ya procesado por el navegador
        const htmlText = await res.text();


        if (test && attemp === 1) {
            fs.writeFileSync("./res.html", htmlText);
            console.log("Guaradad")
        }

        if (!htmlText.includes('font-size: 28px')) {
            if (attemp >= maxAttemps) throw new Error("No se obtuvo el código tras reintentos");

            return await getCode1clickPlay(email, attemp + 1, maxAttemps);
        }

        const root = parse(htmlText);
        const codeElement = root.querySelector('[style*="font-size: 28px"]');

        if (!codeElement) throw new Error("Elemento de código no hallado");

        result.code = codeElement.textContent.trim();

        return result;

    } catch (error) {

        return { noError: false, errorMessage: error.message };
    }
}

//getCode1clickPlay("disney10@szencuenta.com",1, 1, true)

async function getCodeItrenet(email, attemp = 1, maxAttemps = 3, test) {
    var result = { noError: true };
    if (test) console.log(attemp);
    try {
        await new Promise(r => setTimeout(r, 20_000))
        const url = `https://verifica.itrenet.com/index.php?p=disney&email=${encodeURIComponent(email)}`;

        // Vamos a la página y esperamos que el JS del anti-bot termine (6-8 segundos)
        var res = await fetch(url, { signal: AbortSignal.timeout(20_000) });

        // Extraemos el contenido ya procesado por el navegador
        const htmlText = await res.text();


        if (test && attemp === 1) {
            fs.writeFileSync("./res.html", htmlText);
            console.log("Guaradad")
        }
        if (!htmlText.includes('font-size: 28px')) {
            if (attemp >= maxAttemps) throw new Error("No se obtuvo el código tras reintentos");

            return await getCodeItrenet(email, attemp + 1, maxAttemps);
        }

        const root = parse(htmlText);
        const codeElement = root.querySelector('[style*="font-size: 28px"]');;

        if (!codeElement) throw new Error("Elemento de código no hallado");

        result.code = codeElement.textContent.trim();

        return result;

    } catch (error) {

        return { noError: false, errorMessage: error.message };
    }
}

async function getCodeLermos(email, attemp = 1, maxAttemps = 3) {
    var result = { noError: true };
    //console.log(attemp)
    try {
        await new Promise(r => setTimeout(r, 20_000))
        const url = `https://codigos.lermosplay.com/index.php?p=disney&email=${encodeURIComponent(email)}`;

        // Vamos a la página y esperamos que el JS del anti-bot termine (6-8 segundos)
        var res = await fetch(url, { signal: AbortSignal.timeout(20_000) });

        // Extraemos el contenido ya procesado por el navegador
        const htmlText = await res.text();


        /*  if (attemp === 1) {
             fs.writeFileSync("./res.html", htmlText);
             console.log("Guaradad")
         } */
        if (!htmlText.includes('font-size: 28px')) {
            if (attemp >= maxAttemps) throw new Error("No se obtuvo el código tras reintentos");

            return await getCodeLermos(email, attemp + 1, maxAttemps);
        }

        const root = parse(htmlText);
        const codeElement = root.querySelector('[style*="font-size: 28px"]');;

        if (!codeElement) throw new Error("Elemento de código no hallado");

        result.code = codeElement.textContent.trim();

        return result;

    } catch (error) {

        return { noError: false, errorMessage: error.message };
    }
}

//getCodeLermos("eraseunavez@lermosplay.com", 1, 4).then(r=>console.log(r))


// --- FUNCIÓN ACTUALIZADA PARA BYPASSEAR EL BLOQUEO ---
async function getCodeLatiendajq(email, attemp = 1, maxAttemps = 3, browser) {
    var result = { noError: true };
    const tempContext = await browser.newContext();
    const tempPage = await tempContext.newPage();

    try {
        const url = `https://www.codigos.latiendajq.com/index.php?p=disney&email=${encodeURIComponent(email)}`;

        // Vamos a la página y esperamos que el JS del anti-bot termine (6-8 segundos)
        await tempPage.goto(url);
        await tempPage.waitForTimeout(10000);

        // Extraemos el contenido ya procesado por el navegador
        const htmlText = await tempPage.content();

        if (!htmlText.includes('font-size: 28px')) {
            if (attemp >= maxAttemps) throw new Error("No se obtuvo el código tras reintentos");
            await tempContext.close();
            return await getCodeLatiendajq(email, attemp + 1, maxAttemps, browser);
        }

        const root = parse(htmlText);
        const codeElement = root.querySelector('[style*="font-size: 28px"]');

        if (!codeElement) throw new Error("Elemento de código no hallado");

        result.code = codeElement.textContent.trim();
        await tempContext.close();
        return result;

    } catch (error) {
        await tempContext.close();
        return { noError: false, errorMessage: error.message };
    }
}


async function getCodeMimi(email, attemp = 1, maxAttemps = 3) {
    var result = { noError: true };

    try {
        // --- PASO 1: OBTENER LA COOKIE ACTUAL ---
        // Hacemos un GET rápido a la página principal para que el servidor nos dé una sesión
        const sessionRes = await fetch("https://codigos.mimiplays.com/inicio.php");
        const setCookie = sessionRes.headers.get('set-cookie');

        // Extraemos solo la parte del PHPSESSID (antes del punto y coma)
        const currentCookie = setCookie ? setCookie.split(';')[0] : "";
        // console.log(currentCookie)
        if (!currentCookie && attemp === 1) {
            console.warn("No se pudo obtener PHPSESSID, intentando sin ella...");
        }

        // --- PASO 2: EL POST (Tu lógica original mejorada) ---
        await new Promise(r => setTimeout(r, 25_000));

        var response = await fetch("https://codigos.mimiplays.com/funciones.php", {
            signal: AbortSignal.timeout(20_000),
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "en-US,en;q=0.9,es-US;q=0.8,es;q=0.7",
                "content-type": "application/x-www-form-urlencoded",
                "cookie": currentCookie, // <--- Aquí se inyecta la cookie rescatada
                "Referer": "https://codigos.mimiplays.com/inicio.php"
            },
            "body": "email=" + encodeURIComponent(email) + "&plataforma=Disney%2B",
            "method": "POST"
        });

        var htmlText = await response.text();

        // --- PASO 3: VALIDACIÓN Y REINTENTOS ---
        if (htmlText.includes('0 mensajes encontrados.') || !htmlText.includes('font-size: 28px')) {
            if (attemp >= maxAttemps) {
                throw new Error("No se obtuvo resultado tras " + maxAttemps + " intentos");
            }
            // Reintentamos la función completa (volverá a pedir cookie si es necesario)
            return await getCodeMimi(email, attemp + 1, maxAttemps);
        }

        // Parseo del código
        var root = parse(htmlText.match(/<html[^>]*>((?!<html)[\s\S])*?<\/html>/gi)[0]);
        var codeElement = root.querySelector(`[style*="font-size: 28px"]`);

        result.code = codeElement.textContent.trim();
        return result;

    } catch (error) {
        return {
            noError: false,
            errorMessage: error.message
        };
    }
}
//getCodeLatiendajq("josealfredosoraca@gmail.com", 1, 4)



async function getFreshSession() {
    const response = await fetch("https://codigos.mimiplays.com/inicio.php", {
        method: "GET"
    });

    // Obtenemos la cookie del header 'set-cookie'
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
        // Extraemos solo el PHPSESSID=xxxx...
        return setCookie.split(';')[0];
    }
    return null;
}


/* getCodeMimi("eraseunavez@mimiplays.com")
.then(e=>console.log(e))
.catch(e=>console.log(e)) */



async function getCode(email, attemp = 1) {
    var result = { noError: true };

    try {
        await new Promise(r => setTimeout(r, 8_000));
        var response = await fetch("https://rappitv.afenixx.com/api.php?action=realizarConsulta", {
            headers: {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-requested-with": "XMLHttpRequest"
            },
            body: "plataforma=2&asunto=3&correo=" + encodeURIComponent(email),
            method: "POST"
        });

        var json = await response.json();

        if (!json.success) {
            if (attemp >= 3) {
                throw new Error("No se obtuvo resultado tras 3 intentos");
            }
            return await getCodeMimi(email, attemp + 1);
        }

        var root = parse(json.html);
        result.code = root
            .querySelector(`[style*="font-size: 28px"]`)
            .textContent
            .trim();

        return result;

    } catch (error) {
        return {
            noError: false,
            errorMessage: error.message
        };
    }
}