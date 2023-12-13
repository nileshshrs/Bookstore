import React from "react";
import { Link, Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="flex gap-5">
      <DashboardSidebar />
      <main className="flex-grow-[4] ">
        <div className="flex justify-between items-center mb-3 py-3">
          <div className="flex justify-between items-center gap-5">
            <Link
              to=""
              className="text-xl font-bold flex justify-center items-center"
            >
              <h2 className="">Bookstore</h2>
            </Link>
            <button className="text-xl">
              <AiOutlineMenu />
            </button>
          </div>
          <div>
            <div>
              <div className="w-full px-3 flex items-center justify-center gap-3">
                {/* Provide Alt text for accessibility */}
                <img
                  src=""
                  alt="User Avatar"
                  className="rounded-full h-12 w-12 border"
                />
                <div className="text-center">Account</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
