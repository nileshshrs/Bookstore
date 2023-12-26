import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'; // Adjust the path accordingly

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const { user, dispatch } = useContext(AuthContext);

  const handleRecoverNow = async () => {
    if (user) {
      try {
        const response = await fetch("http://localhost:8080/api/v2/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage("Password recovered successfully!");
          setError("");
        } else {
          setError("Email not found. Please check your email address.");
          setSuccessMessage("");
        }
      } catch (error) {
        console.error("Error recovering password:", error);
        setError("An error occurred while processing your request.");
        setSuccessMessage("");
      }
    } else {
      setError("You need to be logged in to recover your password.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <section className="h-screen flex justify-center items-center form-section relative">
        <div className="absolute w-full h-full top-0 translucent"></div>
        <form className="flex flex-col gap-4 bg-[#F8F7F2] registration-form z-[99]">
          <div>
            <h2 className="font-bold text-[30px]">Forgot Password?</h2>
            <p className="text-[15px]">
              Don't worry, Easily recover using your registered gmail.
            </p>
          </div>

          <input
            placeholder="Email"
            type="text"
            id="username"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded"
          />

          <input
            type="password"
            required
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="rounded"
          />

          <input
            type="password"
            required
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded"
          />

          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <button className="form-btn rounded" onClick={handleRecoverNow}>
            Recover Now
          </button>
        </form>
      </section>
    </>
  );
};

export default ForgotPass;
