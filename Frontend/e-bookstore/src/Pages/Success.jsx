import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';

function Success() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-2 rounded shadow-lg ring ring-indigo-600" style={{marginBottom:"200px",height:"350px"}}>
        <div className="flex flex-col items-center space-y-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-4xl font-bold">Payment Success !</h1>
          <p>Thank you for choosing us! Contact us for any other help. Zenstore@gmail.com</p>
          <a
            href="/" // Replace with the actual link
            className="inline-flex items-center px-4 py-2 text-white bg-black border border-indigo-600 rounded rounded-full  focus:outline-none focus:ring">
            <IoMdArrowBack className="w-6 h-6 mr-2" />
            <span className="text-sm font-medium">
              Home
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Success;
