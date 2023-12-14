import React, { useEffect, useState } from "react";
import AddBookForm from "./AddBookForm";
import { useBookContext } from "../context/BookContext";
import "../css/dashboardproduct.scss";

const DashboardProducts = () => {
  const { books, fetchBooks } = useBookContext();

  useEffect(() => {
    fetchBooks(); // Fetch books when the component mounts
  }, []);

  return (
    <div className="dashboard-product-container p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book.bookId}
            className="relative book-cards flex flex-col items-center justify-evenly gap-1 group overflow-hidden border border-gray-300 rounded p-4 max-w-md"
          >
            <div className="relative group-hover:opacity-70 transition-opacity">
              <img
                src={book.imagePath}
                alt=""
                width={"100%"}
                className="w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <div className="overlay-buttons text-white text-center">
                  <button className="edit-btn bg-blue-500">Edit</button>
                  <button className="del-btn bg-red-500 ml-2">Delete</button>
                </div>
              </div>
            </div>
            <div className="book-title font-bold text-[#74642F] whitespace-nowrap">
              {book.title}
            </div>
            <p className="m-0 whitespace-nowrap">{book.authorName}</p>
            <div className="book-title font-bold text-[#74642f]">
              $ {book.price}
            </div>
            {/* Buttons moved below the price */}
            <div className="overlay-buttons text-white text-center">
              <button className="edit-btn bg-blue-500">Edit</button>
              <button className="del-btn bg-red-500 ml-2">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardProducts;
