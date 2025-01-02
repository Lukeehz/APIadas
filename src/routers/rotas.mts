import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "../../public");

router.get("/", (req:any, res:any)=>{
    res.redirect("/home")
})

router.get("/helloworld", (req:any, res:any) => {
    res.send("Hello World!");
});

router.get("/home",(req:any, res:any) =>{
    try{
        res.sendFile(`${basePath}/html/index.html`);
    }
    catch(err){
        res.send(err);
    }
})
router.get("/register",(req:any, res:any) =>{
    try{
        res.sendFile(`${basePath}/html/register.html`);
    }
    catch(err){
        res.send(err);
    }
})

export default router;