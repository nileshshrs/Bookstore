import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Register from "./Pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Login from "./Pages/Login";
import Footer from "./components/Footer";
import Dashboard from "./Pages/Dashboard";
import DashboardContent from "./components/DashboardContent";
import DashboardProducts from "./components/DashboardProducts";
import Bookstype from "./Pages/bookstype";
import SingleProduct from "./Pages/SingleProduct";
import Singleaddtocart from "./Pages/Singlepagecart";
import ForgotPass from "./Pages/ForgotPass";
import Blog from "./Pages/Blog";
import Userprofile from "./Pages/Userprofile";
import SingleBlog from "./Pages/SingleBlog";
import Order from "./Pages/Order";
import Orderdetail from "./components/Orderdetail";
import Userdetail from "./components/Userdetail";
import Search from "./Pages/Search";
import ContactPage from "./Pages/ContactPage"
import Success from "./Pages/Success";
import { useAuthContext } from "./context/useAuthContext";
//deleted unnecessary code


function App() {
  const location = useLocation();
  const { user } = useAuthContext();
  const roles = user.roles;

  // Determine whether to show the Navigation component based on the current route
  const showNavigation = !location.pathname.startsWith("/dashboard");

  return (
    <>
      {showNavigation && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/user-profile" element={<Userprofile />} />
        <Route path="/singleproduct" element={<SingleProduct/>} />
        <Route path="/cart" element={<Singleaddtocart/>} />  
        <Route path="/order" element={<Order/>} /> 
        <Route path="/contact" element={<ContactPage/>}/>
        <Route path="/s" element={<Success/>}/>
 
        
        <Route path="/singleproduct" element={<SingleProduct />} />
        <Route path="/singleproduct" element={<SingleProduct />} />
        <Route path="/cart" element={!user ? <Singleaddtocart />:<Navigate to="/login" />} />{" "}
        {/*Just added if addtocart not accepted */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/books" element={<Bookstype />} />
        <Route path="/books/:id" element={<SingleProduct />} />
        <Route
          path="/dashboard/*"
          element={user && roles === "admin" ? <Dashboard /> : <Navigate to="/" />}
        >
          <Route index element={<DashboardContent />} />
          <Route path="books" element={<DashboardProducts />} />
          <Route path="orders" element={<Orderdetail />} />
          <Route path="users" element={<Userdetail />} />
         

        </Route>
        <Route path="/search/:searchKey" element={<Search />}/>
      </Routes>
      {showNavigation && <Footer />}
    </>
  );
}

export default App;
