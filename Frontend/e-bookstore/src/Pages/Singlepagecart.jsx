import React, { useState, useEffect } from "react";
import axios from "axios";
import ImgSecrets from "../assets/product-item6.jpg";
import { useAuthContext } from "../context/useAuthContext";

const Singlepagecart = () => {
  const { user } = useAuthContext();
  const userID = user.id
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v2/carts/get-by-user/${userID}`);
      setCart(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userID]);

  return (
    <div className="container mx-auto mt-8 mb-8" style={{ maxWidth: "900px" }}>
      <div className="max-w-lg mx-auto rounded-md overflow-hidden shadow-lg" style={{ maxWidth: "900px", backgroundColor: "#edebe4" }}>
        <h2 className="text-lg font-medium text-gray-900 p-4">
          Thank you for choosing us :)
        </h2>

        <div className="max-h-[300px] overflow-y-auto py-4 pl-2 pr-2">
          {cart.map((product) => (
            <div key={product.id} className="flex mb-3">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={ImgSecrets} // yo change garnu xa
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">{product.name}</a>
                    </h3>
                    <p className="ml-4">${product.price}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="text-indigo-600 hover:text-indigo-500"
                      onClick={handleDecreaseQuantity}
                    >
                      -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      type="button"
                      className="text-indigo-600 hover:text-indigo-500"
                      onClick={handleIncreaseQuantity}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium  hover:text-indigo-500"
                      style={{ color: "black" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${cart.reduce((total, product) => total + product.price * quantity, 0)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            "New books, new adventures. Happy reading!"
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              style={{ backgroundColor: "black" }}
            >
              Checkout
            </a>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              <button
                type="button"
                className="font-medium text-black hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singlepagecart;
