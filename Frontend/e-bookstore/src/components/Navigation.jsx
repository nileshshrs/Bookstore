import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <header>
      <div className="px-11 py-3 flex justify-evenly items-center w-full">
        <div>
          <Link to="/">
            <h2 className="text-[22px]">Bookstore</h2>
          </Link>
        </div>
        <nav className="w-full px-3 flex">
          <ul className="flex w-full items-center justify-evenly">
            <li>
              <Link to="">Home</Link>
            </li>
            <li>
              <Link to="">Books</Link>
            </li>
            <li>
              <Link to="">Blog</Link>
            </li>
            <li>
              <form className="search-form flex">
                <input type="text" />
                <button>search</button>
              </form>
            </li>
          </ul>
          <div className="flex justify-between items-center gap-3">
            <div>
              <button>Sign up/Login</button>
            </div>
            <div>
              <button>Account</button>
            </div>
            <div>
              <button>Cart</button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
