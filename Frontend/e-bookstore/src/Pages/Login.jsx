import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignin } from "../context/useSignin";
import "../css/login.scss";

const Login = () => {
  const { signin, error } = useSignin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    // // Email format validation
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!email || !emailRegex.test(email)) {
    //   setErrMsg("Please enter a valid email address.");
    //   return;
    // }

    // // Password length validation
    // if (!password || password.length < 6) {
    //   setErrMsg("Password must be at least 6 characters long.");
    //   return;
    // }

    // If validation passes, attempt to sign in
    try {
      await signin(email, password);
    } catch (err) {
      console.error("Error during signin:", err);
      // setErrMsg("An error occurred during signin");
    }
  };

  return (
    <>
      <section className="h-screen flex justify-center items-center form-section relative m-0">
        <div className="absolute w-full h-full top-0 translucent"></div>
        <form className="flex flex-col gap-4 bg-[#F8F7F2] registration-form z-[99]">
          <div>
            <h2 className="font-bold text-[50px]">Sign in</h2>
            <p>Start your journey with us.</p>
          </div>
          <p className={error ? "my-0 errmsg" : "offscreen"}>{error}</p>

          <input
            placeholder="username or email"
            required
            type="text"
            id="username"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className="rounded"
          />

          <input
            type="password"
            required
            placeholder="password"
            id="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded"
          />

         <Link to="/forgotpass"> <button style={{color:'#7f7f7f'}}>Forgot password?</button></Link>

          <button className="form-btn rounded" onClick={handleSubmit}>
            Sign in
          </button>
          <p className="my-0">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-black underline">
              Sign up
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
