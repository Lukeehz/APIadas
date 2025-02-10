import express from 'express';
import axios from 'axios';
import Joke from '../models/Joke.mts';
import logger from "../log/logger.ts"

const apiadas = express.Router();

apiadas.post("/api/register", async (req:any, res:any) => {
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


        logger.info(`Piada registrada com sucesso! ID: ${newId} - Data e Hora: ${new Date().toLocaleString()}`);
        console.log(`Piada registrada com ID ${newId}`)
        res.status(201).json({ msg: "Piada registrada com sucesso!" });
    } catch (err) {
        logger.error(`Erro ao buscar as piadas: ${err.message}`);  // Log de erro
        res.status(500).json({ msg: "Erro ao registrar a piada", error: err.message });
    }
});

apiadas.get("/api/jokes", async (req:any, res:any) => {
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

apiadas.get('/apiadas/api/jokes', async (req:any,res:any)=>{

     if (id){
        try{
            const joke = await Joke.findOne({id: id})
            if(!joke){
                res.status(404).json({msg: "Piada não encontrada"})
            }
            res.status(200).json(Joke)
        }catch (err){
            res.status(500).json({msg: "Erro ao buscar a piada", error: err.message})
        }
    }
    

})

apiadas.get("/api/jokes/select", async (req:any, res:any)=>{  

    const jokes = await Joke.find()

    const randomIndex = Math.floor(Math.random() * jokes.length);
    const selectedJoke = jokes[randomIndex];

    logger.info(`Piada aleatória selecionada com sucesso! ID: ${selectedJoke.id} - Data e Hora: ${new Date().toLocaleString()}`);
    console.log(`Piada selecionada do ID ${selectedJoke.id}`)

    res.json({
        joke: selectedJoke.joke,
        response: selectedJoke.response
    })

})
export default apiadas;
