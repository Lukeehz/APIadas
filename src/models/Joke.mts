import mongoose from 'mongoose';

const jokeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  joke: { type: String, required: true },
  response: { type: String, required: true }
});

const Joke = mongoose.model('Joke', jokeSchema);

export default Joke;