import {Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  // use <Route path="/" element={<Element/>}/> and create element for routes in components folder and replace element 
  //in route for new routes Default is Home 

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      
    </>
  )
}

export default App
