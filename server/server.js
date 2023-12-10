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
  const userData = req.body;
  const newPlayer = new PlayerModel({
    username: userData.username,
    password: userData.password,
    stats: []
  });

  //Function checks if user exists or not
  async function checkUser() {
    try {
      const results = await PlayerModel.find({ username: newPlayer.username });
      if (results.length > 0) {
        res.send('User already exists');
      } else {
        console.log('No documents found.');
        newPlayer.save()
        .then(updatedDocument => {
          console.log('Updated Document:', updatedDocument);
          res.send('Signup Complete!')
        })
        .catch(err => {
          console.error('Error:', err);
        });
      }
    } catch (err) {
      console.error('Error:', err);
    };
  };
  
  checkUser(); 

});

app.post('/sendUser', async (req, res) => {
  const username = req.body[0];
  const results = req.body[1];

  console.log(username, results);

  try {
    let doc = await PlayerModel.findOne({ username: username.user });

    if (!doc) {
      doc = new PlayerModel({ username: username.user, stats: results });
      await doc.save();

      console.log('New document inserted successfully.');
      res.status(200).json({ message: 'New document inserted successfully' });

    } else {
      await PlayerModel.updateOne({ username: username.user }, { $set: { stats: results } });
      console.log('Document updated successfully.');
      res.status(200).json({ message: 'Document updated successfully' });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Error updating document' });
  }



});


 
connect();

app.listen(3000, () => {
  console.log('Server started on port 3000');
});