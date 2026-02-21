import puppeteer from 'puppeteer-core';
import fs from 'fs';

var lsPath = 'storage\\localStorage.json';
var cookiePath = 'storage\\cookies.json';

const rawCookies = JSON.parse(fs.readFileSync(cookiePath, 'utf-8'));
const rawLocalStorage = fs.existsSync(lsPath)
    ? JSON.parse(fs.readFileSync(lsPath, 'utf-8'))
    : {};

function formatCookiesForPuppeteer(cookiesArr) {
    return cookiesArr.map(c => {
        let normalizedSameSite = "Lax";
        if (c.sameSite && typeof c.sameSite === 'string') {
            const ss = c.sameSite.toLowerCase().trim();
            if (ss === "no_restriction" || ss === "none") normalizedSameSite = "None";
            else if (ss === "strict") normalizedSameSite = "Strict";
            else if (ss === "lax") normalizedSameSite = "Lax";
        }

        return {
            name: c.name,
            value: c.value,
            domain: c.domain,
            path: c.path,
            expires: c.expirationDate || -1,
            httpOnly: !!c.httpOnly,
            secure: !!c.secure,
            sameSite: normalizedSameSite
        };
    });
}

async function run() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Users\\Usuario\\AppData\\Local\\ms-playwright\\chromium-1208\\chrome-win64\\chrome.exe',
        args: ['--start-maximized']
    });

    // 1. OBTENER EL CONTEXTO POR DEFECTO (Para evitar warnings)
    const context = browser.defaultBrowserContext();

    // 2. CONFIGURAR COOKIES A NIVEL DE CONTEXTO (No de página)
    const formattedCookies = formatCookiesForPuppeteer(rawCookies);
    await context.setCookie(...formattedCookies);

    // 3. RECUPERAR LA PESTAÑA PRINCIPAL
    const pages = await browser.pages();
    const page = pages[0];

    // 4. CONFIGURAR USER AGENT (Aunque sea deprecated en Page, en puppeteer-core 
    // sigue siendo la forma más estable antes de navegar)
    await page.setUserAgent('Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36');

    // 5. INYECTAR LOCALSTORAGE (Requiere estar en el dominio)
    console.log("Inyectando sesión...");
    await page.goto('https://mail.google.com/mail/u/0/', { waitUntil: 'domcontentloaded' });
    
    await page.evaluate((data) => {
        for (const key in data) {
            localStorage.setItem(key, data[key]);
        }
    }, rawLocalStorage);

    await page.reload({ waitUntil: 'networkidle2' });

    // --- PARSER DE THREADS ---
    page.on('response', async (response) => {
        const url = response.url();
        if (url.includes('mail/u/0/s/')) {
            const request = response.request();
            if (request.method() === 'POST') {
                const postData = request.postData() || '';
                if (postData.includes('threadlist') || postData.includes('search')) {
                    try {
                        const text = await response.text();
                        const match = text.match(/\d+&(\[.*])/s);
                        if (match) {
                            const data = JSON.parse(match[1]);
                            const threads = data[0]?.[0]?.[2]?.[5];
                            if (Array.isArray(threads)) {
                                console.log(`\n📬 Bandeja actualizada: ${threads.length} correos.`);
                                threads.forEach(t => {
                                    const otp = t[4].match(/\b\d{6}\b/);
                                    console.log(`- ${t[3]} ${otp ? '🔥 OTP: ' + otp[0] : ''}`);
                                });
                            }
                        }
                    } catch (e) {}
                }
            }
        }
    });

    console.log("Monitor activo. Esperando correos...");
}

run();