import React from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/google-play.jpg"
import img2 from "../assets/app-store.jpg"

const Footer = () => {
  return (
    <footer>
      <div className="w-[80%] footer-links">
        <div className="">
          <h2 className="text-[22px]">Bookstore</h2>
          <p className="text-black text=[15px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
            alias.
          </p>
        </div>
        <div className="w-full flex flex-col gap-3 justify-center items-start px-3">
          <h2 className="text-[22px]">Discover</h2>
          <ul className="flex flex-col justify-center items-start gap-3">
            <li>
              <Link to="" className="font-semibold">Home</Link>
            </li>
            <li>
              <Link to="" className="font-semibold">Books</Link>
            </li>
            <li>
              <Link to="" className="font-semibold">Authors</Link>
            </li>
          </ul>
        </div>
        <div className="w-full flex flex-col gap-3 justify-center items-start px-3">
          <h2 className="text-[22px]">My Account</h2>
          <ul className="flex flex-col justify-center items-start gap-3">
            <li>
              <Link to="" className="font-semibold">Sign In</Link>
            </li>
            <li>
              <Link to="" className="font-semibold">View Cart</Link>
            </li>
            <li>
              <Link to="" className="font-semibold">Wishlist</Link>
            </li>
          </ul>
        </div>
        <div className="w-full flex flex-col gap-3 justify-center items-start px-3">
          <h2 className="text-[22px]">Help</h2>
          <ul className="flex flex-col justify-center items-start gap-3">
            <li>
              <Link to="" className="font-semibold">Help center</Link>
            </li>
            <li>
              <Link to="" className="font-semibold">Report a problem</Link>
            </li>
            <li>
              <Link to="" className="font-semibold">Suggestion</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="w-full flex flex-col gap-3 justify-start items-center px-3">
            <img src={img1} alt="" />
          </div>
          <div>
            <img src={img2} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
