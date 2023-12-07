import React from 'react';
import "../css/register.css";
import signinImage from "../assets/signin1.png"; // Import the image

function Register() {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">

        {/* <!-- Login Container --> */}

        <div className="row border rounded-5 p-3 bg-white shadow box-area">

          {/* <!--Left Box --> */}

          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
            <div className="featured-image mb-3">
              <img src={signinImage} className="img-fluid" alt="Signin" style={{ width: '1000px' }} />
            </div>
          </div>

          {/* <!--Right Box --> */}

          <div className="col-md-6 right-box">
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

        </div>
      </div>
    </>
  );
}

export default Register;
