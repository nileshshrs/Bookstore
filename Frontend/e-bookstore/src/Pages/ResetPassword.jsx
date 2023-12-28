
import React, { useState} from "react";

const ResetPassword = () => {
    const [step, setStep] = useState("sendLink");

    const handleSendLink = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v2/users/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: enteredEmail }),
            });
    
            if (response.ok) {
                setStep("resetPassword");
            } else {
                // Handle error response
                const errorData = await response.json();
                console.error(errorData.message);
            }
        } catch (error) {
            console.error("Error sending reset link:", error);
        }
    };
    
    // In handleResetPassword function
    const handleResetPassword = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v2/users/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ resetToken, newPassword }),
            });
    
            if (response.ok) {
                // Display success message or redirect to login page
            } else {
                // Handle error response
                const errorData = await response.json();
                console.error(errorData.message);
            }
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };
    

  return (
<>
        {step === "sendLink" && (
            // Render the UI for sending the link
            <section className="h-screen flex justify-center items-center form-section relative">
            <div className="absolute w-full h-full top-0 translucent"></div>
            <form className="flex flex-col gap-4 bg-[#F8F7F2] registration-form z-[99]">
              <div>
                <h2 className="font-bold text-[30px]">Forgot Password?</h2>
                <p className="text-[15px]">Don't worry, Easily recover using your registered gmail.</p>
              </div>
              
              <input placeholder="Email"
              type="text"
                id="username"
                autoComplete="off"
                className="rounded"/>

              <button onClick={handleSendLink} className="form-btn rounded">
                Send Link
              </button>
            
            </form>
          </section>
          
        )}

        {step === "resetPassword" && (
            // Render the UI for resetting the password
            <section className="h-screen flex justify-center items-center form-section relative">
            <div className="absolute w-full h-full top-0 translucent"></div>
            <form className="flex flex-col gap-4 bg-[#F8F7F2] registration-form z-[99]">
              <div>
                <h2 className="font-bold text-[30px]">Change Password</h2>
                <p className="text-[15px]"></p>
              </div>
              
    
    
              <input
                type="password"
                required
                placeholder="New Password"
                id="password"
                autoComplete="off"
              
                
                className="rounded"
              />
     
              <input
                type="password"
                required
                placeholder="Confirm password"
                id="Password"
                autoComplete="off"
              
                
                className="rounded"
              />
    
            
    
              <button onClick={handleResetPassword} className="form-btn rounded">
                Recover Now
              </button>
              
            </form>
          </section>

        )}
    </>

  
  );
};

export default ResetPassword;