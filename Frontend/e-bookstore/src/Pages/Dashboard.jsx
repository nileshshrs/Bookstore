import React, { useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardContent from "../components/DashboardContent";
import { Outlet } from "react-router-dom";
import "../css/dashboard.scss";

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

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
