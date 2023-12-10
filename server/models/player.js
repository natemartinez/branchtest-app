const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    username: String,
    password: String,
    stats: Array,
    progress: Object
})

const PlayerModel = mongoose.model('players', playerSchema);

module.exports = PlayerModel;