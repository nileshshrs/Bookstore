import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage(
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number."
      );
      return;
    }

    try {
      const response = await axios.put("http://localhost:8080/api/v2/users/forgot-password", {
        email: emailOrUsername, // Send the value as either email or username
        username: emailOrUsername, // Send the value as either email or username
        newPassword,
      });

      toast.success(response.data);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section className="h-screen flex justify-center items-center form-section relative">
        <div className="absolute w-full h-full top-0 translucent"></div>
        <form
          className="flex flex-col gap-4 bg-[#F8F7F2] registration-form z-[99]"
          onSubmit={handlePasswordChange}
        >
          <div>
            <h2 className="font-bold text-[30px]">Forgot Password?</h2>
            <p className="text-[15px]">
              Don't worry, Easily recover using your registered email or username.
            </p>
          </div>
          <input
            placeholder="Email or Username"
            required
            type="text"
            className="rounded"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="New Password"
            className="rounded"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Confirm Password"
            className="rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
            {message && <p className="text-red-500" style={{color:'red'}}>{message}</p>}
          <button type="submit" className="form-btn rounded">
            Change Now
          </button>
        
        </form>
        <ToastContainer />
      </section>
    </>
  );
};

export default ForgotPass;
