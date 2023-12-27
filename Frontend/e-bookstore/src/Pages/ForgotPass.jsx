import React  from "react";
import { Link } from "react-router-dom";

const ForgotPass = () => {
  

  return (
    <>
   <section className="h-screen flex justify-center items-center form-section relative">
        <div className="absolute w-full h-full top-0 translucent"></div>
        <form className="flex flex-col gap-4 bg-[#F8F7F2] registration-form z-[99]">
          <div>
            <h2 className="font-bold text-[30px]">Forgot Password?</h2>
            <p className="text-[15px]">Don't worry, Easily recover using your registered gmail.</p>
          </div>
          

          <input
            placeholder="Email"
            type="text"
            id="username"
            autoComplete="off"
            
            className="rounded"
          />

          <input
            type="password"
            required
            placeholder="New Password"
            id="password"
            autoComplete="off"
          
            
            className="rounded"
          />
 
          <input
            type="password"
            required
            placeholder="Confirm password"
            id="Password"
            autoComplete="off"
          
            
            className="rounded"
          />

        

          <button className="form-btn rounded">
            Recover Now
          </button>
          {/* <p>
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-black underline">
              Sign up
            </Link>
          </p> */}
        </form>
      </section>
    </>
  );
};

export default ForgotPass;