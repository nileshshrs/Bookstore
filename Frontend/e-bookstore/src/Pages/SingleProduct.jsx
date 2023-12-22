import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import img1 from "../assets/main-banner2.jpg";
import { FaShoppingBag } from "react-icons/fa";

import axios from "axios";
const SingleProduct = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const url = `http://localhost:8080/api/v2/books/${id}`;

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await axios.get(url);
        setBook(response.data || {});
      } catch (error) {
        console.error('Error fetching book:', error);
        setBook({}); // Set empty object in case of an error
      }
    };
    getBook();
  }, [url]);

  const addToCart = async (bookId) => {
    const cartData = {
      userId: 3,
      bookId:  parseInt(bookId),
      quantity: 1
    };
    try {
      const response = await axios.post('http://localhost:8080/api/v2/carts/add-to-cart', cartData);
      console.log('Cart data added:', cartData);
      // Handle successful response as needed
      console.log(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle errors
    }
  };

  return (
    <section className="bestselling my-6 py-20">
      <div className="w-[80%] mx-auto flex gap-5 justify-center items-center bestselling-books">
        {/* ... */}
        <div className="">
          <img src={book.imagePath || "placeholder_image_url"} alt="" className="max-h-[500px] max-w-[300px] w-[300px] h-[500px]"/>
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
            onClick={() => addToCart(id)}
          >
            <FaShoppingBag/> Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
