import 'dotenv/config';
import mongoose from 'mongoose';
import express from "express";
import path from "path";
import cors from "cors";
import router from "./routers/rotas.mjs";  // removido .mts
import apiadas from "./routers/apidas.mjs"; // removido .mts
import err404 from "./routers/err404.mjs"; // removido .mts
import logger from "./log/logger";
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 80; // permitir porta dinâmica do Vercel
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

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@apiadas.3o9p7.mongodb.net/?retryWrites=true&w=majority&appName=Apiadas`)
.then(() => {
    if (process.env.NODE_ENV !== 'production') {
        app.listen(port, '0.0.0.0', () => console.log(`Servidor rodando na porta ${port}`));
    }
});

// Exportação necessária para o Vercel
export default app;