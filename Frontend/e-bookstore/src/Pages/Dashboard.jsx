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
    <div className="dashboard-container">
      <div className={toggle ? "sidebar slide" : "sidebar"}>
        <DashboardSidebar />
        <button onClick={handleToggle} className="close-btn">
          close
        </button>
      </div>
      <main className="dashboard-item-container">
        <DashboardHeader toggle={handleToggle} />
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;