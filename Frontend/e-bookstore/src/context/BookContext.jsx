import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [singleBook, setSingleBook] = useState([]);
  const [slide, setSlide] = useState(false);
  const [error, setError] = useState(false); // Add error state
  const [errMsg, setErrMsg] = useState("");
  const url = "http://localhost:8080/api/v2/books/getAll";

  const fetchBooks = async () => {
    try {
      const response = await axios.get(url);
      setBooks(response.data);
      setError(null); // Reset error on successful fetch
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching books."); // Set error message
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); // Empty dependency array means this effect runs only once on mount

  const addBook = async (bookData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v2/books/add",
        bookData
      );

      // Assuming the response contains the newly added book data
      const newBook = response.data;

      // Update the state immediately after adding a new book
      setBooks((prevBooks) => [newBook, ...prevBooks]);

      // Fetch all data again after adding a new book
      // (this is optional depending on your requirements)
      fetchBooks();
      setError(null); // Reset error on successful add
    } catch (error) {
      console.error("Error adding book:", error);
      setError(true); // Set error message
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v2/books/delete/${bookId}`);

      // Update the state immediately after deleting a book
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));

      // Fetch all data again after deleting a book
      // (this is optional depending on your requirements)
      fetchBooks();
      setError(null); // Reset error on successful delete
    } catch (error) {
      console.error("Error deleting book:", error);
      setError(true); // Set error message
    }
  };
  const slideSidebar = () => {
    setSlide(!slide);
  };

  const getBookById = async (bookId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/books/${bookId}`
      );
      setSingleBook(response.data);
      slideSidebar();
      setError(null); // Reset error on successful fetch
    } catch (error) {
      console.error("Error fetching single book:", error);
      setError(true); // Set error message
    }
  };

  const updateBook = async (bookId, bookData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v2/books/edit/${bookId}`,
        bookData
      );

      // Assuming the response contains the updated book data
      const updatedBook = response.data;

      // Update the state immediately after updating a book
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === bookId ? updatedBook : book))
      );

      // Fetch all data again after updating a book
      // (this is optional depending on your requirements)
      fetchBooks();
      setError(null); // Reset error on successful update
    } catch (error) {
      console.error("Error updating book:", error);
      setError(true); // Set error message
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        fetchBooks,
        addBook,
        deleteBook,
        getBookById,
        singleBook,
        slideSidebar,
        slide,
        updateBook,
        error, // Add error to the context
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  return useContext(BookContext);
};
