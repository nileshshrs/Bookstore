import React, { useState } from "react";
import "../css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //use this for setting error when creating login api do a setErrMsg(errMsg) inside the api calling function
  const [errMsg, setErrMsg] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    console.log(email, password);
    setEmail("");
    setPassword("");
  }
  return (
    <>
      <section className="h-screen flex justify-center items-center form-section relative">
        <div className="absolute w-full h-full top-0 translucent"></div>
        <form className="flex flex-col gap-4 bg-[#F8F7F2] registration-form py-14 z-[99]">
          <div>
            <h2 className="font-bold text-[50px]">Sign in</h2>
            <p>Start your journey with us.</p>
          </div>
          <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
          {/*username*/}

          <input
            placeholder="username or email"
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value.toLowerCase());
            }}
            className="rounded"
          />

          <input
            type="password"
            required
            placeholder="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            className="rounded"
          />

          <button className="form-btn rounded" onClick={handleSubmit}>
            Sign up
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
