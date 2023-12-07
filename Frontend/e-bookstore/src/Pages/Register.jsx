import React, { useRef, useState, useEffect } from "react";
// import "../css/register.css";
import { FaCheck, FaInfoCircle, FaTimes } from "react-icons/fa";
// import signinImage from "../assets/signin1.png"; // Import the image
import "../css/login.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/;
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,30}))$/;

const Register = () => {
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
  const [success, setSuccess] = useState(false);

  //useeffects

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidname(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(email);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, email, matchPwd]);

  return (
    <>
      <section className="h-screen flex justify-center items-center form-section relative">
        <div className="absolute w-full h-full top-0 translucent"></div>
        <form className="flex flex-col gap-4 bg-[#F8F7F2] registration-form py-14 z-[99]">
          <div>
            <h2 className="font-bold text-[50px]">Sign up</h2>
            <p>Start your journey with us.</p>
          </div>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          {/*username*/}

          <input
            placeholder="username"
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => {
              setUser(e.target.value.toLowerCase());
            }}
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
          {/*email*/}

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
          {/*password*/}

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
                ? "instructions m-0 text-white rounded"
                : "offscreen m-0 text-white rounded"
            }
          >
            8-24 characters. Must include one uppercase and lowercase letters, a
            number and a special character.
          </p>
          {/** confirm-password**/}

          <input
            type="password"
            required
            id="password"
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
          <button className="form-btn rounded">Sign up</button>
        </form>
      </section>
    </>
  );
};

export default Register;

{
  /* <div className="row border rounded-5 p-3 bg-white shadow box-area"> */
}

{
  /* <!--Left Box --> */
}

{
  /* <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
  <div className="featured-image mb-3">
    <img src={signinImage} className="img-fluid" alt="Signin" style={{ width: '1000px' }} />
  </div>
</div> */
}

{
  /* <!--Right Box --> */
}

{
  /* <div className="col-md-6 right-box">
  <div className="row align-items-center">
    <div className="header-text mb-4">
    <h2 style={{ fontWeight: 'bold',fontSize:'30px',paddingBottom:'5px'}}>Sign Up</h2>
      <p>Start your journey with us.</p>
    </div>
    <div className="input-group mb-3 box">
      <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Username" />
    </div>
    <div className="input-group mb-3">
      <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" />
    </div>
    <div className="input-group mb-3">
      <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" />
    </div>
    <div className="input-group mb-3">
      <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Confirm Password" />
    </div>
    <div className="input-group mb-3">
      <button className="btn btn-lg  w-100 fs-6"  style={{ fontWeight: 'bold',backgroundColor:'green',color:'white'}}>Sign Up </button>
    </div>

    <div className="row">
      <small>Already have an account? <a href="./login" style={{ color:'green' ,textDecoration: 'underline'}}>Log In</a></small>
    </div>
  </div>
</div>

</div> */
}
