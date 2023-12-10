import { Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Main from './components/Main';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />}></Route> 
        <Route path="/main" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
