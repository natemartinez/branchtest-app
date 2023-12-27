const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    username: String,
    password: String,
    status: Object,
    personality: Array,
    stats: Object,
    progress: Number
})

const PlayerModel = mongoose.model('players', playerSchema);

module.exports = PlayerModel;