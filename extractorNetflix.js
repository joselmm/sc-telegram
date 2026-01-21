import fs from "fs";
import { JSDOM } from "jsdom";
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

const START_NUM = 19413;
var EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

const DISNEY_TEXT = "legalmente válido en formatos PDF y XML.";



app.use(cors({ origin: '*' }))

const PATH = "./extractorNetflix-palmeras.json";
const JSON_PATH = "" + PATH;

app.get('/', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'))
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'No se pudo leer el JSON' })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`)
})





const results = [];

async function processEmails() {
  for (let i = START_NUM; i >= 0; i--) {
    console.log(i)
    if (i === 0) {
      console.log("ya termino");
      break
    }
    const result = {
      num: i,
      noError: true,
      type: "none"
    };

    try {

      const response = await fetch(
        `https://www.palmerascity.es/leer.php?msgno=${i}`
      );
      const htmlText = await response.text();

      const dom = new JSDOM(htmlText);
      const document = dom.window.document;

      /* ---------- DISNEY ---------- */
      if (document.body.textContent.includes(DISNEY_TEXT)) {
        result.type = "disney-facturacion";
      }

      //      console.log(document.body.textContent)

      if (document.body.textContent.toLowerCase().includes("disney") && document.body.textContent?.match(EMAIL_REGEX)) {
        result.type = "disney";
        result.match = document.body.textContent?.match(EMAIL_REGEX).join(",")
      }

      if (document.body.textContent.toLowerCase().includes("crunchyroll") && document.body.textContent?.match(EMAIL_REGEX)) {
        result.type = "crunchyroll";
        result.match = document.body.textContent?.match(EMAIL_REGEX).join(",")
      }
      if (document.body.textContent.toLowerCase().includes("paramount") && document.body.textContent?.match(EMAIL_REGEX)) {
        result.type = "paramount";
        result.match = document.body.textContent?.match(EMAIL_REGEX).join(",")
      }

      if ((document.body.textContent.toLowerCase().includes("hbomax") || document.body.textContent.toLowerCase().includes("hbo max")) && document.body.textContent?.match(EMAIL_REGEX)) {
        result.type = "hbomax";
        result.match = document.body.textContent?.match(EMAIL_REGEX).join(",")
      }

      if ((document.body.textContent.toLowerCase().includes("prime video") || document.body.textContent.toLowerCase().includes("amazon")) && document.body.textContent?.match(EMAIL_REGEX)) {
        result.type = "prime";
        result.match = document.body.textContent?.match(EMAIL_REGEX).join(",")
      }

      /* ---------- NETFLIX ---------- */
      else {
        var htmlElement = document.querySelector("table.copy-table.footer-copy.disclaimer > tbody > tr > td > span");
        //console.log(JSON.stringify(htmlElement.textContent))
        if (htmlElement && (htmlElement.textContent?.includes("] como parte de tu membresía.") || htmlElement.textContent?.includes("] by Netflix as part of your Netflix membership.")) && htmlElement.textContent?.match(EMAIL_REGEX)) {
          result.type = "netflix";
          result.match = htmlElement.textContent?.match(EMAIL_REGEX).join(",");

        }

        /* ---------- EMAIL GENÉRICO ---------- */
        else {
          const emails = document.body.textContent.match(
            EMAIL_REGEX
          );

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
      if (result.type !== "none") {
        results.push(result);
      }
      fs.writeFileSync(PATH, JSON.stringify(results, null, 2));
    }
  }
}

processEmails();
