import { Routes, Route } from "react-router-dom";
import Forms from './components/Forms';
import Main from './components/Main';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Forms />}></Route> 
        <Route path="/main" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
