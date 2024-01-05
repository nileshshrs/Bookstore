import React, { useState ,useEffect} from "react";
import Modal from "react-modal";
import "../css/createblog.scss"; // Import your CSS file
import axios from "axios";

// this is origin 
const CreateBlogModal = ({ isOpen, onRequestClose, id }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [posts, setPosts] = useState([]);
  // console.log(id)

  // const handleCreateBlog = (e) => {
  //   e.preventDefault();
  //   console.log("Creating blog with title:", title, "and content:", content);

  //   // Clear the form
  //   setTitle("");
  //   setContent("");

  //   // Close the modal after creating the blog post
  //   onRequestClose();
  // };

  // const [selectedImage, setSelectedImage] = useState(null);

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedImage(file ? file.name : null);
  //   // Add additional logic for handling the image upload
  // };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v2/blogs/getAll");
      setPosts(res.data); // Assuming the response data is an array of blog posts
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };




  

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount or when isOpen changes
  }, [isOpen]);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    
    // Assuming you have an API endpoint to add a blog post
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", selectedImage);

      const res = await axios.post(
        `http://localhost:8080/api/v2/blogs/add`, // Replace with your backend endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Blog created:", res.data);

      // Clear the form after successful submission
      setTitle("");
      setContent("");
      setSelectedImage(null);
      

      // Close the modal after creating the blog post
      onRequestClose();
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
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
//adding here 
          onSubmit={handleCreateBlog}

          // action=""
          className="p-3 flex flex-col items-start justify-start gap-4 h-full border"
        >
          <h2 className="font-bold text-lg w-full text-center">
            Write a Blog. !
          </h2>
          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="post-title"
              className="flex items-start justify-start"
            >
              <h2 className="text-sm font-bold">Title</h2>
            </label>
            <input
              type="text"
              id="post-title"
              //adding 
              value={title}
              onChange={(e) => setTitle(e.target.value)}

              placeholder="post title..."
              className="w-full border border-black rounded-[5px] p-2 h-[30px]"
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
                {selectedImage ? selectedImage : "No file chosen"}
              </span>
            </div>
          </div>

          <div className="w-full h-full border">
            <textarea
              // name=""
              // adding 
              value={content}
              onChange={(e) => setContent(e.target.value)}  

              id="blog-post"
              className="w-full h-full border-black border rounded-[5px] p-2"
              placeholder="Write something..."
            />
          </div>

          <div className="w-full">
            <button type="submit" className="border border-black px-3 font-bold bg-black text-white py-[3px] rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
       {/* Displaying the updated list of blog posts */}
       <div className="blog-posts">
        <h2>Recent Blog Posts</h2>
        <ul>
  {posts.map((post) => (
    <li key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {post.image && <img src={`http://localhost:8080/${post.image}`} alt="Blog" />}
    </li>
  ))}
</ul>
      </div>
    </Modal>
  );
};

export default CreateBlogModal;