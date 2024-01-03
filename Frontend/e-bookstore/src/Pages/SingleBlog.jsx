import React, { useEffect, useState } from "react";
import "../css/singleblog.scss";
import img1 from "../assets/post-img2.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/v2/blogs/getById/${id}`
      );
      console.log(res.data);
      setPost(res.data)
    };
    fetchPost();
  }, []);

  return (
    <section className="blog-content">
      <div className="blog-title-container">
        <div className="blog-title">
          <span>1st Jan, 2024</span>
          <h2>
            {post.blogTitle}
          </h2>
          <p>Lorem, ipsum dolor.</p>
        </div>
        <div className="blog-img-container">
          <img src={post.imagePath} alt="" srcset=""  className="object-contain max-h-[328px]"/>
        </div>
      </div>
      <article className="posts">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat,
          vero quo nihil repellat repudiandae, excepturi voluptate consequuntur
          explicabo enim magni impedit, necessitatibus placeat minus? Pariatur
          atque est cum a possimus. Asperiores eos mollitia et iusto laborum,
          ad, similique incidunt, corrupti provident fugit porro quis commodi
          vel saepe voluptatibus repudiandae laboriosam?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat,
          vero quo nihil repellat repudiandae, excepturi voluptate consequuntur
          explicabo enim magni impedit, necessitatibus placeat minus? Pariatur
          atque est cum a possimus. Asperiores eos mollitia et iusto laborum,
          ad, similique incidunt, corrupti provident fugit porro quis commodi
          vel saepe voluptatibus repudiandae laboriosam?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat,
          vero quo nihil repellat repudiandae, excepturi voluptate consequuntur
          explicabo enim magni impedit, necessitatibus placeat minus? Pariatur
          atque est cum a possimus. Asperiores eos mollitia et iusto laborum,
          ad, similique incidunt, corrupti provident fugit porro quis commodi
          vel saepe voluptatibus repudiandae laboriosam?
        </p>
      </article>
    </section>
  );
};

export default SingleBlog;