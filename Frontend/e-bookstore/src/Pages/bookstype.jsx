import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useBookContext } from "../context/BookContext"; // Import the BookContext

const BookType = () => {
  const { books, fetchBooks } = useBookContext(); // Use the BookContext

  useEffect(() => {
    fetchBooks(); // Fetch books when the component mounts
  }, []);

  return (
    <section className="featured-books-container mb-5">
      <div className="book-container">
        <div className="title-container"></div>
        <div className="featured-books py-12 gap-10 px-10 w-full">
          {books.map((book) => (
            <div
              key={book.bookId}
              className="books flex flex-col justify-center items-center gap-1"
            >
              <div className="border p-5 bg-[#EFEEE8] img-container">
                <Link to={`/books/${book.bookId}`}>
                  <img
                    src={book.imagePath}
                    alt=""
                    width={"100%"}
                    className="w-full h-full"
                  />
                </Link>
                <button onClick={()=>console.log("clicked")}>Add to Cart</button>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <h3 className="text-[#74642f] text-[16px] text-bold mt-3">
                  {book.title}
                </h3>
                <p className="m-0 font-[Segoe UI]">{book.authorName}</p>
                <div className="text-[#74642f] text-lg">
                  ${book.price.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookType;
