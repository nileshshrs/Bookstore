import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/orderdetail.scss";

const Orderdetail = () => {
  // const [status, setStatus] = useState("Pending");
  const [orders, setOrders] = useState([]);
  const [statusbtn, setStatusbtn] = useState("Complete");

  const handleDeleteClick = async (orderId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/v2/orders/delete/${orderId}`
      );

      if (res.status === 200) {
        fetchOrders(); // Refresh the orders after deletion
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleCompleteClick = async (order) => {
    try {
      const res = await axios.patch(
        `http://localhost:8080/api/v2/orders/update/${order.orderId}`,
        {
          status: !order.status,
        }
      );
      if (res.status === 200) {
        fetchOrders();
        console.log("what");
      }
      console.log(order.status);
      console.log(order.orderId);
      setStatusbtn(statusbtn === "Complete" ? "Pending" : "Complete");
    } catch (e) {
      console.error("Error updating", e);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v2/orders/all");
      res.data.sort((a, b) => a.orderId - b.orderId);
      setOrders(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
    <div className="container-fluid border-t w-full">
      <h3 className="font-bold text-gray-900 text-3xl p-2 mb-6">
        Order Detail
      </h3>
  
      <div className="w-[95%] mx-auto rounded-md shadow-lg overflow-x-auto bg-gray-100">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 whitespace-nowrap">User</th>
              <th className="py-2 px-4 whitespace-nowrap">Payment</th>
              <th className="py-2 px-4 whitespace-nowrap">Address</th>
              <th className="py-2 px-4 whitespace-nowrap">Book Title</th>
              <th className="py-2 px-4 whitespace-nowrap">Quantity</th>
              <th className="py-2 px-4 whitespace-nowrap">Total Price</th>
              <th className="py-2 px-4 whitespace-nowrap">Status</th>
              <th className="py-2 px-4 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="py-2 px-4 whitespace-nowrap text-[12px] font-semibold">{order.username}</td>
                <td className="py-2 px-4 whitespace-nowrap text-[12px] font-semibold">{order.paymentMethod}</td>
                <td className="py-2 px-4 whitespace-nowrap text-[12px] font-semibold">{order.shippingAddress}</td>
                <td
                  className="py-2 px-4 whitespace-nowrap text-[12px] font-semibold"
                  style={{ minWidth: `${order.bookTitle.length * 8}px` }}
                >
                  {order.bookTitle}
                </td>
                <td className="py-2 px-4 text-center whitespace-nowrap text-[12px] font-semibold">{order.quantity}</td>
                <td className="py-2 px-4 text-start whitespace-nowrap text-[12px] font-semibold">$ {" "}{order.totalPrice}</td>
                <td className="py-2 px-4 whitespace-nowrap text-[12px] font-semibold">
                  {order.status ? "Completed" : "Pending"}
                </td>
                <td className="py-2 px-4 flex gap-2 items-center justify-center">
                  <button
                    className="action-button rounded text-white bg-black px-2 py-2 w-[100px] text-[10px] font-semibold"
                    onClick={() => handleDeleteClick(order.orderId)}
                  >
                    Delete
                  </button>
                  <button
                    className={`action-button rounded text-white text-[10px] w-[100px] py-2 bg-black font-semibold bg-${
                      order.status ? "green" : "orange"
                    }`}
                    onClick={() => handleCompleteClick(order)}
                  >
                    {order.status ? "Order Complete" : "Completed"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  
  );
};

export default Orderdetail;
