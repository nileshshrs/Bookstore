import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../css/login.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  //for username input
  const [user, setUser] = useState("");
  const [validName, setValidname] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  //for password input
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //for confirm-password
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidname(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, email, matchPwd]);

  const url = "http://localhost:8080/api/v2/users/register";

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      console.log(validName, validEmail, validPwd, validMatch);
      if (!validName || !validPwd || !validMatch || !validEmail) {
        throw new Error("Invalid inputs given");
      }
      const response = await axios.post(url, {
        username: user,
        email: email,
        password: pwd,
      });
  
      console.log(response);
      if (response.status === 201) {
        toast.success("Sign Up Successful. Please login!", {
          position: "top-right",
        });
  
        setTimeout(() => {
          console.log("Sign Up Successful. Redirecting to /login...");
          navigate("/login");
        }, 2500);
      }
      // Reset state values
      setUser("");
      setPwd("");
      setMatchPwd("");
      setEmail("");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      setErrMsg(errorMessage);
      if (!errorMessage) {
        console.log(error.message);
        setErrMsg(error.message);
      }
    }
  };
  return (
    <>
      <section className="h-screen flex justify-center items-center form-section relative m-0">
        <div className="absolute w-full h-full top-0 translucent"></div>
        <form className="flex flex-col gap-3 bg-[#F8F7F2] registration-form  z-[99]">
          <div>
            <h2 className="font-bold text-[50px]">Sign up</h2>
            <p className="mb-0">Start your journey with us.</p>
          </div>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          <input
            placeholder="username"
            type="text"
            required
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value.toLowerCase())}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className="rounded"
          />
          <p
            className={
              userFocus && user && !validName
                ? "instructions m-0 text-white rounded"
                : "offscreen m-0 text-white rounded"
            }
          >
            4 to 24 characters. Must begin with a letter. Letters, numbers,
            underscores, hyphens allowed.
          </p>
          <input
            type="email"
            id="email"
            placeholder="e-mail"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className="rounded"
          />
          <p
            className={
              emailFocus && email && !validEmail
                ? "instructions m-0 text-white rounded"
                : "offscreen m-0 text-white rounded"
            }
          >
            Email address is invalid.
          </p>
          <input
            type="password"
            required
            placeholder="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPwd(e.target.value)}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="rounded"
          />
          <p
            className={
              pwdFocus && pwd && !validPwd
              // true
                ? "instructions m-0 text-white rounded"
                : "offscreen m-0 text-white rounded"
            }
          >
            8-24 characters. Must include one uppercase and lowercase letters, a
            number.
          </p>
          <input
            type="password"
            required
            id="confirm-password"
            autoComplete="off"
            onChange={(e) => setMatchPwd(e.target.value)}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            placeholder="confirm-password"
            className="rounded"
          />
          <p
            className={
              matchFocus && matchPwd && !validMatch
                ? "instructions m-0 text-white rounded"
                : "offscreen m-0 text-white rounded"
            }
          >
            Password does not match
          </p>
          <button className="form-btn rounded" onClick={registerUser}>
            Sign up
          </button>
          <p className="my-0">
            Already have an account ?{" "}
            <Link to="/login" className="font-bold text-black underline">
              Sign in.
            </Link>
          </p>
        </form>
        <ToastContainer />
      </section>
    </>
  );
};

export default Register;