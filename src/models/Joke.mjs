import mongoose from 'mongoose';
var jokeSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    joke: { type: String, required: true },
    response: { type: String, required: true }
});
var Joke = mongoose.model('Joke', jokeSchema);
export default Joke;
