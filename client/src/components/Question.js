import React, { useState } from 'react';

const Question = ({data, answerSelect, nextQuestion}) => {
  
  const {question, options} = data;
    // receives userData from quiz.js
  const [chosenOption, setChosenOption] = useState(null);
    // tracks the chosen option
  const [answerSelected, setAnswerSelected] = useState(false);
    // tracks when answer is selected

  const optionSelected = (optionName) => {
    setChosenOption(optionName);
    setAnswerSelected(true);
    answerSelect(optionName)
    // Passes the chosen option to the Quiz component
  }

  const moveNextQuestion = () => {
    setAnswerSelected(false);
    setChosenOption(null);
    // sets both states back to default
    nextQuestion();
    // activates parameter to move to next question
  }

 

  return (
    <div className='quiz-div'>
      <h3>{question}</h3>
      <ul className='option-list'>
        {options.map((option, index) => (
          <li key={index}>
            <button className='option-btn' onClick={() => optionSelected(option)}>
              {option}
            </button>
          </li>
        ))}
      </ul>
      {answerSelected && (
        <button onClick={moveNextQuestion}>Next</button>
      )}
    </div>
  );
};

export default Question;