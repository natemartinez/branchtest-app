import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import '../style.css';

 const Levels = ({currentLevel}) => {
    const [level, setLevel] = useState(currentLevel);

    const choices = [
        {
            id: 1,
            text: 'hello',
            options: ['Closet', 'Drawer', 'Under the bed'],
            level: 1.1
        }
        // use .map() & select the choices with the matching level
    ];


    const cycleChoiceBtns = (choices) => {
    
    };

    const nextLevel = () => {
      setLevel(level + 1);
    }
    
    console.log(level);

  return (
    <div>
        <button onClick={nextLevel}>Continue</button>
    </div>
  );
}

export default Levels;