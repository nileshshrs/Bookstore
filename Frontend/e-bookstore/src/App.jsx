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
import DashboardHome from "./components/DashboardHome";
import DashboardProducts from "./components/DashboardProducts";

function App() {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  // Determine whether to show the Navigation component based on the current route
  const showNavigation = !location.pathname.startsWith("/dashboard");

  return (
    <>
      {showNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* uncomment this part and work from here */}
        {/*child routes should be inside the parent route*/}
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<DashboardProducts />} />
          
          {/* <Route path="profile" element={<DashboardProfile />} /> */}
        </Route>
        {/* uncomment this part and work from here */}
      </Routes>
      {showNavigation && <Footer />}
    </>
  );
}

export default App;