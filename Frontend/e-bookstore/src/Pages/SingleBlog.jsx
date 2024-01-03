import React from "react";
import "../css/singleblog.scss";
import img1 from "../assets/post-img2.jpg";

const SingleBlog = () => {
  return (
    <section className="blog-content">
      <div className="blog-title-container">
        <div className="blog-title">
          <span>1st Jan, 2024</span>
          <h2>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptatem, quasi?
          </h2>
          <p>Lorem, ipsum dolor.</p>
        </div>
        <div className="blog-img-container">
          <img src={img1} alt="" srcset="" />
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
