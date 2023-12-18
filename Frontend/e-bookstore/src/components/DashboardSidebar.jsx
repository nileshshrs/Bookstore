import React from "react";
import { Link } from "react-router-dom";
import { BsGrid1X2, BsArchive, BsPerson } from "react-icons/bs";
import { BiLogOut, BiBook, BiHome } from "react-icons/bi";

const DashboardSidebar = () => {
  return (
    <div className="sidebar-nav">
      <header>
        <Link to="/">
          <h2>Bookstore</h2>
        </Link>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="">
              <BsGrid1X2 />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/">
              <BiHome />
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/books">
              <BiBook /> Books
            </Link>
          </li>
          <li>
            <Link to="">
              <BsPerson />
              Users
            </Link>
          </li>
          <li>
            <Link to="">
              <BsArchive />
              Blog
            </Link>
          </li>
        </ul>
      </nav>
      <div className="logout-container">
        <button className="flex items-center justify-center gap-1">
          <BiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
