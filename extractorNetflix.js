import fs from "fs";
import { JSDOM } from "jsdom";
import http from "http";

const PATH = "./resultS.json";
const START_NUM = 1502;
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const DISNEY_TEXT = "legalmente válido en formatos PDF y XML.";

let results = [];

// si ya existe el archivo, lo cargamos
if (fs.existsSync(PATH)) {
  results = JSON.parse(fs.readFileSync(PATH, "utf8"));
}

/* ================== SERVIDOR ================== */
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    res.end(JSON.stringify(results, null, 2));
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(process.env.port || 3000, () => {
  console.log("Servidor escuchando en http://localhost:3000/");
});

/* ================== PROCESO ================== */
async function processEmails() {
  for (let i = START_NUM; i >= 0; i--) {

    const result = {
      num: i,
      noError: true,
      type: "none"
    };

    try {
      const response = await fetch(
        `https://mailacess.com/leer.php?msgno=${i}`
      );

      const htmlText = await response.text();
      const dom = new JSDOM(htmlText);
      const document = dom.window.document;

      /* ---------- DISNEY ---------- */
      if (document.body.textContent.includes(DISNEY_TEXT)) {
        result.type = "disney-facturacion";
      }

      /* ---------- NETFLIX ---------- */
      else {
        const htmlElement = document.querySelector(
          "table.copy-table.footer-copy.disclaimer > tbody > tr > td > span"
        );

        if (
          htmlElement &&
          htmlElement.textContent?.includes("] como parte de tu membresía.") &&
          htmlElement.textContent?.match(EMAIL_REGEX)
        ) {
          result.type = "netflix";
          result.match = htmlElement.textContent.match(EMAIL_REGEX).join(",");
        }

        /* ---------- EMAIL GENÉRICO ---------- */
        else {
          const emails = document.body.textContent.match(EMAIL_REGEX);
          if (emails) {
            result.type = "email";
            result.match = [...new Set(emails)].join(",");
          }
        }
      }

    } catch (err) {
      result.noError = false;
      result.errorMessage = err.stack;
    } finally {
      results.push(result);
      fs.writeFileSync(PATH, JSON.stringify(results, null, 2));
    }
  }
}

processEmails();
