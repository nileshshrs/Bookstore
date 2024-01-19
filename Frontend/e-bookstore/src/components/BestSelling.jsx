import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useBookContext } from "../context/BookContext";

const BestSelling = () => {
  const { books } = useBookContext();
  const [randomBook, setRandomBook] = useState(null);

  // Function to get a random book from the array
  const getRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * books.length);
    return books[randomIndex];
  };

  useEffect(() => {
    // Fetch a random book when the component mounts and books are available
    if (books.length > 0) {
      setRandomBook(getRandomBook());
    }
  }, [books]);

  if (books.length === 0 || !randomBook) {
    // Return a loading state or placeholder while books are being fetched
    return null;
  }

  return (
    <section className="bestselling my-12 py-24">
      <div className="w-[80%] mx-auto flex gap-5 justify-center items-center bestselling-books">
        <div className="">
          <img
            src={randomBook.imagePath}
            alt=""
            className="h-[500px] min-w-[345px] object-cover"
          />
        </div>
        <div className="flex flex-col gap-3 justify-center items-start px-4">
          <h2 className="">Best Selling Book</h2>
          <p className="text-[#74642f] text-lg">By {randomBook.author}</p>
          <h3>{randomBook.title}</h3>
          <p>{randomBook.description}</p>
          <div className="text-lg font-bold text-[#74642f]">{`$ ${randomBook.price.toFixed(2)}`}</div>
          <div className="">
            <Link
              to={`/addtocart/${randomBook.bookId}`}
              className="flex items-center justify-center gap-3 font-bold hover:text-[#74642f] transition ease-in text-lg"
            >
              Shop it Now <FaLongArrowAltRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
