import { Routes, Route } from "react-router-dom";

import Signup from './components/Signup';
import Quiz from './components/Quiz';


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />}></Route> 
        <Route path="/quiz" element={<Quiz />}></Route> 
      </Routes>
    </div>
  );
}

export default App;
