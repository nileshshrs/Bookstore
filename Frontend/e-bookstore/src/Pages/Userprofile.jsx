import React from "react";

const Userprofile = () => {
 

  return (
    <div className="flex items-center justify-center sm-screen">
      <div className="w-full p-4 sm:p-8 mt-4 mb-4" style={{ maxWidth: "500px" }}>
        <div className="rounded shadow p-4 sm:p-6">
          <div className="pb-4 sm:pb-6">
            <h2 className="font-bold mb-3 text-[20px]">Hi, Bibhakta :)</h2>
            <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">
              Username
            </label>
            <div className="flex">
              <input
                disabled
                id="username"
                className="border-2 rounded-r px-4 py-2 w-full"
                type="text"
                value= "bibhakta"
              />
            </div>
          </div>
          <div className="pb-4 sm:pb-6">
            <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">
              Email
            </label>
            <input
              disabled
              id="email"
              className="border-2 rounded-r px-4 py-2 w-full"
              type="email"
              value="Bibhaktalamsal@gmail.com"
            />

            <span className="text-gray-600 pt-2 block sm:pt-4 opacity-70">
              Personal login information of your account
            </span>
            {/* Edit and Save buttons */}
            <button
            className="border px-3 py-2 mt-4 border-black bg-black text-white font-semibold rounded-md text-sm"
            type="submit" 
          >
            Edit
          </button>
          <button
          disabled
            className="border ml-3 px-3 py-2 mt-4 border-black bg-black text-white font-semibold rounded-md text-sm"
            type="submit" 
          >
            save
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
