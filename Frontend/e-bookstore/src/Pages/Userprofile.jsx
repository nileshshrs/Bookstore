import React, { useContext, useEffect, useState } from "react";
import Img1 from "../assets/icon.png";
import "../css/orderdetail.scss";
import { useAuthContext } from "../context/useAuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import ImgMale from "../assets/male.png";
import ImgFemale from "../assets/female.png";
import Cookies from "js-cookie";

const Userprofile = () => {
  const { user, setUser } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [currentAvatar, setCurrentAvatar] = useState("male"); // Default avatar is male
  const [activeTab, setActiveTab] = useState("UserProfile");
  const [userData, setUserData] = useState({ username: "", email: "", name: "" });
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({
    name: "",
  });
  

  useEffect(() => {
     // Retrieve the saved avatar from the cookie
     const savedAvatar = Cookies.get("userAvatar");
     if (savedAvatar) {
       setCurrentAvatar(savedAvatar);
     }

     const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:8080/api/v2/users/${user.id}`);
        const ordersResponse = await axios.get(`http://localhost:8080/api/v2/orders/user/${user.id}`);

        const fetchedUserData = userResponse.data;
        const userOrders = ordersResponse.data;

        setUserData(fetchedUserData);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);


  const toggleTab = () => {
    setActiveTab(activeTab === "UserProfile" ? "OrderDetail" : "UserProfile");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setEditedValues({
      name: userData.name,
    });
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const data = {
        name: editedValues.name,
      };

      const response = await axios.patch(`http://localhost:8080/api/v2/users/edit/${user.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const updatedUserData = response.data;
      setUserData(updatedUserData);
      setEditMode(false);

      setUser(updatedUserData);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };
  const toggleAvatar = () => {
    const newAvatar = currentAvatar === "male" ? "female" : "male";
    setCurrentAvatar(newAvatar);
    // Save the selected avatar to the cookie
    Cookies.set("userAvatar", newAvatar);
  };
  

  
  return (
    <div className="flex items-center justify-center flex-col sm:flex-row">
      {activeTab === "UserProfile" && (
        <div className="w-full p-4 sm:p-8 mt-4 mb-4 sm:w-1/2 lg:w-1/3 xl:w-1/4" style={{ maxWidth: "500px" }}>
          <div className="rounded shadow p-4 sm:p-6">
            <img
              src={currentAvatar === "male" ? ImgMale : ImgFemale}
              alt="User"
              className="mx-auto mb-3 h-16 w-16 rounded-full object-cover"
            />
          <button
            className="border px-3 py-2 mb-2 border-black bg-black text-white font-semibold rounded-md text-sm"
            onClick={toggleAvatar}
            style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}
          >
            Change Avatar
          </button>

          
            <h2 className="font-bold mb-4 text-[15px] text-center">Hi, {userData.username}</h2>
          
           
            <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">
              Name
            </label>
            <input
              name="name"
              className="border-2 rounded-r px-4 py-2 w-full"
              type="text"
              value={editMode ? editedValues.name : userData.name}
              onChange={handleInputChange}
              disabled={!editMode}
            />
            {/* Display email, but disable editing */}
            <label htmlFor="email" className="font-semibold text-gray-700 block pb-1">
              Username
            </label>
            <input
              name="username"
              className="border-2 rounded-r px-4 py-2 w-full"
              type="text"
              value={userData.username}
              disabled
            />
            <label htmlFor="email" className="font-semibold text-gray-700 block pb-1">
              Email
            </label>
            <input
              name="email"
              className="border-2 rounded-r px-4 py-2 w-full"
              type="email"
              value={userData.email}
              disabled
            />
            {editMode ? (
              <button
                className="border ml-3 px-3 py-2 mt-4 border-black bg-black text-white font-semibold rounded-md text-sm"
                onClick={handleSaveClick}
              >
                Save
              </button>
            ) : (
              <button
                className="border px-3 py-2 mt-4 border-black bg-black text-white font-semibold rounded-md text-sm"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
            <Link to="/forgotpass">
              <button
                className="border px-3 py-2 mt-4 ml-2 border-black bg-black text-white font-semibold rounded-md text-sm"
              >
                Change password
              </button>
            </Link>

            
          </div>
        </div>
      )}

      
{activeTab === "OrderDetail" && (
        <div className="w-full container border-t mt-8 mb-8 sm:w-full lg:w-2/3 xl:w-3/4 mx-auto">
          <h3 className="font-bold text-gray-900 text-3xl mb-6">Your Orders</h3>
          <div className="max-w-4xl mx-auto rounded-md shadow-lg overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 whitespace-nowrap">Order ID</th>
                  <th className="py-2 px-4 whitespace-nowrap">User</th>
                  <th className="py-2 px-4 whitespace-nowrap">Number</th>
                  <th className="py-2 px-4 whitespace-nowrap">Address</th>
                  <th className="py-2 px-4 whitespace-nowrap">Book</th>
                  <th className="py-2 px-4 whitespace-nowrap">Qnt</th>
                  <th className="py-2 px-4 whitespace-nowrap">Price</th>
                  <th className="py-2 px-4 whitespace-nowrap">Status</th>
                  <th className="py-2 px-4 whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td className="py-2 px-4 whitespace-nowrap">{order.orderId}</td>
                    <td className="py-2 px-4 whitespace-nowrap">{order.username}</td>
                    <td className="py-2 px-4 whitespace-nowrap">{order.contact}</td>
                    <td className="py-2 px-4 whitespace-nowrap">{order.shippingAddress}</td>
                    <td className="py-2 px-4 whitespace-nowrap">{order.bookTitle}</td>
                    <td className="py-2 px-4 whitespace-nowrap">{order.quantity}</td>
                    <td className="py-2 px-4 whitespace-nowrap">${order.totalPrice}</td>
                    <td className="py-2 px-4 whitespace-nowrap">{order.status ? "Completed" : "Pending"}</td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      <button className="action-button rounded text-white bg-black p-1">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="absolute top-0 right-0 p-4 mt-12">
        <button
          className="border px-3 py-2 border-black bg-black text-white font-semibold rounded-md text-sm"
          onClick={toggleTab}
        >
          {activeTab === "UserProfile" ? "Order Detail" : "User Profile"}
        </button>
      </div>
    </div>
  );
};

export default Userprofile;