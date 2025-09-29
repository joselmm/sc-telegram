
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
    console.log("Escuchando en el puerto " + port)
})

