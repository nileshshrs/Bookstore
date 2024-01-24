import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBookContext } from "../context/BookContext";

const Tabview1 = () => {
  const { books } = useBookContext();
  const [randomBooks, setRandomBooks] = useState([]);

  // Function to get a random book from the array
  const getRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * books.length);
    return books[randomIndex];
  };

  useEffect(() => {
    // Fetch 6 random books when the component mounts and books are available
    if (books.length > 0) {
      const array = Array.from({ length: 6 }, () => getRandomBook());
      setRandomBooks(array);
    }
  }, [books]);

  if (books.length === 0 || randomBooks.length === 0) {
    // Return a loading state or placeholder while books are being fetched
    return null;
  }

  return (
    <div className="popular-books gap-10 px-10 w-full py-12">
      {randomBooks.map((randomBook, index) => (
        <div key={index} className="popularbooks flex flex-col justify-center items-center gap-1">
          <div className="img-container border p-5 bg-[#EFEEE8]">
            <img src={randomBook.imagePath} alt="" width={"181px"} height={"278px"}/>
            <Link to={`/addtocart/${randomBook.bookId}`}>
              <button>Add to Cart</button>
            </Link>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <h3 className="text-[#74642f] text-[16px] text-bold mt-3">{randomBook.title}</h3>
            <p className="m-0 font-[Segoe UI]">{randomBook.author}</p>
            <div className="text-[#74642f] text-lg">{`$ ${randomBook.price.toFixed(2)}`}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tabview1;
