import React, { useState } from "react";
import axios from "axios";
import "../css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrMsg("Both email and password are required.");
      return;
    }

    try {
      // Make a POST request to your login endpoint
      const response = await axios.post("localhost:8080/api/v2/users/login", {
        email,
        password,
      });

      // Handle the success response from the server
      console.log(response.data);
      alert('Login successful!');

      // Clear the form fields
      setEmail("");
      setPassword("");
    } catch (error) {
      // Handle the error response from the server
      console.error("Error logging in:", error.message);
      setErrMsg("Error logging in. Please check your credentials and try again.");
    }
  };

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
        </form>
      </section>
    </>
  );
};

export default Login;
