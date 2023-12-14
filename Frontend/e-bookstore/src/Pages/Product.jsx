import React, { useState } from "react";
import "../css/dashboard.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Homedash from "../components/Homedash";
import Product1 from "../components/Product";


const Blog = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
 
  return (
    <>
     <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Product1/>
    </div>
    </>
  );
};

export default Blog;