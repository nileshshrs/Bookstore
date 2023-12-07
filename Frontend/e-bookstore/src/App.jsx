import {Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import Register from "./Pages/Register"
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Login from "./Pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  // use <Route path="/" element={<Element/>}/> and create element for routes in components folder and replace element
  //in route for new routes Default is Home

  return (
    <>
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

      </Routes>

    </>
  );
}

export default App;
