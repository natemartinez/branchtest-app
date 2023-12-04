import React, { useState } from 'react';
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
    console.log(newUser);

    axios.post('http://localhost:3000/signup', newUser)
      .then(response => {
        console.log('Response:', response.data);
        setMessage('Signup successful!');
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('Signup failed!');
      });
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
        <button type="submit">Submit</button>
      </form>
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Signup;