import React, { useContext, useEffect, useState } from "react";
import Img1 from "../assets/icon.png";
import "../css/orderdetail.scss";
import { useAuthContext } from "../context/useAuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import ImgMale from "../assets/male.png";
import ImgFemale from "../assets/female.png";


const Userprofile = () => {
  const { user, setUser } = useAuthContext();
  const [currentAvatar, setCurrentAvatar] = useState("male"); // Default avatar is male
  const [activeTab, setActiveTab] = useState("UserProfile");
  const [userData, setUserData] = useState({ username: "", email: "", name: "" });
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({
    name: "",
  });
  

  useEffect(() => {
    // Fetch user data from localStorage or context/state
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      setUserData({
        username: storedUserData.username,
        email: storedUserData.email,
      });
    }
  }, []);
  

  //tab view
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
  // const toggleAvatar = () => {
  //   const newAvatar = currentAvatar === "male" ? "female" : "male";
  //   setCurrentAvatar(newAvatar);
  //   // Save the selected avatar to the cookie
  //   Cookies.set("userAvatar", newAvatar);
  // };
  

  
  return (
    <div className="flex items-center justify-center flex-col sm:flex-row">
      {activeTab === "UserProfile" && (
        <div
          className="w-full p-4 sm:p-8 mt-4 mb-4 sm:w-1/2 lg:w-1/3 xl:w-1/4"
          style={{ maxWidth: "500px" }}
        >
          <div className="rounded shadow p-4 sm:p-6">
            <img
              src={currentAvatar === "male" ? ImgMale : ImgFemale}
              alt="User"
              className="mx-auto mb-3 h-16 w-16 rounded-full object-cover"
            />
            <h2 className="font-bold mb-4 text-[15px] text-center">Hi, {userData.username}</h2>
            <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">
              Username
            </label>
            <div className="flex">
              <input
                disabled
                id="username"
                className="border-2 rounded-r px-4 py-2 w-full"
                type="text"
                value={userData.username}
              />
            </div>
            <label htmlFor="about" className="font-semibold text-gray-700 block pb-1">
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
          <h3 className="font-bold text-gray-900 text-3xl mb-6">Your Order</h3>
          <div className="max-w-4xl mx-auto rounded-md shadow-lg overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
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
                <tr>
                  <td className="py-2 px-4 whitespace-nowrap">Bibhakta</td>
                  <td className="py-2 px-4 whitespace-nowrap">9813056161</td>
                  <td className="py-2 px-4 whitespace-nowrap">kalanki</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <select className="bg-gray-200 p-1">
                      <option value="">The earth</option>
                      <option value="">The Nature</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">2</td>
                  <td className="py-2 px-4 whitespace-nowrap">$20</td>
                  <td className="py-2 px-4 whitespace-nowrap">status</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    <button className="action-button rounded text-white bg-black p-1">
                      Delete
                    </button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
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
