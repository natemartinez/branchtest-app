import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import '../style.css';

// Component will output the correct level options
 const Levels = ({playerName}) => {
    // count receives level number from player info
    const [level, setLevel] = useState(null);

    const [showResult, setShowResult] = useState(false);
    const [showResultEvent, setShowResultEvent] = useState(false);

    const [options, setOptions] = useState([]);
   
    const displayOptions = (options) => {
      // setOptions = optionName
      // className = difficulty
       let optionNames = [];

       for(let i=0; i < options.length; i++){
        let optionObj = {
           "name" : options[i].name,
           "diff" : options[i].probability,
           "result" : options[i].result,
        }
        
        optionNames.push(optionObj);
       }
      
      setOptions(optionNames);
      // the problem is that it can't be iterated since it's
      // an object
    };

    const triggerResult = (result, prob) => {

      let outcome = Math.floor(Math.random() * 100);

      const decideOutcome = (outcome) => {
        if (prob === 'easy'){
          if(outcome < 90){
           setShowResult('success');
           setShowResultEvent('You have received a ' + result);
          } else {
           setShowResult('fail');
           setShowResultEvent('You have received nothing');
          }
        } else if (prob === 'hard'){
          if(outcome > 90){
           setShowResult('success' );
           setShowResultEvent('You have received a ' + result);
          } else {
           setShowResult('fail');
           setShowResultEvent('You have received nothing');
          }
        } else {
          if(outcome > 50){
           setShowResult('success');
           setShowResult('You have received a ' + result);
          } else {
           setShowResult('fail');
           setShowResultEvent('You have received nothing');
          }
        }
      };

      decideOutcome(outcome);
    };

    const setClicked = (event) => {
      event.target.className = 'game-btn-clicked';
    };

    
    const nextLevel = (currentUser) => {
      //accesses doc.progress to then increase it by one 
      // when the next button is clicked
      axios.post('http://localhost:3000/updateProgress', currentUser)
        .then(response => {
          console.log(response.data);
          
        })
        .catch(error => {
         console.error('Error:', error);
        });
    }

    async function getLevel(currentUser){
      // This function will return the currentStage data
      // which will send to Levels to iterate over it
       axios.post('http://localhost:3000/currentStage', currentUser)
        .then(response => {
          displayOptions(response.data.options);
        })
        .catch(error => {
         console.error('Error:', error);
        });
    };
    
    getLevel(playerName);

    // Each level will show level number, location and options

  return (
    <div className='game-options'>
      {options.map((option, index) => (
        <div key={index}>
          <button 
            onClick={(event) => {setClicked(event); triggerResult(option.result, option.diff);}}
            className='game-btn' id={option.diff} type="submit">
            {option.name}
          </button>
        </div>
      ))}
      {showResult && (
      <div className='result-div'>
        <div className='result-info'>
          <h1>{showResult}</h1>
          <h3>{showResultEvent}</h3>
          <button onClick = {() => setShowResult(false)}type="submit">Continue</button>
        </div>
        
      </div>
      )}
      <button onClick={() => nextLevel(playerName)} id='next-btn'>Next</button>
    </div>
  );
}

export default Levels;