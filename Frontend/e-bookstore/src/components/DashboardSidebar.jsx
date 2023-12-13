import React from "react";
import { Link } from "react-router-dom";
import "../css/dashboard.scss";

const DashboardSidebar = () => {
  return (
    <div className="sidebar-nav flex flex-col h-screen border-r-2 justify-between gap-3 items-start">
      <div className="px-5 py-4">
        <Link to="/" className="text-xl font-bold">
          {/* Use semantic HTML for the application name */}
          <h2>Bookstore</h2>
        </Link>
      </div>
      <div className="w-full px-3 flex items-center justify-between border rounded-md py-2">
        {/* Provide Alt text for accessibility */}
        <img
          src=""
          alt="User Avatar"
          className="rounded-full h-12 w-12 border"
        />
        <div className="text-center">Account</div>
      </div>
      <nav className="mt-5 w-full">
        <ul className="flex flex-col gap-4 justify-center items-start w-full">
          <li className="flex justify-center items-center w-full">
            <Link
              to="/dashboard"
              className="w-full py-3 px-3 rounded-md hover:bg-black hover:text-white transition ease-in"
            >
              Dashboard
            </Link>
          </li>
          <li className="flex justify-center items-center w-full">
            <Link
              to="/home"
              className="w-full py-3 px-3 rounded-md hover:bg-black hover:text-white transition ease-in"
            >
              Home
            </Link>
          </li>
          <li className="flex justify-center items-center w-full">
            <Link
              to="/dashboard/products"
              className="w-full py-3 px-3 rounded-md hover:bg-black hover:text-white transition ease-in"
            >
              Products
            </Link>
          </li>
          <li className="flex justify-center items-center w-full">
            <Link
              to="/users"
              className="w-full py-3 px-3 rounded-md hover:bg-black hover:text-white transition ease-in"
            >
              Users
            </Link>
          </li>
          <li className="flex justify-center items-center w-full">
            <Link
              to="/blog"
              className="w-full py-3 px-3 rounded-md hover:bg-black hover:text-white transition ease-in"
            >
              Blog
            </Link>
          </li>
          <li className="flex justify-center items-center w-full">
            <Link
              to="/account"
              className="w-full py-3 px-3 rounded-md hover:bg-black hover:text-white transition ease-in"
            >
              Account
            </Link>
          </li>
        </ul>
      </nav>
      <div className="h-full w-full flex items-center justify-center">
        <button className="w-full px-5 py-2 bg-red-500 text-white rounded-md">
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
