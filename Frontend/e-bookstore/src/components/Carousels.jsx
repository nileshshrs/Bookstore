import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useBookContext } from "../context/BookContext";

const Carousels = () => {
  const { books } = useBookContext();

  // Check if books are not yet fetched
  if (!books || books.length === 0) {
    // Return null or a placeholder
    return null; // You can also return a loading state or placeholder component
  }

  const getRandomBooks = (count) => {
    const randomBooks = [];
    while (randomBooks.length < count) {
      const randomIndex = Math.floor(Math.random() * books.length);
      const randomBook = books[randomIndex];

      if (!randomBooks.includes(randomBook)) {
        randomBooks.push(randomBook);
      }
    }

    return randomBooks;
  };

  const [randomBook1] = getRandomBooks(2);
  const [randomBook3] = getRandomBooks(2);

  return (
    <section className="mb-5 bg-[#EDEBE4] carousel">
      <Carousel
        slide={true}
        interval={3000}
        indicators={false}
        controls={false}
        className="mb-5"
      >
        <Carousel.Item>
          <div
            className="flex gap-5 m-auto w-[70%] justify-center items-center min-h-[80vh] carousel-items"
            style={{ height: "500px" }}
          >
            <div className="flex flex-col gap-2 justify-center items-start">
              <h2 className="heading capitalize">{randomBook1?.title}</h2>
              <p className="min-w-[540px]">{randomBook1?.description}</p>
              <Link to={`/books/${randomBook1?.bookId}`}>
                <button>
                  Read more <FaLongArrowAltRight />
                </button>
              </Link>
            </div>
            <div>
              <img
                src={randomBook1?.imagePath}
                alt=""
                className="h-[500px] min-w-[345px] object-cover"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div
            className="flex gap-5 m-auto w-[70%] justify-center items-center min-h-[80vh] carousel-items"
            style={{ height: "500px" }}
          >
            <div className="flex flex-col gap-2 justify-center items-start">
              <h2 className="heading capitalize">{randomBook3?.title}</h2>
              <p className="min-w-[540px]">{randomBook3?.description}</p>
              <Link to={`/books/${randomBook3?.bookId}`}>
                <button>
                  Read more <FaLongArrowAltRight />
                </button>
              </Link>
            </div>
            <div>
              <img
                src={randomBook3?.imagePath}
                alt=""
                className="h-[500px] min-w-[345px] object-cover"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default Carousels;
