import React, { useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardContent from "../components/DashboardContent";
import { Outlet } from "react-router-dom";
import "../css/dashboard.scss";
import { AiOutlineClose } from "react-icons/ai";

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="dashboard-container">
      <div className={toggle ? "sidebar slide" : "sidebar"}>
        <DashboardSidebar />
        <button onClick={handleToggle} className="close-btn px-4 h-full">
          <AiOutlineClose />
        </button>
      </div>
      <main className="dashboard-item-container">
        <div className="shadow-lg">
          <DashboardHeader toggle={handleToggle} />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
