import 'dotenv/config';
import mongoose from 'mongoose';
import express from "express";
import path from "path"; 
import cors from "cors";
import router from "./routers/rotas.mts";
import apiadas from "./routers/apidas.mts";
import err404 from "./routers/err404.mts";
import logger from "./log/logger.ts"
import { fileURLToPath } from 'url';


const app = express();
const port = 80;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "../public/");
app.use(express.static(path.join(__dirname, '../public')));

console.log(basePath);

app.use(express.json());
app.use(cors());

app.use("/", router);
app.use("/apiadas", apiadas);
app.use(err404);

const dbUser = "public";
const dbPassword ="RipGLm9VYI3jJBc0";

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@apiadas.3o9p7.mongodb.net/?retryWrites=true&w=majority&appName=Apiadas`)
.then(() => {
    app.listen(port, '0.0.0.0', () => console.log(`Servidor rodando na porta ${port} acesse http://meusite.local:${port}`));
});
