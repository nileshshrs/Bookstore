import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useBookContext } from "../context/BookContext";
import { addToCart } from "../components/AddToCart";
import { useAuthContext } from "../context/useAuthContext";

const Search = () => {
    const params = useParams();
  const searchData = params.searchKey;
  const { books, fetchBooks } = useBookContext();
  const { user } = useAuthContext();
  const userID = user ? user.id : null;

  
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchAndFilterBooks = async () => {
      await fetchBooks();
      search(books);
    };

    fetchAndFilterBooks();
  }, [searchData]);

  const search = (books) => {
    const searchArray = searchData.split("");
    const reg = new RegExp("(?=.*" + searchArray.join(")(?=.*") + ")", "i");
    const filteredBooks = books.filter((book) => {
      const title = book.title;
      const author = book.authorName;

      return reg.test(title) || reg.test(author);
    });
    setResults([...filteredBooks]);
  };

    console.log("books", books);
  console.log("results", results);
  return (
    <section className="featured-books-container mb-5">
      <div className="book-container">
        <div className="title-container py-4">
          <h2>Search</h2>
        </div>
        <div className="featured-books py-12 gap-10 px-10 w-full">
          {results.map((book) => (
            <div
              key={book.bookId}
              className="books flex flex-col justify-center items-center gap-1">
              <div className="border p-5 bg-[#EFEEE8] img-container">
                <Link to={`/books/${book.bookId}`}>
                  <img
                    src={book.imagePath}
                    alt=""
                    width={"100%"}
                    className="w-full h-full"
                  />
                </Link>
                <button onClick={() => addToCart(book.bookId, userID)}>
                  Add to Cart
                </button>
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

export default Search;
