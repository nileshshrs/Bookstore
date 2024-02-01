import React, { useEffect, useState } from "react";
import "../css/blog.scss";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import CreateBlog from "../components/CreateBlog";
import EditBlog from "../components/EditBlog";
import axios from "axios";
import { useAuthContext } from "../context/useAuthContext";

const Blog = () => {
  const { user } = useAuthContext();
  const userID = user ? user.id : null;
  const isAdmin = user ? user.roles.includes("admin") : null;
  const [isCreateBlogModalOpen, setCreateBlogModalOpen] = useState(false);
  const [isEditBlogModalOpen, setEditBlogModalOpen] = useState(false);
  const [singleBlogPost, setSingleBlogPost] = useState({});
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v2/blogs/getAll");
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const fetchBlog = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v2/blogs/getById/${id}`
      );
      openEditBlogModal();
      setSingleBlogPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const openCreateBlogModal = () => {
    setCreateBlogModalOpen(true);
  };

  const closeCreateBlogModal = () => {
    setCreateBlogModalOpen(false);
  };

  const openEditBlogModal = () => {
    setEditBlogModalOpen(true);
  };

  const closeEditBlogModal = () => {
    setEditBlogModalOpen(false);
  };

  //Blog delete
  const deleteBlog = async (blogId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v2/blogs/delete/${blogId}`);
      getBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
     
    }
  };

  return (
    <main className="">
      <div className="page-title-container">
        <h2>Blogs & Articles</h2>
        <p>Read our blogs and articles</p>
      </div>
      <section className="py-3">
        <div className="add-blogs">
          {isAdmin && (
            <button
              onClick={openCreateBlogModal}
              className="flex items-center justify-center gap-3 border-black border px-3 py-1 ms-auto rounded-md font-semibold hover:text-white hover:bg-black ease-linear transition"
            >
              <FaPlusCircle />
              Create Blog
            </button>
          )}
        </div>
        <div className="blogs-articles">
          {blogs.map((blog) => (
            <div
              key={blog.blogId}
              className="flex flex-col items-center justify-center w-64 overflow-hidden"
            >
              <div className="post-img hover:scale-110 transition-transform duration-300 transform-gpu">
                <Link to={`/blog/${blog.blogId}`}>
                  <img src={blog?.ImgPath} alt="" className="w-full h-auto" />
                </Link>
              </div>
              <div className="mt-2 flex flex-col gap-3">
                <div className="post-date text-gray-500 flex justify-between items-center">
                  <span>Mar 30, 2021</span>
                  <div className="flex items-center gap-2 justify-between" style={{paddingLeft:"120px"}}>
                    {isAdmin && (
                      <>
                        <button
                          className="text-black"
                          onClick={() => {
                            fetchBlog(blog.blogId);
                          }}
                        >
                          <FaRegEdit />
                        </button>
                        <button
                          className="text-red-700"
                          onClick={() => {
                            deleteBlog(blog.blogId);
                          }}
                        >
                          <MdAutoDelete />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <Link to={`/blog/${blog.blogId}`}>
                  <h3 className="text-lg font-semibold">{blog.blogTitle}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <CreateBlog
          isOpen={isCreateBlogModalOpen}
          onRequestClose={closeCreateBlogModal}
          id={userID}
          blog={getBlogs}
        />
        <EditBlog
          isOpen={isEditBlogModalOpen}
          onRequestClose={closeEditBlogModal}
          post={singleBlogPost}
          blog={getBlogs}
        />
      </section>
    </main>
  );
};

export default Blog;
