import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/useAuthContext";
import axios from "axios";

const CartList = () => {
  const { user } = useAuthContext();
  const userId = user.id;

  const [cart, setCart] = useState([]);

  const handleIncreaseQuantity = async (cartId, quantity) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/v2/carts/update/${cartId}`,
        { newQuantity: quantity + 1 }
      );
      if (response.status === 200) {
        fetchCart();
        console.log("updated cart items");
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
          console.log("updated cart items");
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
        console.log("Deleted cart item");
      }
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v2/carts/get-by-user/${userId}`
      );
      response.data.sort((a, b) => a.bookId - b.bookId);
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  return (
    <ul role="list" className="-my-6 divide-y divide-gray-200">
      {cart.map((cartItem) => (
        <li className="flex py-6" key={cartItem.id}>
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              src={cartItem.imagePath}
              alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <a href="#">{cartItem.title}</a>
                </h3>

                <p className="ml-4">${cartItem.total}</p>
              </div>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <div className="flex items-center">
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-500"
                  onClick={() =>
                    handleDecreaseQuantity(cartItem.cartId, cartItem.quantity)
                  }>
                  -
                </button>

                <span className="mx-2">{cartItem.quantity}</span>

                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-500"
                  onClick={() =>
                    handleIncreaseQuantity(cartItem.cartId, cartItem.quantity)
                  }>
                  +
                </button>
              </div>

              <div className="flex">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={()=>handleRemoveCartItem(cartItem.cartId)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
