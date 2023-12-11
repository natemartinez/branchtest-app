import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import './style.css';
import Levels from './logic/Levels';

 const HUD = () => {
  // Displays HUD & UI

 };    
 const Menu = () => {
 // Controls menu appearing and disappearing
   const [isVisible, setIsVisible] = useState(false);
   
   const menuAppear = () => {
     setIsVisible(true);
   };
   const menuHide = () => {
     setIsVisible(false);
   };
   
   return (
   <div>
     <div className='open-menu-div'>
        <button onClick={menuAppear} className='open-menu-btn'>Open Menu</button>
     </div>
     {isVisible && ( 
        <div className='main-menu'>
          <div className='menu-div'>
            <a href="pages/character.php">Character</a>
          </div>
          <div className='menu-div'>
            <a href="pages/inventory.php">Inventory</a>
          </div>
          <div className='menu-div'>
            <a href="pages/skills.php">Skills</a>
          </div>                
          <div className='menu-div'>
            <a href="pages/goals.php">Goals</a>
          </div>                           
          <div className='menu-div'>
           <button onClick={menuHide} className='close-menu-btn'>Close Menu</button>
          </div>                           
        </div>
     )}
   </div>
   );
 };
 const Game = (username) => {
 // Controls current game logic
  async function getLevel(){
  // use axios.get, if it doesnt work, then
  }

 // calls function to know what level to display


 return (
    <div>
      <Levels currentLevel={1.1}/> 
    </div>
  );
 };


 const Main = () => {
    const location = useLocation();
    const currentUser = location.state.username.user;
    const currentStats = location.state.data;
 
  return (
    <div>
      <p>Username:{currentUser}</p>
      <Game username={currentUser}/>
      <Menu/>
    </div>
  );
}

export default Main;