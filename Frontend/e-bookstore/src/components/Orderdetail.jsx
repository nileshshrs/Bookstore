import React from "react";

const Orderdetail = () => {
  // Sample order data
  const orderData = [
    {
      user: "John Doe",
      number: "123456",
      address: "123 Main St",
      book: "Book Title",
      quantity: 2,
      price: "$30.00",
      status: true, // true represents checked, false represents unchecked
    },
    // Add more data as needed
  ];

  return (
    <>
      <div className="container border-t ml-8 mt-8 mb-8" style={{ maxWidth: "900px" }}>
        <h3 className="font-bold text-gray-900 p-4" style={{ fontSize: "30px", fontFamily: "Prata", fontWeight: "700" }}>
          All Orders
        </h3>
        <hr className="border-t border-gray-450" />

        <div className="max-w-lg mx-auto rounded-md overflow-hidden shadow-lg" style={{ maxWidth: "900px", backgroundColor: "#edebe4" }}>
          <h2 className="text-lg font-medium text-gray-900 p-4">
            <span className="flex justify-between">
              <span>User</span>
              <span>Number</span>
              <span>Address</span>
              <span>Book</span>
              <span>Qnt</span>
              <span>Price</span>
              <span>Status</span>
            </span>
          </h2>

          {/* Render order data */}
          {orderData.map((order, index) => (
            <div key={index} className="p-4 border-b">
              <span className="flex justify-between">
                <span>{order.user}</span>
                <span>{order.number}</span>
                <span>{order.address}</span>
                <span>{order.book}</span>
                <span>{order.quantity}</span>
                <span>{order.price}</span>
                <span>
                  {/* Use input type checkbox for status */}
                  <input type="checkbox" checked={order.status} readOnly />
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orderdetail;
