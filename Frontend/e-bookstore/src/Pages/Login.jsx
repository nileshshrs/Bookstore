// Login.js
import React from 'react';
import "../css/register.css"; // Import the login stylesheet
import signinImage from "../assets/signin1.png"; // Import the image
import Register from './Register';

function Login() {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
          <div className="featured-image mb-3">
              <img src={signinImage} className="img-fluid" alt="Signin" style={{ width: '1000px' }} />
            </div>
          </div>
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2 style={{ fontWeight: 'bold', fontSize: '30px', paddingBottom: '5px' }}>Log In</h2>
                <p>Welcome back! Log in to continue.</p>
              </div>
              <div className="input-group mb-3 box">
                <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Username"  required/>
              </div>
              <div className="input-group mb-3">
                <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" required/>
              </div>

              <div className="input-group mb-3">
  <button className="btn btn-link fs-6" style={{ color: 'green', textDecoration: 'underline' }}>
    Forgot Password?
  </button>
</div>
              <div className="input-group mb-3">
                <button type='submit' className="btn btn-lg w-100 fs-6" style={{ fontWeight: 'bold', backgroundColor: 'green', color: 'white' }}>Log In</button>
              </div>
              <div className="row">
                <small>Don't have an account? <a href="/register" style={{ color: 'green' ,textDecoration: 'underline'}}>Sign Up</a></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
