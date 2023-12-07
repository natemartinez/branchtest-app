import React, { useState, useEffect } from 'react';
import './style.css';
import Question from './Question';
import Result from './Result';

const Quiz = (/* username */) => {

  const quizData = [
    {
      question: 'Logical or Creative',
      options: ['Logical', 'Creative'],
    },
    {
      question: 'Introverted or Extroverted',
      options: ['Introvert', 'Extrovert'],
    },
    {
      question: 'Early Bird or Night Owl',
      options: ['Early Bird', 'Night Owl'],
    },
    {
      question: 'Hot-headed or Cold-blooded',
      options: ['Hot-headed', 'Cold-blooded'],
    }
  ]

  const [currentQuestion, setQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(quizData.length).fill(' '));

  const handleAnswerSelect = (answer) => {
      // Need to set a new copy of array to update
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestion] = answer;
      setUserAnswers(updatedAnswers);
  }

  const goToNextQuestion = () => {
    setQuestion(currentQuestion + 1);
  }; 
  
  return (
    <div>
      {currentQuestion < quizData.length ? (
        <Question
          data={quizData[currentQuestion]}
          answerSelect={handleAnswerSelect}
          nextQuestion={goToNextQuestion}
        />
      ) : (
        <Result data={userAnswers/*, username */ }  />
      )}
    </div>
  );
};

export default Quiz;