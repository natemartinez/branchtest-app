import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
// This component will output personality results

const Result = ({data}) => {
  //Destructuring data is like using dot notation with an object
  // 'data' is an object, using {} turns 'data' into an array so then
  // .map() can be used on 'data'
  const finalResults = data;
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get('http://localhost:3000/result');
        setUsername(response.data);
      } catch (error) {
         console.error(error);
      };

      fetchName();
      
      console.log(username);
    }});
  //Iterate through finalResults
  // Must match with username and uses axios

  return (
    <div>
      <ul>{finalResults.map((answer, index) => (<li key={index}>{answer}</li>))}</ul>
    </div>
    // And continue button after buttons has been displayed
  );
};

export default Result;