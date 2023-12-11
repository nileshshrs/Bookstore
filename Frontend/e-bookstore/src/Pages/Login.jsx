import React, { useState } from "react";
import axios from "axios";
import "../css/login.scss";
import { Link } from "react-router-dom";
import { useSignin } from "../context/useSignin";


const Login = () => {
  const { signin } = useSignin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await signin(email, password);

  };

  return (
    <>
      <section className="h-screen flex justify-center items-center form-section relative">
        <div className="absolute w-full h-full top-0 translucent"></div>
        <form className="flex flex-col gap-4 bg-[#F8F7F2] registration-form z-[99]">
          <div>
            <h2 className="font-bold text-[50px]">Sign in</h2>
            <p>Start your journey with us.</p>
          </div>
          <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>

          <input
            placeholder="username or email"
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

          <button className="form-btn rounded" onClick={handleSubmit}>
            Sign in
          </button>
          <p>
            Don't have an account ?{" "}
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