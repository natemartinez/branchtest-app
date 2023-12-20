import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import '../style.css';

// Component will output the correct level options
 const Levels = ({playerName}) => {
    // count receives level number from player info
    const [count, setCount] = useState(null);

    async function getLevel(currentUser){
      console.log(currentUser);
      // This function will return the currentStage data
      // which will send to Levels to iterate over it
       axios.post('http://localhost:3000/currentStage', currentUser)
        .then(response => {
         console.log(response.data);
         
        })
        .catch(error => {
         console.error('Error:', error);
        });
   
     };
      

    getLevel(playerName);

    // Each level will show level number, location and options

  return (
    <div>
      <div>
        
      </div>
         
        <button>Continue</button>
    </div>
  );
}

export default Levels;