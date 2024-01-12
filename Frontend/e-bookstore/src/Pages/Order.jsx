import React, { useState, useEffect } from "react";
import Khalti from "../assets/khalti.png";
import { useAuthContext } from "../context/useAuthContext";
import axios from "axios";

const Order = () => {
  const { user } = useAuthContext();
  const userId = user ? user.id : null;
  // const cartId =cart? cart.id:null;
  const [cart, setCart] = useState([]);
  
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    phoneNumber: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery"); // Default to Cash on Delivery

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const saveShippingInfo = async () => {
    const data ={
      cartItems: cart,
      //real time and date
      orderDate:1641753000000,
      address: shippingInfo.address,
      phoneNumber: shippingInfo.phoneNumber,
      paymentMethod:"khalti"
    }
    console.log(data)
    try {
      const response = await axios.post(`http://localhost:8080/api/v2/orders/create`, data);

      if (response.status >= 200 && response.status < 300) {
        console.log("Shipping info saved successfully!");
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      console.error("Error saving shipping info:", error.message);
    }
  };

  const placeOrder = async () => {
    // Additional logic for placing the order (e.g., updating inventory, sending confirmation email, etc.)
    console.log("Placing order...");
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v2/carts/get-by-user/${userId}`);
      res.data.sort((a, b) => a.bookId - b.bookId);
      setCart(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  },[]);

  return (
    <div className="container border-t mx-auto mt-8 mb-8" style={{ maxWidth: "800px" }}>
      <h3 className="font-bold text-gray-900 p-4" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: "30px" }}>
        1. Order Summary
      </h3>
      <hr className="border-t border-gray-450" />

      <div className="max-w-lg mx-auto rounded-md overflow-hidden shadow-lg" style={{ maxWidth: "900px", backgroundColor: "#edebe4" }}>
        <h2 className="text-lg font-medium text-gray-900 p-4">
          <span className="flex justify-between">
            <span>Your Books</span>
            <span>Quantity</span>
            <span>Price</span>
          </span>
        </h2>

        <div className="max-h-[200px] overflow-y-auto pl-2 pr-2" style={{ overflowY: "hidden" }}>
          <div className="flex mb-3">
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                {cart.map((product, index) => (
                  <div key={`product-${product.id}-${index}`} className="flex justify-between text-base font-medium text-gray-900">




                    <p>{truncateText(product.title, 10)}</p>
                    <p className="pl-2">{product.quantity}</p>
                    <p style={{ marginRight: "18px" }}>$ {product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-450" />

        <h3 className="text-lg font-bold text-gray-900 p-4">2. Shipping Information</h3>
        <hr className="border-t border-gray-450" />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveShippingInfo();
          }}
          className="p-4 flex flex-col md:flex-row justify-between"
        >
          <input
            type="text"
            required
            placeholder="Address"
            className="rounded h-8 w-full md:w-1/2 md:h-12 p-2 border mb-2 md:mb-0 ml-3"
            name="address"
            value={shippingInfo.address}
            onChange={handleInputChange}
          />
          <input
            type="number"
            required
            placeholder="Phone Number"
            className="rounded h-8 w-full md:w-1/2 md:h-12 p-2 border ml-3"
            name="phoneNumber"
            value={shippingInfo.phoneNumber}
            onChange={handleInputChange}
          />
          <button type="submit" className="ml-6 px-3 py-2 rounded text-white bg-black hover:bg-indigo-700">
            Save and Continue
          </button>
        </form>

        <hr className="border-t border-gray-450 mt-4" />

        <h3 className="text-lg font-bold text-gray-900 p-4" id="payment">
          3. Payment Method
        </h3>
        <hr className="border-t border-gray-450" />

        <div className="flex mt-4 p-2">
          <div className="px-2">
            <label htmlFor="type1" className="flex items-center cursor-pointer">
              <input type="radio" className="form-radio h-5 w-5 text-indigo-500 mr-2" name="type1" defaultChecked />
              Cash on Delivery
            </label>
          </div>

          <div className="px-2">
            <label htmlFor="type2" className="flex items-center cursor-pointer">
              <input type="radio" className="form-radio h-5 w-5 text-indigo-500" name="type2" />
              <img src={Khalti} className="h-8 ml-3" alt="Type 2" />
            </label>
          </div>
        </div>

        <button type="submit" className="ml-6 px-2 py-2 mt-2 rounded text-white bg-black hover:bg-indigo-700">
          Confirm Payment Method
        </button>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Shipping Fee</p>
            <p>$300</p>
          </div>

          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ {cart.reduce((total, product) => total + product.total, 0).toFixed(2)}</p>
          </div>

          <p className="mt-0.5 text-sm text-gray-500">
            "Thank you for choosing us!"
          </p>

          <button
        onClick={() => {
          saveShippingInfo();
          placeOrder();
        }}
        className="mt-6"
      >
        <a href="#" className="items-center justify-center rounded-md border border-transparent px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700" style={{ backgroundColor: "black" }}>
          Place Order
        </a>
      </button>
        </div>
      </div>
    </div>
  );
};

export default Order;