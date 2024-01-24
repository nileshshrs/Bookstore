import React, { useState, useEffect } from "react";
import Khalti from "../assets/khalti.png";
import { useAuthContext } from "../context/useAuthContext";
import axios from "axios";
import Payment from "../components/Payment";

const Order = () => {
  const { user } = useAuthContext();
  const userId = user ? user.id : null;
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "paymentMethod") {
      setPaymentMethod(value);
    }
  };

  const saveShippingInfo = async () => {
    if (contact === "" || address == "") {
      setError("shipping info cannot be empty");
    } else {
      const data = {
        cartItems: cart,
        orderDate: Date.now(),
        address: address,
        phoneNumber: contact,
        paymentMethod: paymentMethod,
      };
      console.log(data);

      try {
        const response = await axios.post(
          `http://localhost:8080/api/v2/orders/create`,
          data
        );

        if (response.status >= 200 && response.status < 300) {
          console.log("Shipping info saved successfully!");
          try {
            const url = `http://localhost:8080/api/v2/carts/deleteByUserId/${userId}`;
            const res = await axios.delete(url);
            console.log(res.data);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.error("Unexpected status code:", response.status);
        }
      } catch (error) {
        console.error("Error saving shipping info:", error.message);
      }
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v2/carts/get-by-user/${userId}`
      );
      res.data.sort((a, b) => a.bookId - b.bookId);
      setCart(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Calculate subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Shipping cost
  const shippingCost = 20;
  const total = subtotal + shippingCost;

  return (
    <section className="py-5 ">
      <div className="w-[80%] flex flex-col md:w-[80%] sm:w-full sm:px-1 md:flex-row mx-auto border items-center justify-center shadow-lg rounded-md">
        <div className="sm:px-2 w-full  md:w-2/3 py-5 sm:py-5 lg:px-9 lg:py-4 ">
          <h3 className="text-2xl font-bold font-[Prata] mb-4">
            Shopping Cart
          </h3>
          <div className="h-[500px] mx-auto overflow-y-auto bg-[#f3f4f6] px-3 max-w-[525px] border border-black rounded-md shadow-lg">
            {cart.map((item) => (
              <div
                key={item.bookId}
                className="flex flex-col md:flex-row justify-between items-start border-b py-4 md:py-3"
              >
                <div className="flex items-center mb-2 md:mb-0">
                  <img
                    src={item.imagePath}
                    alt={item.title}
                    className="w-16 h-24 object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-md font-bold mb-1 capitalize">
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-sm font-semibold">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-md font-bold sm:py-0 md:py-0 py-3">
                  ${item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full  md:w-2/3  p-5 flex flex-col gap-3 items-start justify-start h-full">
          <h3 className="text-2xl font-semibold font-[Prata] mb-4">Checkout</h3>
          <div className="flex flex-col w-[80%] mx-auto">
            <div className="text-[firebrick] bg-[pink] text-center font-semibold mb-2">
              {error}
            </div>
            <div className="flex flex-col items-start justify-center gap-5 w-full">
              <div className="flex flex-col gap-3 w-full mx-auto">
                <h4 className="font-bold text-md">Shipping Information</h4>
                <input
                  type="text"
                  placeholder="address"
                  className="text-sm w-full h-[28px] px-2 rounded-[3px] font-semibold outline-0 border border-black"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                <input
                  type="number"
                  placeholder="contact"
                  className="text-sm w-full h-[28px] px-2 rounded-[3px] font-semibold outline-0 border border-black"
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-[80%] mx-auto">
            <h4 className="font-bold text-md mb-2">Order Summary</h4>
            <div className="flex justify-between mb-2 gap-4">
              <span className="font-bold text-sm">Subtotal:</span>
              <span className="font-bold text-xs">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 gap-4">
              <span className="font-bold text-sm">Shipping Cost:</span>
              <span className="font-bold text-xs">
                ${shippingCost.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2 gap-4">
              <span className="font-bold text-sm">Total:</span>
              <span className="font-bold text-xs">${total.toFixed(2)}</span>
            </div>
          </div>
          {/* Add your checkout form or summary here */}
          <div className="flex flex-col gap-2 w-[80%] mx-auto">
            <h4 className="font-bold text-md">Payment Method</h4>
            <div className="flex py-2 justify-between items-center">
              <div className="flex items-center justify-center">
                <input
                  type="radio"
                  className="form-radio h-3 text-indigo-500 mr-2"
                  name="paymentMethod"
                  value="cashOnDelivery"
                  checked={paymentMethod === "cashOnDelivery"}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="cashOnDelivery"
                  className="flex items-center cursor-pointer text-sm font-bold"
                >
                  Cash on Delivery
                </label>
              </div>
              <div className="px-2 flex items-center justify-center">
                <input
                  type="radio"
                  className="form-radio h-3 text-indigo-500"
                  name="paymentMethod"
                  value="khalti"
                  checked={paymentMethod === "khalti"}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="khalti"
                  className="flex items-center cursor-pointer"
                >
                  <img src={Khalti} className="h-8 ml-3" alt="Khalti" />
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-[80%] mx-auto items-center justify-center p-3">
            {paymentMethod === "khalti" ? (
              <Payment
                cart={cart}
                address={address}
                contact={contact}
                paymentMethod={paymentMethod}
                total={total}
                setError={setError}
              />
            ) : (
              <button
                className="text-xs bg-black text-white py-2 px-3 rounded-[3px] font-semibold"
                onClick={saveShippingInfo}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
