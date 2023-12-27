import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuthContext } from "../context/useAuthContext";
import { addToCart } from "../components/AddToCart";
import Reviews from "../components/Reviews";

const SingleProduct = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const url = `http://localhost:8080/api/v2/books/${id}`;
  const { user } = useAuthContext();
  const userID = user ? user.id : null;

  const getBook = async () => {
    try {
      const response = await axios.get(url);
      setBook(response.data || {});
    } catch (error) {
      console.error("Error fetching book:", error);
      setBook({}); // Set empty object in case of an error
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v2/reviews/getByBook/${id}`
      );
      setReviews(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  useEffect(() => {
    getBook();
  }, [url]);

  // const addToCart = async (bookId, userID) => {
  //   const cartData = {
  //     userId: userID,
  //     bookId: parseInt(bookId),
  //     quantity: 1,
  //   };
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/v2/carts/add-to-cart",
  //       cartData
  //     );
  //     console.log("Cart data added:", cartData);
  //     // Handle successful response as needed
  //     console.log(response.data);

  //     toast.success("Book has been added to the Cart", {
  //       position: "top-right",
  //     });
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //     // Handle errors
  //   }
  // };

  return (
    <section className="bestselling my-6 py-20">
      <div className="w-[80%] mx-auto flex gap-5 justify-center items-center bestselling-books">
        {/* ... */}
        <div className="">
          <img
            src={book.imagePath || "placeholder_image_url"}
            alt=""
            className="max-h-[500px] max-w-[300px] w-[300px] h-[500px]"
          />
          {/* Use a placeholder image URL or handle empty imagePath */}
        </div>
        <div
          className="flex flex-col gap-3 justify-center items-start px-4"
          style={{ marginBottom: "150px" }}
        >
          <p className="text-[#74642f] capitalize text-lg">
            By {book.authorName || "Unknown Author"}
            {/* Use default value for authorName if not available */}
          </p>
          <h3 className="capitalize">{book.title || "Unknown Title"}</h3>
          <p>{book.description || "No description available"}</p>
          {/* ... */}
          <button
            className="py-1 px-4 rounded-md flex items-center gap-3 jusitfy-center"
            style={{
              color: "#591201",
              border: "1px solid #591201",
              marginTop: "20px",
            }}
            onClick={() => addToCart(id, userID)}
          >
            <FaShoppingBag /> Add to Cart
          </button>
        </div>
      </div>
      <Reviews reviews={reviews} />
      <ToastContainer />
    </section>
  );
};

export default SingleProduct;
