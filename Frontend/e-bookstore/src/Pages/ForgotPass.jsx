import React  from "react";

const ForgotPass = () => {
  

  return (
    <>
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



        

          <button className="form-btn rounded">
            Send Link
          </button>
        
        </form>
      </section>
    </>
  );
};

export default ForgotPass;