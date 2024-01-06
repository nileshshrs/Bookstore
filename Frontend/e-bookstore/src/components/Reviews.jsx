import React, { useState } from "react";
import { useAuthContext } from "../context/useAuthContext";
import { Link } from "react-router-dom";
import "../css/reviews.scss";
import axios from "axios";

const Reviews = ({ reviews, bookID, fetchReviews }) => {
  const { user } = useAuthContext();
  const [newReviewText, setNewReviewText] = useState("");

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    console.log("form submission");
    console.log(newReviewText);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v2/reviews/add",
        {
          reviewText: newReviewText,
          userId: user.id,
          bookId: parseInt(bookID),
        }
      );
      const addedReview = response.data; // Rename the variable here
      setNewReviewText("");
      fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v2/reviews/delete/${reviewId}`
      );
      console.log(response.data); // Log the response if needed
      fetchReviews(); // Fetch reviews after deletion
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="review-section w-[80%] mx-auto p-5 flex flex-col gap-4 ">
      <div className="flex flex-col w-full px-5 gap-3 review-content">
        <h4 className="font-bold">Write a Review</h4>
        <form
          onSubmit={handleReviewSubmit}
          className="w-full flex flex-col items-start justify-center gap-3"
        >
          <textarea
            className="w-full h-24 border border-black rounded-md px-2 py-1"
            placeholder="write a review..."
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
          ></textarea>
          <button
            className="border px-3 py-2 border-black bg-black text-white font-semibold rounded-md text-sm"
            type="submit" // Changed onSubmit to type="submit"
          >
            Submit Review
          </button>
        </form>
      </div>
      <div className="px-5 flex flex-col gap-3 reviews">
        <h4 className="font-bold text-md">Reviews: </h4>
        {reviews.map((review, index) => (
          <div key={index} className="px-3">
            <div
              className="flex flex-col gap-1 px-2 py-1 m-0 "
              style={{ borderBottom: "1px solid #FFFFFF" }}
            >
              <Link to="">
                <h4 className="font-bold text-[15px]">{review.userName}</h4>
              </Link>
              <p className="m-0 text-[14px]">{review.reviewText}</p>
              <div className="flex gap-2">
                {user &&
                  (user.role === "admin" || user.id === review.userId) && (
                    <>
                      <button className="text-black font-semibold text-[12px] underline">
                        edit
                      </button>

                      {user &&
                        (user.role === "admin" ||
                          user.id === review.userId) && (
                          <>
                            <button
                              className="text-black font-semibold text-[12px] underline"
                              onClick={() =>
                                handleDeleteReview(review.reviewId)
                              }
                            >
                              delete
                            </button>
                          </>
                        )}
                    </>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
