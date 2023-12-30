import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import '../style.css';

// Component will output the correct level options
 const Levels = ({playerName}) => {
    // count receives level number from player info
    const [stageType, setStageType] = useState(null);

    const [showResult, setShowResult] = useState(false);
    const [showResultEvent, setShowResultEvent] = useState(false);

    const [options, setOptions] = useState([]);

    const [location, setLocation] = useState('');

    const buttons = document.querySelectorAll('.game-btn-clicked');

    const setInactive = (event) => {
     // sets the specific button chosen as a clicked class
      event.target.className = 'game-btn-clicked';
    };

    const displayOptions = (type, options) => {
      let optionNames = [];
      setStageType(type);

      for(let i=0; i < options.length; i++){
         let optionObj = {
           "name" : options[i].name,
           "diff" : options[i].probability,
           "result" : options[i].result,
         }
         optionNames.push(optionObj);
      }
      setOptions(optionNames);
    };

    const triggerResult = (currentUser, result, prob) => {
       // setting location object to send to server
       if(stageType === 'location'){
        // highlight the button
        // must wait to press next button
        // do I use async??
         setLocation(result);
        // MUST CHANGE 
       } else if(stageType === 'search'){
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

       }
    
    };

    async function getLevel(currentUser) {
      // This function will return the currentStage data
      // which will send to Levels to iterate over it

       axios.post('http://localhost:3000/currentStage', currentUser)
        .then(response => {
          let options = response.data.options;
          let type = response.data.stageType;
          displayOptions(type, options);
        })
        .catch(error => {
         console.error('Error:', error);
        });
    };

    const nextLevel = (currentUser, level) => { 
       
       if(stageType === 'location'){
        buttons.forEach((button) => {
          button.className = 'game-btn';
         });
        let location = {
           currentUser,
           level: level
        };

        axios.post('http://localhost:3000/locationChange', location)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
         console.error('Error:', error);
        });
       } else {
  
          buttons.forEach((button) => {
           button.className = 'game-btn';
          });
          axios.post('http://localhost:3000/updateProgress', currentUser)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
           console.error('Error:', error);
          });
       }

       getLevel(currentUser);
    }

   
    getLevel(playerName);

  return (
    <div className='game-options'>
        {options.map((option, index) => (
           <div key={index}>
             <button 
               onClick={(event) => {setInactive(event); triggerResult(playerName, option.result, option.diff)}}
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
             <button onClick={() => nextLevel(playerName, location)} id='next-btn'>Next</button>
    </div>
  );
};

export default Levels;