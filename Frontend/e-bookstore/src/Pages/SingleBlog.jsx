// import React, { useEffect, useState } from "react";
// import "../css/singleblog.scss";
// import img1 from "../assets/post-img2.jpg";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const SingleBlog = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState([]);

//   useEffect(() => {
//     const fetchPost = async () => {
//       const res = await axios.get(
//         `http://localhost:8080/api/v2/blogs/getById/${id}`
//       );
//       console.log(res.data);
//       setPost(res.data)
//     };
//     fetchPost();
//   }, []);

//   return (
//     <section className="blog-content">
//       <div className="blog-title-container">
//         <div className="blog-title">
//           <span>1st Jan, 2024</span>
//           <h2>
//             {post.blogTitle}
//           </h2>
//           <p>Lorem, ipsum dolor.</p>
//         </div>
//         <div className="blog-img-container">
//           <img src={post.imagePath} alt="" srcset=""  className="object-contain max-h-[328px]"/>
//         </div>
//       </div>
//       <article className="posts">
//         {post.blogDetails}
//       </article>
//     </section>
//   );
// };

// export default SingleBlog;
import React, { useEffect, useState } from "react";
import "../css/singleblog.scss";
import img1 from "../assets/post-img2.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v2/blogs/getById/${id}`
        );
        console.log(res.data);
        setPost(res.data);
        if (res.data.comments) {
          setComments(res.data.comments);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const renderComments = () => {
    return comments.map((comment) => (
      <div key={comment.id} className="comment">
        <p>{comment.text}</p>
        <p>By: {comment.author}</p>
      </div>
    ));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v2/blogs/addComment/${id}`,
        {
          text: newComment,
          // Assuming you have an authenticated user and you pass their ID as the author
          author: "user_id", // Replace with the actual user ID or use appropriate user identification
        }
      );
      console.log(res.data);
      // After adding the comment successfully, update the comments state to display the new comment
      setComments([...comments, res.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <section className="blog-content">
      <div className="blog-title-container">
        {/* ... */}
      </div>
      <article className="posts">{post.blogDetails}</article>

      {/* Display comments */}
      <div className="comments-section">
        <h3>Comments</h3>
        {renderComments()}
        {/* Add comment form */}
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    </section>
  );
};

export default SingleBlog;
