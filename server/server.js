const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PlayerModel = require('./models/player');
const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://natemartinez:Lj092101@players.m8tq7fu.mongodb.net/info?retryWrites=true&w=majority';

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}

app.post('/signup', (req, res) => {
  const { key1, key2 } = req.body;
  console.log('Received Data:', key1, key2);
  
  res.json({ message: 'Data received successfully' });
});

connect();

app.listen(3000, () => {
  console.log('Server started on port 3000');
});