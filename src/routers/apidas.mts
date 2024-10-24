import express from 'express';
import Joke from '../models/Joke.mts';

const apiadas = express.Router();

apiadas.post("/api/register", async (req, res) => {
    const { joke, response } = req.body;

    if (!joke) {
        return res.status(422).json({ msg: "O campo 'joke' é obrigatório" });
    }
    if (!response) {
        return res.status(422).json({ msg: "O campo 'response' é obrigatório" });
    }

    try {
        const lastJoke = await Joke.findOne().sort({ id: -1 });
        const newId = lastJoke ? lastJoke.id + 1 : 1;

        const newJoke = new Joke({
            id: newId,
            joke,
            response
        });

        await newJoke.save();

        res.status(201).json({ msg: "Piada registrada com sucesso!" });
    } catch (err) {
        res.status(500).json({ msg: "Erro ao registrar a piada", error: err.message });
    }
});

apiadas.get("/api/jokes", async (req, res) => {
    try {
        const jokes = await Joke.find();
        if (jokes.length === 0) {
            return res.status(404).json({ msg: "Nenhuma piada encontrada" });
        }
        res.status(200).json(jokes);
    } catch (err) {
        res.status(500).json({ msg: "Erro ao buscar as piadas", error: err.message });
    }
});

export default apiadas;
