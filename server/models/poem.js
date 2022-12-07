const mongoose = require('mongoose');

const poemSchema = new mongoose.Schema({
    model: {
        type: String,
    },
    prompt: {
        type: String,
    },
    meter: {
        type: String,
    },
    out: {
        type: String,
    },
})
const poemModel = mongoose.model('models_poems', poemSchema)
module.exports = poemModel;