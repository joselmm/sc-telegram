
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
        var exam = {
            "userName": "ravenorginal_bot",
            "currentCards": 1,
            "bin": "435546470404xxxx|12|2027|rnd",
            "gate": ".pp",
            "group_chat_id": "#1826982435",
            "person_chat_id": 1835590672,
            "bot_token": "6832202278:AAFjb4FtUKxH47-37kiE7apho9s8X6nDpvk",
            "num_to_find": 2,
            "to_wait_card_send": 18,
            "wait_to_begin": 30,
            "max_atemps_per_bin": 30
        }

        
        await startChecking(req?.body || exam);
        res.json({ noError: true })

    } catch (error) {

        res.json({ noError: false, message: error.message })
    }

});

app.get("/stop-checking", (req, res) => {

    try {
       var force= req.query.hasOwnProperty('force')
        stopNextTime(force);
        res.json({ noError: true })

    } catch (error) {
        res.json({ noError: false, message: error.message })
        
    }

})

app.listen(port, () => {
    console.log("Escuchando en el puerto " + port)
})

