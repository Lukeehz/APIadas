import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
const err404 = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

err404.use((req, res, next) => {
    res.status(404).send("Página não encontrada");
});

export default err404;