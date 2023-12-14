import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import '../style.css';

 const Levels = ({currentLevel}) => {
    const [level, setLevel] = useState(currentLevel);

    // Take currentLevel from MongoDB
    const stages = [
        {
            id: 1,
            text: 'hello',
            stageInfo: {
               stageNum:1.1,
               options:['Closet', 'Drawer', 'Under the bed'],
            },
            level: 1.1
        },
        // use .map() & select the choices with the matching level
    ];

  return (
    <div>
       
        <button>Continue</button>
    </div>
  );
}

export default Levels;