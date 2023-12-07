import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  

  function submit(e) {
    e.preventDefault();
    const newUser = {
      username,
      password
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

  }

  const redirect = () => {
    window.location.href = '/quiz';
 }

  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button onClick={redirect} type="submit">Submit</button>
      </form>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Signup;