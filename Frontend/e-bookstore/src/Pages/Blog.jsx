import React, { useState } from "react";
import "../css/blog.scss";
import { FaPlusCircle, FaRegEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import img1 from "../assets/post-img1.jpg";
import img2 from "../assets/post-img2.jpg";
import img3 from "../assets/post-img3.jpg";
import { Link } from "react-router-dom";
import CreateBlog from "../components/CreateBlog";
import EditBlog from "../components/EditBlog";
const Blog = () => {
  const [isCreateBlogModalOpen, setCreateBlogModalOpen] = useState(false);
  const [isEditBlogModalOpen, setEditBlogModalOpen] = useState(false);

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
  return (
    <main className="">
      <div className="page-title-container">
        <h2>Blogs & Articles</h2>
        <p>Read our blogs and articles</p>
      </div>
      <section className="py-3">
        <div className="add-blogs">
          <button
            onClick={openCreateBlogModal}
            className="flex items-center justify-center gap-3 border-black border px-3 py-1 ms-auto rounded-md font-semibold hover:text-white hover:bg-black ease-linear transition"
          >
            <FaPlusCircle />
            Create Blog
          </button>
        </div>
        <div className="blogs-articles">
          <div class="flex flex-col items-center justify-center w-64 overflow-hidden">
            <div class="post-img hover:scale-110 transition-transform duration-300 transform-gpu">
              <a href="#">
                <img src={img1} alt="" class="w-full h-auto" />
              </a>
            </div>
            <div class="mt-2 flex flex-col gap-3">
              <div class="post-date text-gray-500 flex justify-between items-center">
                <span>Mar 30, 2021</span>
                <div className="flex items-center gap-2 justify-center">
                  <button className="text-black">
                    <FaRegEdit />
                  </button>
                  <button className="text-red-700">
                    <MdAutoDelete />
                  </button>
                </div>
              </div>
              <h3 class="text-lg font-semibold">
                Reading Books Always Makes The Moments Happy
              </h3>
            </div>
          </div>
          {/* remove these sections when i need to actually map and make this page dynamic*/}
          <div class="flex flex-col items-center justify-center w-64 overflow-hidden">
            <div class="post-img hover:scale-110 transition-transform duration-300 transform-gpu">
              <a href="#">
                <img src={img1} alt="" class="w-full h-auto" />
              </a>
            </div>
            <div class="mt-2 flex flex-col gap-3">
              <div class="post-date text-gray-500 flex justify-between items-center">
                <span>Mar 30, 2021</span>
                <div className="flex items-center gap-2 justify-center">
                  <button className="text-black">
                    <FaRegEdit />
                  </button>
                  <button className="text-red-700">
                    <MdAutoDelete />
                  </button>
                </div>
              </div>
              <h3 class="text-lg font-semibold">
                Reading Books Always Makes The Moments Happy
              </h3>
            </div>
          </div>
          {/* remove these sections when i need to actually map and make this page dynamic*/}
          <div class="flex flex-col items-center justify-center w-64 overflow-hidden">
            <div class="post-img hover:scale-110 transition-transform duration-300 transform-gpu">
              <a href="#">
                <img src={img1} alt="" class="w-full h-auto" />
              </a>
            </div>
            <div class="mt-2 flex flex-col gap-3">
              <div class="post-date text-gray-500 flex justify-between items-center">
                <span>Mar 30, 2021</span>
                <div className="flex items-center gap-2 justify-center">
                  <button className="text-black" onClick={openEditBlogModal}>
                    <FaRegEdit />
                  </button>
                  <button className="text-red-700">
                    <MdAutoDelete />
                  </button>
                </div>
              </div>
              <h3 class="text-lg font-semibold">
                Reading Books Always Makes The Moments Happy
              </h3>
            </div>
          </div>
        </div>
        <CreateBlog
          isOpen={isCreateBlogModalOpen}
          onRequestClose={closeCreateBlogModal}
        />
        <EditBlog
          isOpen={isEditBlogModalOpen}
          onRequestClose={closeEditBlogModal}
        />
      </section>
    </main>
  );
};

export default Blog;
