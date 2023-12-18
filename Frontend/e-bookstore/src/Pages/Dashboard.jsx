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
    <div className="dashboard-container">
      <div className={toggle ? "sidebar slide" : "sidebar"}>
        <DashboardSidebar />

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
