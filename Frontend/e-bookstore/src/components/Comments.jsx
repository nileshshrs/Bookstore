import React, { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { Link } from "react-router-dom";
import "../css/reviews.scss";


const Comments = ({  }) => {
 

  return (
    <div className="review-section w-[80%] mx-auto p-5 flex flex-col gap-4 ">
      <div className="flex flex-col w-full px-5 gap-3 review-content">
        <h4 className="font-bold">Add Comment</h4>
        <form className="w-full flex flex-col items-start justify-center gap-3" >
          <textarea
            className="w-full h-24 border border-black rounded-md px-2 py-1"
            placeholder="Enter the comment..."
          ></textarea>
          <button
            className="border px-3 py-2 border-black bg-black text-white font-semibold rounded-md text-sm"
            type="submit"
          >
            Submit Comment
          </button>
        </form>
      </div>
      <div className="px-5 flex flex-col gap-3 reviews">
        <h4 className="font-bold text-md">Comments: </h4>
          <div className="px-3">
            <div
              className="flex flex-col gap-2 px-2 py-1 m-0 "
              style={{ borderBottom: "1px solid #FFFFFF" }}
            >
              <Link to="">
                <h4 className="font-bold text-sm">Username</h4>
              </Link>
              <p className="m-0 text-sm">nice blog</p>
              <div className="flex gap-3 py-2">
                    <>
                      <button className="border border-black bg-black text-white px-2 py-1 w-[90px] font-semibold text-sm rounded">
                        edit
                      </button>
                  <>
                    <button
                      className="border border-black bg-black text-white px-2 py-1 w-[90px] font-semibold text-sm rounded"
                    >
                      delete
                    </button>
                  </>
                    </>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Comments;