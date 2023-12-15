import React, { useState } from "react";
import "../css/dashboard.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Homedash from "../components/Homedash";
import { Outlet } from "react-router-dom";


const Dashboard = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
 
  return (
    <>
     <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Homedash/>
    </div>
    </>
  );
};

export default Dashboard;