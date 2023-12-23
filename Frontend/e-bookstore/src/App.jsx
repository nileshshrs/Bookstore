import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Register from "./Pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Login from "./Pages/Login";
import Footer from "./components/Footer";
import { useEffect } from "react";
import Dashboard from "./Pages/Dashboard";
import DashboardContent from "./components/DashboardContent";
import DashboardProducts from "./components/DashboardProducts";
import Bookstype from "./Pages/bookstype";
import SingleProduct from "./Pages/SingleProduct";
import Singleaddtocart from "./Pages/Singlepagecart";

function App() {
  const location = useLocation();


  // Determine whether to show the Navigation component based on the current route
  const showNavigation = !location.pathname.startsWith("/dashboard");

  return (
    <>
      {showNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singleproduct" element={<SingleProduct/>} />
        <Route path="/cart" element={<Singleaddtocart/>} />   {/*Just added if addtocart not accepted */}
        
        <Route path="/books" element={<Bookstype />} />
        <Route path="/books/:id" element={<SingleProduct />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<DashboardContent />} />
          <Route path="books" element={<DashboardProducts />} />
        </Route>
      </Routes>
      {showNavigation && <Footer />}
    </>
  );
}

export default App;
