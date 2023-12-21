// AddtocardContext.js
import React, { createContext, useState, useEffect } from "react";

export const AddtocardContext = createContext();

export const AddtocardProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Functions to interact with the backend API
  const addToCart = async (cartData) => {
    // Make a call to your backend API to add item to the cart
    // Example: axios.post('/api/cart', item);
    // Update cartItems state based on the response
    try {
      const res = await axios.post("", cartData)
      const newCartData = res.data;
    }catch(err) {
      console.error(err);
  };

  const removeFromCart = async (itemId) => {
    // Make a call to your backend API to remove item from the cart
    // Example: axios.delete(`/api/cart/${itemId}`);
    // Update cartItems state based on the response
  };

  const fetchCartItems = async () => {
    setIsLoading(true);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCartItems();
  }, []); 

 
  return (
    <AddtocardContext.Provider value={{
      fetchCartItems,
      removeFromCart,
      newCartData,
      AddtocardContext,


    }}>
      {children}
    </AddtocardContext.Provider>
  );
};