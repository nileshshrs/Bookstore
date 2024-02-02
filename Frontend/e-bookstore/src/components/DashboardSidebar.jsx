import React from "react";
import { Link } from "react-router-dom";
import { BsGrid1X2, BsArchive, BsPerson } from "react-icons/bs";
import { BiLogOut, BiBook, BiHome } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useAuthContext } from "../context/useAuthContext";
import Img1 from "../assets/icon.png";
import { useLogout } from "../context/useLogout";

const DashboardSidebar = ({ toggle }) => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    // Dispatch the "LOGOUT" action to update the user state
    logout();
  };
  return (
    <div className="sidebar-nav relative md:hidden">
      <button className="  close-btn" onClick={toggle}>
        <AiOutlineClose />
      </button>
      <header className="w-full">
        <Link to="/">
          <h2 className="px-3">Zenstore</h2>
        </Link>
      </header>
      <div className="w-full">
        <Link
          to="/user-profile"
          className="flex bg-[#dadada] items-center justify-center w-full py-2 pl-3 rounded-lg gap-3 hover:bg-black hover:text-white transition ease-linear font-bold"
        >
          <span className="">
            <img
              src={Img1}
              alt=""
              className="border rounded-full border-red object-cover"
              width={"40px"}
              height={"40px"}
            />
          </span>
          <span className="w-full">{user?user.username:null}</span>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
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
            <Link to="/dashboard/users">
              <BsPerson />
              Users
            </Link>
          </li>
          <li>
            <Link to="/dashboard/orders">
              <BsArchive />
              Order
            </Link>
          </li>
        </ul>
      </nav>
      <div className="logout-container">
        <button className="flex items-center justify-center gap-1" onClick={handleLogout}>
          <BiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
