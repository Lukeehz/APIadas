import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.use("/helloworld", (req:any, res:any) => {
    res.send("Hello World!");
});

export default router;