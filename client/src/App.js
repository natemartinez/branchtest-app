import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';



function App() {
  return (
    <Signup />
    /*
    <BrowserRouter>
      <Router>
        <Route path='./register' element={<Signup/>}></Route>
      </Router>
    </BrowserRouter>
    */
  );
}

export default App;
