import React, { useState } from "react";
import "../css/dashboard.css";
import Sidebar from "../components/DashboardSidebar";
import Header from "../components/DashboardHeader";
import Homedash from "../components/Homedash";
import Blog1 from "../components/Blog";


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
      <Blog1/>
    </div>
    </>
  );
};

export default Blog;