import React, { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { Link } from "react-router-dom";
import "../css/comments.scss";

const Comments = ({}) => {
  return (
    <div className="comment-section">
      <div className="comment-header">
        <h4 className="font-bold">Add Comment</h4>
        <form className="">
          <textarea
            placeholder="Enter the comment..."
            className="w-full rounded-md border border-black py-1 px-2"
          ></textarea>
          <button className="" type="submit">
            Comment
          </button>
        </form>
      </div>
      <div className="comments-container">
        <h4 className="font-bold text-md">Comments: </h4>
        <div className="comments">
          <div className="pb-3" style={{ borderBottom: "1px solid #FFFFFF" }}>
            <Link to="">
              <h4 className="">Username</h4>
            </Link>
            <p className="">nice blog</p>
            <div className="comment-btn">
              <>
                <button className="">edit</button>
                <>
                  <button className="">delete</button>
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
