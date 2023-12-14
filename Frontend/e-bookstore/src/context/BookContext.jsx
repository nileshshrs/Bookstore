import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const url = "http://localhost:8080/api/v2/books/getAll";

  const fetchBooks = async () => {
    try {
      const response = await axios.get(url);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <BookContext.Provider value={{ books, fetchBooks, addBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  return useContext(BookContext);
};
