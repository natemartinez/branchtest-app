const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PlayerModel = require('./models/player');

const app = express();
app.use(express.json());
app.use(cors())

const uri = 'mongodb+srv://nathanielmartinez2001:Lj092101@branchtest.4khizxi.mongodb.net/?retryWrites=true&w=majority'

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error){
        console.error(error);
    }
}

app.get('/api', (req, res) => {
    PlayerModel.create(req.body)
    .then(player => res.json(player))
    .catch(err => res.json(err))
})

connect();

app.listen(3000, () => {
    console.log('server started on port 3000');
})