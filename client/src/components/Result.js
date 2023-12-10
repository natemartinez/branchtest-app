import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import Main from './Main';
import { useNavigate } from 'react-router-dom';

// This component will output personality results

const Result = (props) => {

  const navigate = useNavigate();

  const { data, username } = props;
  const finalResults = [username, data];
  
  const sendtoServer = (results) => {
    axios.post('http://localhost:3000/sendUser', results)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
  }
  const addImage = () => {
    // receive what trait it is
    // use the trait inside URL using switch statements
    console.log('test')
  }
  sendtoServer(finalResults);

  const moveToMain = (results) => {
    let username = results[0];
    let data = results[1];
    navigate('/main', {state:{data, username}});
  };

  return (
    <div>
      <ul>{data.map((answer, index) =>
      //add image with every iteration
       (<li key={index}>
        {addImage()}
        {answer}
        </li>))}
       </ul>
       <ul>
        
       </ul>
       <button onClick={moveToMain(finalResults)}></button>
    </div>
  );
};

export default Result;