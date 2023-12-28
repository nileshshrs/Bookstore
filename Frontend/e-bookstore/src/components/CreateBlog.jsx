import React, { useState } from "react";
import Modal from "react-modal";
import img1 from "../assets/post-img1.jpg";
import "../css/createblog.scss"; // Import your CSS file

const CreateBlogModal = ({ isOpen, onRequestClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateBlog = (e) => {
    e.preventDefault();
    console.log("Creating blog with title:", title, "and content:", content);

    // Clear the form
    setTitle("");
    setContent("");

    // Close the modal after creating the blog post
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Blog Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
      appElement={document.getElementById("root")}
    >
      <div className="modal-content">
      
      </div>
    </Modal>
  );
};

export default CreateBlogModal;
