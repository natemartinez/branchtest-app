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

//Checks if there's not an existing user
app.post('/signup', (req, res) => {
  const userData = req.body;
  const newPlayer = new PlayerModel({
    username: userData.username,
    password: userData.password,
  });

  async function checkUser() {
    try {
      const results = await PlayerModel.find({ username: newPlayer.username });
      if (results.length > 0) {
        res.send({message:"User already exists"});
      } else {
        console.log('No documents found.');
        newPlayer.save()
        .then(updatedDocument => {
          console.log('Updated Document:', updatedDocument);
          res.send({message:'Signup Complete!'})
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
app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    // Check the username and the password

    let doc = await PlayerModel.find({ $and: [
      { username: username },
      { password: password }
    ]});

    // use username to look 

    if (!doc || doc.length === 0) {
      res.status(200).json({ message: "User doesn't exist" });

    } else {
      console.log('Login Successful');
      let currentUser = doc[0];
      res.status(200).json({currentUser, message: 'Login Successful' });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Error updating document' });
  }
  
});

//Handles quiz results and intializes 'stats'
app.post('/sendUser', async (req, res) => {
  const username = req.body[0];
  const results = req.body[1];

  let stats = {
    'physical': {
      'strength': 1,
      'dexterity': 1
    },
    'mental': {
      'intuition': 1,
      'intelligence': 1
    },
    'soul': {
      'willpower': 1,
      'resistance': 1
    },
    'expression': {
      'creativity': 1,
      'presence': 1
    }
  };

  let progressStart = 1.1;

  results.forEach(result => {
    switch (result) {
       case 'Logical':
       stats.mental.intelligence += 2;
       stats.mental.intuition += 1;
       break;
       case 'Creative':
       stats.expression.creativity += 2;
       stats.expression.presence += 1;
       break;
       case 'Introvert':
       stats.mental.intuition += 2;
       stats.expression.creativity += 1;
       break;
       case 'Extrovert':
       stats.expression.presence += 2;
       stats.soul.willpower += 1;
       break;
       case 'Early Bird':
       stats.physical.strength += 1;
       stats.physical.dexterity += 1;
       break;
       case 'Night Owl':
       stats.soul.resistance += 1;
       stats.soul.willpower += 2;
       break;
       case 'Fierce':
       stats.physical.strength += 2;
       stats.soul.willpower += 1;
       stats.soul.resistance += 1;
       break;
       case 'Steady':
       stats.mental.intuition += 2;
       stats.expression.presence += 1;
       stats.soul.willpower += 2;
       break;
    } 
  });

  try {
    let doc = await PlayerModel.findOne({ username: username.user });

    if (!doc) {
      doc = new PlayerModel({ username: username.user, personality: results, stats: stats, progress: progressStart});
      await doc.save();
      res.status(200).json({ message: 'New document inserted successfully' });
    } else {
      await PlayerModel.updateOne({ username: username.user }, { $set: { personality: results, stats: stats, progress: progressStart } });
      res.status(200).json({ message: 'Document updated successfully', stats });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Error updating document' });
  }
});

// All stages
app.post('/currentStage', async (req, res) => {
    const {username} = req.body;
    // Now i will use the username thats inside req.body with .find()
    // to find the data that's associated with that user
    // user stat values must be strings

    const Stages = [
      {
          id: 1,
          text: 'hello',
          stageInfo: {
             stageNum:1.1,
             options:[
              {
                name:'Closet',
                type: 'strength',
                difficulty: 1,
                result: 'Jacket'
              }
             ]
          },
          level: 1.1
      },
  // use .map() & select the choices with the matching level
    ];

    function buildOptions(level, stats){
        
      for (let i = 0; i < Stages.length; i++) {
        if (Stages[i].level === level) {
          let options = Stages[i].stageInfo.options;
          options.map((option, index) => {
            // match the option type to the user stat
            console.log(option);
            console.log(stats);
          })

          break;
        }
      }
      
    }

    try {
      let doc = await PlayerModel.findOne({ username: username });
      
      if (doc) { 
        const userProgress = doc.progress;
        const userStats = doc.stats;

        await buildOptions(userProgress, userStats);
        res.status(200).json({ message: "Found user data" });
      }
    } catch (err) {
        console.error('Error', err);
        res.status(500).json({ message: "An error has occurred" });
    };
});

connect();

app.listen(3000, () => {
  console.log('Server started on port 3000');
});