import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useBookContext } from "../context/BookContext"; // Import the BookContext
import { useAuthContext } from "../context/useAuthContext";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../components/AddToCart";
import Select from "react-select";

const BookType = () => {
  const { books, fetchBooks, setBooks } = useBookContext(); // Use the BookContext
  let booksCopy = books;

  const genreOptions = [
    { value: "FICTION", label: "Fiction" },
    { value: "NON_FICTION", label: "Non-Fiction" },
    { value: "MYSTERY", label: "Mystery" },
    { value: "SCIENCE_FICTION", label: "Science Fiction" },
    { value: "FANTASY", label: "Fantasy" },
    { value: "ROMANCE", label: "Romance" },
  ];

  const handleFilterGenre = (selectedOptions) => {
    // console.log(selectedOptions);
    console.log(books);
    if (
      !selectedOptions ||
      (Array.isArray(selectedOptions) && selectedOptions.length == 0)
    ) {
      setBooks(booksCopy);
      return;
    }
    //This is filter by one element/genre
    if (selectedOptions.length==1) {
      console.log(
        books.filter((book)=>
        book.genres.includes(selectedOptions[0].value))
        );
    }

    // for (let index = 0; index < selectedOptions.length; index++) {
    //   const option = selectedOptions[index];
      
    // }
    // console.log(
      // selectedOptions.map(
      //   (option) =>
          // books.map((book) =>
          //   book.genres.map((genre)=>console.log(book.title,"||",genre))
            // .genres.filter((genre) => genre === 'NON_FICTION')
          // )
        // option.value==
      // )
    // );
    //This must call a method to change books shown(by use effect probs)
  };

  useEffect(() => {
    fetchBooks();
    booksCopy = books; // Fetch books when the component mounts
  }, []);

  const { user } = useAuthContext();
  const userID = user ? user.id : null;

  return (
    <section className="featured-books-container mb-5">
      <div className="book-container">
        <div className="title-container"></div>
        <div className="filter-container">
          <Select
            options={genreOptions}
            placeholder="Genre"
            closeMenuOnSelect={false}
            isMulti
            isClearable
            isSearchable
            onChange={handleFilterGenre}
            // onMenuClose={(options)=>console.log("||",options)}  //This must call a method to change books shown(by use effect probs)
            className="w-full rounded-md h-[30px] border-slate-600 outline-none"
            // styles={style1}
          />
        </div>
        <div className="featured-books py-12 gap-10 px-10 w-full">
          {books.map((book) => (
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
      <ToastContainer />
    </section>
  );
};

export default BookType;
