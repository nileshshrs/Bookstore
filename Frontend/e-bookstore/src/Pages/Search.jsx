import React from "react";
import { useParams } from "react-router-dom";

const Search = () => {
  const params = useParams();
  console.log(params);
  return (
    <section className="featured-books-container mb-5">
      <div className="book-container">
        <div className="title-container"></div>
        <div className="featured-books py-12 gap-10 px-10 w-full">
          <div>{params.searchKey}</div>
        </div>
      </div>
    </section>
  );
};

export default Search;
