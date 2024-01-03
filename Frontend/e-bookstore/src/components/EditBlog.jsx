import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../css/createblog.scss"; // Import your CSS file
import { marked } from "marked";
import axios from "axios";

const EditBlog = ({ isOpen, onRequestClose, post }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDetails, setBlogDetails] = useState("");
  useEffect(() => {
    // Set initial values when the modal is opened
    if (isOpen && post) {
      setBlogTitle(post.blogTitle || "");
      setBlogDetails(post.blogDetails || "");
      setSelectedImage(post.imagePath || null);
    }
  }, [isOpen, post]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file ? file.name : null);
    // Add additional logic for handling the image upload
  };

  const truncatedImage =
    selectedImage && selectedImage.length >30
      ? selectedImage.substring(0, 30) + "..."
      : selectedImage;

  const onEditSubmit = (e) => {
    e.preventDefault();
    const htmlContent = marked(post);
    console.log(htmlContent);
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
        <form
          action=""
          className="p-3 flex flex-col items-start justify-start gap-4 h-full border"
        >
          <h2 className="font-bold text-lg w-full text-center">Edit.</h2>
          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="post-title"
              className="flex items-start justify-start"
            >
              <h2 className="text-sm font-bold">Title</h2>
            </label>
            <input
              value={blogTitle}
              type="text"
              id="post-title"
              placeholder="post title..."
              className="w-full border border-black rounded-[5px] p-2 h-[30px]"
              onChange={(e) => setBlogTitle(e.target.value)}
            />
          </div>

          {/* immage upload section below */}

          <div className="w-full flex flex-col items-start gap-2">
            <h2 className="text-sm font-bold">Add an image</h2>
            <div className="w-full flex items-center border border-black rounded-[5px] h-[30px]">
              <label
                htmlFor="imageUpload"
                className="cursor-pointer bg-black text-white rounded-[5px] px-4 h-[30px] flex items-center font-semibold image-upload-label"
              >
                Upload Image
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="hidden h-[30px]"
                onChange={(e) => handleImageUpload(e)}
              />
              <span className="ml-2 text-black h-[30px] flex items-center image-name-span">
                {truncatedImage || "No file chosen"}
              </span>
            </div>
          </div>

          <div className="w-full h-full border">
            <textarea
              name=""
              id="blog-post"
              className="w-full h-full border-black border rounded-[5px] p-2"
              placeholder="Write something..."
              onChange={(e) => setBlogDetails(e.target.value)}
              value={blogDetails}
            />
          </div>

          <div className="w-full">
            <button
              className="border border-black px-3 font-bold bg-black text-white py-[3px] rounded-md"
              onClick={onEditSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditBlog;
