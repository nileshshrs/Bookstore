import React, { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/comments.scss";

const Comments = ({ comment, fetch}) => {
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  const handleEditClick = (commentId, currentText) => {
    setEditCommentId(commentId);
    setEditedCommentText(currentText);
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditedCommentText("");
  };

  const handleSaveEdit = async (commentId) => {
    try {
      // Make a PATCH request to update the comment
      await axios.patch(`http://localhost:8080/api/v2/blogs/comments/editComment/${commentId}`, {
        commentText: editedCommentText,
      });

      // Update the local state to reflect the changes
      setEditCommentId(null);
      setEditedCommentText("");
      fetch()
    } catch (error) {
      console.error("Error updating comment:", error);
      // Handle error appropriately (show message to the user, log, etc.)
    }
  };

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
          {comment.map((x) => {
            const isEditing = x.commentId === editCommentId;

            return (
              <div
                className="pb-3"
                style={{ borderBottom: "1px solid #FFFFFF" }}
                key={x.commentId}
              >
                <Link to="">
                  <h4 className="">{x.userName}</h4>
                </Link>
                {isEditing ? (
                  <div className="px-3">
                    <textarea
                      value={editedCommentText}
                      onChange={(e) => setEditedCommentText(e.target.value)}
                      className="w-full rounded-md border border-black py-1 px-2 h-[50px]"
                    ></textarea>
                    <div className="comment-btn">
                      <button onClick={() => handleSaveEdit(x.commentId)}>
                        Save
                      </button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <p className="px-3">{x.commentText}</p>
                )}
                <div className="comment-btn px-3">
                  {isEditing ? null : (
                    <>
                      <button
                        onClick={() =>
                          handleEditClick(x.commentId, x.commentText)
                        }
                      >
                        edit
                      </button>
                      <button className="">delete</button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comments;
