import puppeteer from "puppeteer-core"; // o 'puppeteer' si no usas Core
import fs from "fs/promises";

const TELEGRAM_URL = "https://web.telegram.org/a/";
const TELEGRAM_CHAT_URL = "https://web.telegram.org/a/#-1002098742889";

(async () => {
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  // 1️⃣ Leer el localStorage desde el archivo JSON
  const localStorageData = JSON.parse(await fs.readFile("./localStorage.json",
    "utf8"));
  console.log("📦 Cargado localStorage.json con", Object.keys(localStorageData).length,
    "claves");

  // 2️⃣ Lanzar navegador (ajusta executablePath a tu Chrome real si usas puppeteer-core)
  const browser = await puppeteer.launch({
    headless: false, // cambia a true si no quieres ver el navegador
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",// o donde esté tu Chrome

  });

  // 3️⃣ Crear una pestaña para cargar Telegram
  const page = await browser.newPage();
  await page.goto(TELEGRAM_URL,
    {
      waitUntil: "domcontentloaded"
    });

  // 4️⃣ Inyectar el localStorage dentro de Telegram Web
  await page.evaluate((data) => {
    for (const [key, value
    ] of Object.entries(data)) {
      localStorage.setItem(key, value);
    }
    console.log("✅ localStorage inyectado en la página");
  }, localStorageData);

  // 5️⃣ Esperar a que se guarde correctamente
  await sleep(1600);

  // 6️⃣ Cerrar la pestaña actual (ya tiene el localStorage configurado)
  await page.close();

  // 7️⃣ Abrir nueva pestaña directamente en el chat deseado
  const chatPage = await browser.newPage();
  chatPage.setViewPort(width:931)
  await chatPage.evaluate(() => {
    // Esta línea ejecuta el atajo de Chrome
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'F12' }));
  });

  await chatPage.goto(TELEGRAM_CHAT_URL,
    {
      waitUntil: "networkidle2"
    });

  console.log("🚀 Navegando al chat:", TELEGRAM_CHAT_URL);

  await chatPage.evaluate(async () => {
    // Tu código original aquí ↓↓↓
    (async function main() {
      const sleep = (ms) => new Promise(r => setTimeout(r, ms));

      const jsPath = (el) => {
        const esc = (s) => (window.CSS && CSS.escape) ? CSS.escape(s) : String(s).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
        const parts = [];
        let node = el;
        while (node && node.nodeType === 1 && node !== document) {
          let sel = node.nodeName.toLowerCase();
          if (node.id) {
            sel += '#' + esc(node.id);
            parts.unshift(sel);
            break;
          }
          if (node.classList && node.classList.length) {
            sel += '.' + [...node.classList].map(esc).join('.');
          }
          let idx = 1, sib = node;
          while ((sib = sib.previousElementSibling)) {
            if (sib.nodeName === node.nodeName) idx++;
          }
          sel += `:nth-of-type(${idx})`;
          parts.unshift(sel);
          node = node.parentElement;
        }
        return parts.join(' > ');
      };

      const storedIds = JSON.parse(localStorage.getItem('ids') || '[]');
      const storedPaths = JSON.parse(localStorage.getItem('paths') || '[]');
      const ids = new Set(storedIds);
      const paths = new Set(storedPaths);

      console.log(`Reanudando con ${ids.size} IDs y ${paths.size} paths guardados.`);

      const scrollElement = document.querySelector(
        "#MiddleColumn > div.messages-layout > div.Transition > div > div.Transition.MessageList.custom-scroll.no-composer.with-default-bg.scrolled"
      );

      for (let i = 0; i < 50; i++) {
        await sleep(500);
        const found = Array.from(document.querySelectorAll('.messages-container .shown.open a[href="#"]'))
          .filter(e => !e.innerText.toLowerCase().includes("deleted") && !e.classList.contains("id-saved"));
        if (found.length === 0) {
          scrollElement?.scrollBy({ top: -400, behavior: 'smooth' });
          await sleep(900);
          continue;
        }
        const lastOne = found.at(-1);
        lastOne.scrollIntoView({ behavior: "smooth" });
        await sleep(800);
        lastOne.click();
        await sleep(1000);
        const [, id] = (location.href || '').split("#");
        if (id && !ids.has(id)) {
          ids.add(id);
          console.log("Nuevo ID:", id);
          localStorage.setItem('ids', JSON.stringify([...ids]));
        }
        window.history.back();
        await sleep(1200);
      }
    })();
  });


  // 8️⃣ (Opcional) Cerrar todo
  // await browser.close();
})();
