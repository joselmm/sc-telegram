import { exec } from "child_process";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express"
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());

import { startChecking,  stopNextTime } from "./modules/checkerActions.js"


app.use(express.json());
app.post("/start-checking", async (req, res) => {
    
    try {
        console.log(req.body)

        await startChecking(req?.body || exam);
        res.json({ noError: true })

    } catch (error) {

        res.json({ noError: false, message: error.message })
    }

});
//INTERFAZ
app.get("/", (req, res) => {
  res.sendFile("interfaz.html", { root: "." });
});

app.get("/stop-checking", (req, res) => {

    try {
        
       var force= Object.keys(req?.query).includes("force");
       
        stopNextTime(force);
        res.json({ noError: true })

    } catch (error) {
        res.json({ noError: false, message: error.message })
        
    }

})

app.listen(port, () => {
  console.log("Escuchando en el puerto " + port);

  // Si el segundo argumento (después de node app) es "abrir"
  if (process.argv[2] === "abrir") {
    const url = `http://localhost:${port}/`;

    // Windows / Mac / Linux
    const start =
      process.platform == "darwin"
        ? "open"
        : process.platform == "win32"
        ? "start"
        : "xdg-open";

    exec(`${start} ${url}`);
  }
});

