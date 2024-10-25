import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "../../public");

router.use("/helloworld", (req:any, res:any) => {
    res.send("Hello World!");
});

router.use("/home",(req:any, res:any) =>{
    try{
        res.sendFile(`${basePath}/html/index.html`);
    }
    catch(err){
        res.send(err);
    }
})

export default router;