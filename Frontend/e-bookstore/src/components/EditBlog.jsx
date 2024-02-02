import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../css/createblog.scss"; // Import your CSS file
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../Firebase/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBlog = ({ isOpen, onRequestClose, post, blog }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDetails, setBlogDetails] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Set initial values when the modal is opened
    if (isOpen && post) {
      setBlogTitle(post.blogTitle || "");
      setBlogDetails(post.blogDetails || "");
      setSelectedImage(post.imagePath || null);
    }
  }, [isOpen, post]);

  //handling image upload here
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(file.name);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };
  // handling image upload here

  //uploading image to firebase

  const uploadImage = async (e) => {
    e.preventDefault();
    const file = image;

    if (!file) {
      handleSubmit(post.imagePath);
    } else {
      const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
      const randomString = Math.random().toString(36).substring(2, 8);
      const fileName = `${timestamp}_${randomString}_${file.name}`;

      const storage = getStorage(app);
      const REF = ref(storage, `upload/${fileName}`);
      const uploadTask = uploadBytesResumable(REF, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(progress);
        },
        (err) => {
          console.log(err);
        },
        () =>
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            // Assuming you have a Submit function defined elsewhere
            // Modify this part according to your logic
            //calls the submit to database
            handleSubmit(url);
          })
      );
    }
  };

  //uploading image to firebase

  //patching blog here

  const handleSubmit = async (url) => {
    const formData = {
      blogTitle: blogTitle,
      blogDetails: blogDetails,
      imagePath: url,
    };
    try {
      const res = await axios.patch(
        `http://localhost:8080/api/v2/blogs/update/${post.blogId}`,
        formData
      );
      console.log(res.data);
      setBlogTitle("");
      setBlogDetails("");
      setImage(null);
      setSelectedImage(null);
      blog();
      toast.success("Book has been added sucessfully", {
        position: "top-center",
      });
      setTimeout(() => {
        onRequestClose();
      }, 3000);
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-center",
      });
    }
  };

  //patching blog here

  //shortening image path
  const truncatedImage =
    selectedImage && selectedImage.length > 30
      ? selectedImage.substring(0, 30) + "..."
      : selectedImage;

  //shortening image path

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
              onClick={uploadImage}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </Modal>
  );
};

export default EditBlog;




