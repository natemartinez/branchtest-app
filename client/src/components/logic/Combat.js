import React, { useState, useEffect } from 'react';
import axios from 'axios';

 const Combat = ({level}) => {
    console.log(level);

    const Options = [{name:'Attack'},{name:'Skills'},{name:'Items'}, {name:'Escape'}]; 
    /*
    const receiveUserData  = (level) => {

    }
    */

    const displayEnemies = (level) => {
      let curLevel = {
        levelNum:level
      };


      axios.post('http://localhost:3000/combatStart', curLevel)
      .then(response => {
         let enemies = response.data;
         console.log(enemies)
       })
      .catch(error => {
         console.error('Error:', error);
       });

       return (
          <div className='enemy-div'>
            <p>enemy</p>
          </div>
       )
    };
   
  return (
    <div>
       {displayEnemies(level)}
      <div className='option-div'>
        {Options.map((option, index) => (
           <div key={index}>
             <button 
              className='game-btn' type="submit">
              {option.name}
            </button>
          </div>  
       ))}
      </div>
    </div>
  );
}

export default Combat;