import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import img1 from "../assets/main-banner1.jpg";
import img2 from "../assets/main-banner2.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";
const Carousels = () => {
  return (
    <section className="mb-5 bg-[#EDEBE4]">
      <Carousel slide={true} interval={3000} indicators={false} controls={false} className="mb-5">
        <Carousel.Item>
          <div className="flex gap-5 m-auto w-[70%] justify-center items-center min-h-[80vh]">
            <div className="flex flex-col gap-2 justify-center items-start">
              <h2 className="heading">Life of the Wild</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores odit perferendis atque at incidunt cum aut adipisci
                voluptate, sapiente doloremque?
              </p>
              <Link to="">
                <button>
                  Read more <FaLongArrowAltRight />
                </button>
              </Link>
            </div>
            <div>
              <img src={img1} alt="" />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="flex gap-5 m-auto w-[70%] justify-center items-center min-h-[80vh]">
            <div className="flex flex-col gap-2 justify-center items-start">
              <h2 className="heading">Birds Gonna Be Happy</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores odit perferendis atque at incidunt cum aut adipisci
                voluptate, sapiente doloremque?
              </p>
              <Link to="">
                <button>
                  Read more <FaLongArrowAltRight />
                </button>
              </Link>
            </div>
            <div>
              <img src={img2} alt="" />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default Carousels;
