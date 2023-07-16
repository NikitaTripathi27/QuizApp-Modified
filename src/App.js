
import './App.css';
import Home from './Components/Home';
import Quiz from "./Components/Quiz";
import Result from './Components/Result';
import { BrowserRouter ,Route , Routes } from 'react-router-dom';
import Register from "./Components/Register"
import Login from "./Components/Login"
function App() {
  return (
    // <div className="App">
    //  <h2>Main</h2>
    // </div>
    <>
    {/* <div className='App'>App</div> */}
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Register />} />
    <Route path='/home' element={<Home/>}/>
    <Route path='/login' element={<Login />} />
    <Route path='/quiz' element={<Quiz/>} />
    < Route path='/result' element={<Result/>} />
    </Routes>
    </BrowserRouter>
    
   
    </>
  );
}

export default App;
