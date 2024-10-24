import 'dotenv/config'
import mongoose from 'mongoose';
import express from "express"
import router from "./routers/rotas.mts"
import apiadas from "./routers/apidas.mts"
import err404 from "./routers/err404.mts"
import path from "path" 
import { fileURLToPath } from 'url';
const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname)

app.use("/", router)
app.use(express.json());

app.use("/apiadas", apiadas)

router.get("/", (req:any, res:any) => {
    res.send("Inicio")
})

const dbUser= 'public'
const dbPassword = "public"

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@apiadas.3o9p7.mongodb.net/?retryWrites=true&w=majority&appName=Apiadas`)
.then(() => {
    app.listen(port, () => console.log(`Servidor rodando na porta ${port} acesse http://localhost:${port}`));
})
