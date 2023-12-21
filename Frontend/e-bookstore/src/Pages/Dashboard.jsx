import React, { useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import { Outlet } from "react-router-dom";
import "../css/dashboard.scss";
import { AiOutlineClose } from "react-icons/ai";

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="dashboard-container p-0">
      <div className={toggle ? "sidebar slide" : "sidebar"}>
        <DashboardSidebar toggle={handleToggle}/>

      </div>
      <main className="dashboard-item-container p-0">
        <div className="shadow-lg">
          <DashboardHeader toggle={handleToggle} />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
