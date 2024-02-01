import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../context/useAuthContext";
import { Link } from 'react-router-dom';


const Singlepagecart = () => {
  const { user } = useAuthContext();
  const userId = user ? user.id: null;
  const [cart, setCart] = useState([]);

  const handleIncreaseQuantity = async (cartId, quantity) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v2/carts/update/${cartId}`,
        { newQuantity: quantity + 1 }
      );
      if (response.status === 200) {
        fetchCart();
        // console.log("updated cart items");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };


  const handleDecreaseQuantity = async (cartId, quantity) => {
    if (quantity > 1) {
      try {
        const response = await axios.patch(
          `http://localhost:8080/api/v2/carts/update/${cartId}`,
          { newQuantity: quantity - 1 }
        );
        if (response.status === 200) {
          fetchCart();
          // console.log("updated cart items");
        }
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    }
  };
  
  const handleRemoveCartItem = async (cartId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v2/carts/delete/${cartId}`
      );
      if (response.status === 200) {
        fetchCart();
        // console.log("Deleted cart item");
      }
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };


  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v2/carts/get-by-user/${userId}`);
      res.data.sort((a,b)=>a.bookId-b.bookId);
      setCart(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

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
                  src={product.imagePath} // yo change garnu xa
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href="#">{product.title}</a>
                    </h3>
                    <p className="ml-4">${product.price}</p>
                  </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="text-indigo-600 hover:text-indigo-500"
                      onClick={()=>handleDecreaseQuantity(product.cartId,product.quantity)}
                    >
                      -
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      type="button"
                      className="text-indigo-600 hover:text-indigo-500"
                      onClick={()=>handleIncreaseQuantity(product.cartId,product.quantity)}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      className="font-medium  hover:text-indigo-500"
                      style={{ color: "black" }}
                      onClick={()=>handleRemoveCartItem(product.cartId)}
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
            <p>${cart.reduce((total, product) => total + product.total, 0).toFixed(2)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            "New books, new adventures. Happy reading!"
          </p>
          <div className="mt-6">
          <Link
            to="/order"  
            className="items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            style={{ backgroundColor: "black" }}
          >
            Checkout
          </Link>
        </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <Link to="/books">
            <p>

              <button
                type="button"
                className="font-medium text-black hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singlepagecart;