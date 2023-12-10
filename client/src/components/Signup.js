import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Question from './Question';
import Result from './Result';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);

  function submit(e) {
    e.preventDefault();

    const newUser = {
      username,
      password,

    };

    axios.post('http://localhost:3000/signup', newUser)
      .then(response => {
        console.log(typeof response.data);
        setMessage(response.data); // receive response
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Signup failed!');
      });

     setTimeout(() => { setFormSubmitted(true); }, 1000);
  }

  return (
    <div>
      {!formSubmitted ? (
        <div>
            <form onSubmit={submit} setFormSubmitted={setFormSubmitted}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
            />
            <button type="submit">Submit</button>
          </form>
          <div>
        <p>{message}</p>
          </div>
        </div>
      ) : (
        
        <Quiz user={username}/>

      )}
    </div>
  );
};

const Quiz = (username) => {
  const currentUser = username;
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
        <Result data={userAnswers} username={currentUser}/>
      )}
    </div>
  );
};


// I want to trigger Quiz when Register is done executing

const Signup = () => {
  return (
    <div>
     <Register />
    </div>
  )
}


export default Signup;