const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    password: String
})

const PlayerModel = mongoose.model('players', playerSchema);

module.exports = PlayerModel;