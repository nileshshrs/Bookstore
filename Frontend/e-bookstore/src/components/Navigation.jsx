import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navigation.scss";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useAuthContext } from "../context/useAuthContext";
import { useLogout } from "../context/useLogout";

const Navigation = () => {
  //  const { logout } = useLogout();

  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigateSearch = useNavigate();

  const [searchKey, setSearchKey] = useState("");

  const handleLogout = () => {
    // Dispatch the "LOGOUT" action to update the user state
    logout();
  };

  const searchBook = (e) => {
    e.preventDefault();
    navigateSearch("/search/" + searchKey);
    setSearchKey("");
  };

  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderFixed(scrollPosition > 60);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`bg-[#EDEBE4] ${isHeaderFixed ? "fixed-header" : ""}`}>
      <div className="px-2 py-3 flex justify-evenly items-center w-full gap-3 nav-bar sm:gap-0">
        <div className="px-2">
          <Link to="/">
            <h2 className="text-[22px]">Bookstore</h2>
          </Link>
        </div>
        <nav className="w-full px-5 flex">
          <ul className="flex w-full items-center justify-evenly">
            <li className="">
              {user && user.roles === "admin" ? (
                <Link to="/dashboard" className="w-full font-bold">
                  Dashboard
                </Link>
              ) : (
                <Link to="/" className="w-full font-bold">
                  Home
                </Link>
              )}
            </li>
            <li className="">
              <Link to="/books" className="w-full font-bold">
                Books
              </Link>
            </li>
            <li className="">
              <Link to="/blog" className="w-full font-bold">
                Blog
              </Link>
            </li>
            <li className="">
              <Link to="/contact" className="w-full font-bold">
                Contact
              </Link>
            </li>
            <li className="">
              <form
                className="search-form flex"
                onSubmit={(e) => searchBook(e)}
              >
                <input
                  type="text"
                  placeholder="search..."
                  onChange={(e) => setSearchKey(e.target.value)} //set search
                  value={searchKey}
                />
                <button type="submit">
                  <FaSearch />
                </button>
              </form>
            </li>
          </ul>
          <div className="flex justify-between items-center gap-3 btn-div">
            <div className="flex gap-2">
              {user ? (
                <button className="login-btn" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <button className="login-btn">Signin</button>
                  </Link>

                  <Link to="/register">
                    <button
                      style={{ color: "white", backgroundColor: "black" }}
                      className="login-btn"
                    >
                      Signup
                    </button>
                  </Link>
                </>
              )}
            </div>

            <div>
              {user ? (
                <Link to="/user-profile">
                  <button className="account-btn">{user.username}</button>
                </Link>
              ) : null}
            </div>
            <div>
              {user ? (
                <Link to="/cart">
                  <button className="flex items-center justify-center font-bold gap-1">
                    Cart <FaShoppingBag />
                  </button>
                </Link>
              ) : null}
            </div>
          </div>
        </nav>

        <div
          className={
            nav
              ? "sidebar-nav slide flex flex-col gap-5 relative"
              : "sidebar-nav flex flex-col gap-5 relative"
          }
        >
          <button
            className="absolute top-10 right-5 text-[20px]"
            onClick={handleNav}
          >
            <AiOutlineClose />
          </button>
          <div className="w-full my-5 text-[22px] px-3">
            <Link>
              <h2>Bookstore</h2>
            </Link>
          </div>
          <nav className="h-full flex justify-center items-center">
            <ul className="h-full">
              <li>
                {user && user.roles === "admin" ? (
                  <Link to="/dashboard" className="w-full font-bold">
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/" className="w-full font-bold">
                    Home
                  </Link>
                )}
              </li>
              <li>
                <Link className="w-full font-bold" to="/books">
                  Books
                </Link>
              </li>
              <li>
                <Link className="w-full font-bold" to="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="w-full font-bold" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-start w-full font-bold gap-2"
                  to="/cart"
                >
                  <span> Cart </span>
                  <FaShoppingBag />
                </Link>
              </li>
            </ul>
          </nav>
          <div className=" flex flex-col items-center jusify-center gap-2 my-10 w-full px-3">
            {user ? (
              <>
                <button className="account-btn">
                  <Link to="/user-profile" className="w-full">
                    Account
                  </Link>
                </button>
                <button className="login-btn" onClick={handleLogout}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button className="account-btn">
                  <Link to="/login" className="w-full">
                    Sign In
                  </Link>
                </button>
                <button className="login-btn">
                  <Link to="/register" className="w-full">
                    Sign Up
                  </Link>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="hamburger-menu">
          <button className="hamburger-btn" onClick={handleNav}>
            <AiOutlineMenu />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
