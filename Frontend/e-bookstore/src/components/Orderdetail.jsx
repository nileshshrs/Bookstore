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
        if(res.status===200){
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
  }, [  ]);

  return (
    <>
      <div
        className="container border-t ml-8 mt-8 mb-8"
        style={{ maxWidth: "900px" }}>
        <h3
          className="font-bold text-gray-900 p-2 mb-6"
          style={{ fontSize: "30px", fontFamily: "Prata", fontWeight: "700" }}>
          Order Detail
        </h3>

        <div
          className="max-w-lg mx-auto rounded-md shadow-lg table-container"
          style={{ maxWidth: "900px", backgroundColor: "#edebe4" }}>
          <table
            className="w-full ml-4"
            style={{
              fontFamily: "Prata",
              fontWeight: "100",
              fontSize: "15px",
            }}>
            <thead>
              <tr>
                <th className="p-2">User</th>
                <th className="p-2">Payment</th>
                <th className="p-2">Address</th>
                <th className="p-2">Book</th>
                <th className="p-2">Qnt</th>
                <th className="p-2">TotalPrice</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td style={{ paddingBottom: "20px" }}>{order.username}</td>
                  <td style={{ paddingBottom: "20px" }}>{order.paymentMethod}</td>
                  <td style={{ paddingBottom: "20px" }}>
                    {order.shippingAddress}
                  </td>
                  <td style={{ paddingBottom: "20px" }}>
                    {/* <select style={{ backgroundColor: "#edebe4" }}>
                    <option value="" style={{ backgroundColor: "#edebe4" }}>The earth</option>
                    <option value="" style={{ backgroundColor: "#edebe4" }}>The Nature</option>
                  </select> */}
                    {order.bookTitle}
                  </td>
                  <td style={{ paddingBottom: "20px",textAlign:"center"}}>{order.quantity}</td>
                  <td style={{ paddingBottom: "20px",textAlign:"center"}}>{order.totalPrice}</td>
                  <td style={{ paddingBottom: "20px" }}>
                    {order.status === true? "Completed" : "Pending"}
                  </td>
                  <td style={{ paddingBottom: "20px" }}>
                    <button className="action-button rounded text-white bg-black p-1 w-12 mr-2">
                      Edit
                    </button>
                    <button
                className="action-button rounded text-white bg-black p-1 w-auto"
                onClick={() => handleDeleteClick(order.orderId)}>
                Delete
              </button>
                  
                    <button
                      className="action-button rounded text-white bg-black p-1 w-auto"
                      onClick={() => handleCompleteClick(order)}>
                      {order.status === true? "Complete" : "Pending"}
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
