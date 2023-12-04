const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    username: String,
    password: String,
    stats: Object,
    progress: Object
})

const PlayerModel = mongoose.model('players', playerSchema);

module.exports = PlayerModel;