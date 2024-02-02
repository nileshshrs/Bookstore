import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useBookContext } from "../context/BookContext";

const Featured = () => {
  const { books } = useBookContext();
  const [randomBooks, setRandomBooks] = useState([]);

  // Function to get a random book from the array
  const getRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * books.length);
    return books[randomIndex];
  };

  useEffect(() => {
    if (books.length > 0) {
      const getRandomBooksArray = () => {
        const selectedBooks = new Set();

        while (selectedBooks.size < 4) {
          const randomBook = getRandomBook();
          if (randomBook) {
            selectedBooks.add(randomBook);
          }
        }

        setRandomBooks([...selectedBooks]);
      };

      getRandomBooksArray();
    }
  }, [books]);

  if (randomBooks.length === 0) {
    // Return a loading state or placeholder while books are being fetched
    return null;
  } 

  return (
    <section className="featured-books-container mb-5">
      <div className="book-container">
        <div className="title-container">
          <h2 className="">Featured Books</h2>
        </div>
        <div className="featured-books py-12 gap-10 px-10 w-full">
          {randomBooks.map((randomBook, index) => (
            <div key={index} className="books flex flex-col justify-center items-center gap-1">
              <div className="border p-5 bg-[#EFEEE8] img-container">
                <img src={randomBook.imagePath} alt="" width={"181px"} height={"278px"}/>
                <Link to={`/books/${randomBook.bookId}`}>
                  <button>View Details</button>
                </Link>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <h3 className="text-[#74642f] text-[16px] text-bold mt-3 text-center">{randomBook.title}</h3>
                <p className="m-0 font-[Segoe UI]">{randomBook.author}</p>
                <div className="text-[#74642f] text-lg">{`$ ${randomBook.price.toFixed(2)}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="all-book-link flex justify-end items-center p-3 border-t-2">
        <Link
          to="/books"
          className="flex gap-3 justify-center items-center font-bold text-lg hover:text-[#74642f] transition ease-in"
        >
          View All Books <FaLongArrowAltRight />
        </Link>
      </div>
    </section>
  );
};

export default Featured;
