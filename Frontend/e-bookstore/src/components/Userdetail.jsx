import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineDelete } from "react-icons/ai";

import "../css/orderdetail.scss";

const Userdetail = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    roles: "admin", // Default role as "user"
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [activeTab, setActiveTab] = useState("UserDetails"); // Default active tab

  useEffect(() => {
    fetchUserDetails();
  }, []); // Initial fetch on component mount

  const fetchUserDetails = () => {
    axios
      .get("http://localhost:8080/api/v2/users/all")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear validation errors on input change
    setValidationErrors({
      ...validationErrors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Validate username
    if (formData.username.length < 4) {
      isValid = false;
      errors.username = "Username must be at least 4 characters long";
    }

    // Validate name
    if (formData.name.length < 2) {
      isValid = false;
      errors.name = "Name must be at least 2 characters long";
    }

    // Validate email
    if (!formData.email.includes("@") || !formData.email.endsWith("gmail.com")) {
      isValid = false;
      errors.email = "Email must contain '@' and end with 'gmail.com'";
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      isValid = false;
      errors.password = "Password must be 8 characters with one lowercase, one uppercase, and one number";
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // If the form is not valid, do not submit
      return;
    }

    // Replace the URL with your actual registration API endpoint
    const registrationApiUrl = "http://localhost:8080/api/v2/users/register";

    axios
      .post(registrationApiUrl, formData)
      .then((response) => {
        // Handle successful registration
        toast.success("User created successfully");
        // Clear form fields
        setFormData({
          username: "",
          name: "",
          email: "",
          password: "",
          roles: "admin",
        });
        // Refresh user table
        fetchUserDetails();
      })
      .catch((error) => {
        // Handle registration error
        toast.error("Error creating user");
        console.error("Error registering user:", error);
      });
  };

  const handleRoleChange = (userId, newRole) => {
    // Replace the URL with your actual API endpoint for updating user roles
    const updateRolesApiUrl = `http://localhost:8080/api/v2/users/edit/${userId}`;

    // Make an API call to update user roles
    axios
      .patch(updateRolesApiUrl, { roles: newRole })
      .then((response) => {
        // Handle successful role change
        toast.success(`Roles updated successfully`);
        // Refresh user table
        fetchUserDetails();
      })
      .catch((error) => {
        // Handle role change error
        toast.error(`Error updating roles`);
        console.error(`Error updating roles for user`, error);
      });
  };

//delete user
  const handleDeleteUser = async (userId) => {
    try {
      // Make an API call to delete the user
      const response = await axios.delete(`http://localhost:8080/api/v2/users/delete/${userId}`);

      // Handle successful deletion
      toast.success(response.data);

      // Refresh user table
      fetchUserDetails();
    } catch (error) {
      // Handle deletion error
      toast.error("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  const toggleTab = () => {
    setActiveTab(activeTab === "UserDetails" ? "CreateUser" : "UserDetails");
  };

  
  return (
    <div className="flex flex-col md:flex-row">
      {/* User Details Section */}
      {activeTab === "UserDetails" && (
        <div className="w-full md:w-6/10 container border-t mb-8" style={{ maxWidth: "80%" }}>
          <h3 className="font-bold text-gray-900 p-2 mb-6 mt-8" style={{ fontSize: "30px", fontFamily: "Prata", fontWeight: "700" }}>
            User Details
          </h3>

          <div className="max-w-lg rounded-md shadow-lg table-container" style={{ maxWidth: "100%" }}>
            <table className="w-full " style={{ fontFamily: "Prata", fontWeight: "100", fontSize: "15px" }}>
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 whitespace-nowrap">Username</th>
                  <th className="px-4 whitespace-nowrap">Name</th>
                  <th className="px-4 whitespace-nowrap">Email</th>
                  <th className="px-4 whitespace-nowrap">Roles</th>
                  <th className="px-4 whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.sort((a, b) => a.id - b.id).map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 whitespace-nowrap" style={{ paddingBottom: "20px" }}>{user.username}</td>
                    <td className="py-2 px-4 whitespace-nowrap" style={{ paddingBottom: "20px" }}>{user.name}</td>
                    <td className="py-2 px-4 whitespace-nowrap" style={{ paddingBottom: "20px" }}>{user.email}</td>
                    <td className="py-2 px-4 whitespace-nowrap" style={{ paddingBottom: "20px" }}>{user.roles}</td>
                    <td className="py-2 px-4 whitespace-nowrap" style={{ paddingBottom: "20px" }}>
                      <button
                        className="action-button rounded text-white bg-black p-1 w-18 mr-2"
                        onClick={() => handleRoleChange(user.id, user.roles === 'admin' ? 'users' : 'admin')}
                      >
                        Change roles
                      </button>
                      <button
                        className="action-button rounded text-white bg-black p-1 w-18"
                        onClick={() => handleDeleteUser(user.id)}
                      >
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

      {/* Create User Section */}
      {activeTab === "CreateUser" && (
     <div className=" sm:w-3/5 lg:w-3/5  mx-auto my-10" style={{maxWidth:"450px"}}>
      
     <div className="rounded shadow p-4 sm:p-6">
      
       <h3 className="font-bold text-gray-900 mb-6 text-2xl font-prata">
         Create User
       </h3>
   
       {/* Username Input */}
       <label htmlFor="username" className="font-semibold text-gray-700 block pb-1">
         Username
       </label>
       <input
         name="username"
         className={`border-2 rounded-r px-4 py-2 w-full ${validationErrors.username ? "border-red-500" : ""}`}
         type="text"
         value={formData.username}
         onChange={handleInputChange}
         autoComplete="off"
       />
       {validationErrors.username && <div className="text-red-500">{validationErrors.username}</div>}
   
       {/* Name Input */}
       <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">
         Name
       </label>
       <input
         name="name"
         className={`border-2 rounded-r px-4 py-2 w-full ${validationErrors.name ? "border-red-500" : ""}`}
         type="text"
         value={formData.name}
         onChange={handleInputChange}
         autoComplete="off"
       />
       {validationErrors.name && <div className="text-red-500">{validationErrors.name}</div>}
   
       {/* Email Input */}
       <label htmlFor="email" className="font-semibold text-gray-700 block pb-1">
         Email
       </label>
       <input
         name="email"
         className={`border-2 rounded-r px-4 py-2 w-full ${validationErrors.email ? "border-red-500" : ""}`}
         type="text"
         value={formData.email}
         onChange={handleInputChange}
       />
       {validationErrors.email && <div className="text-red-500">{validationErrors.email}</div>}
   
       {/* Password Input */}
       <label htmlFor="password" className="font-semibold text-gray-700 block pb-1">
         Password
       </label>
       <input
         name="password"
         className={`border-2 rounded-r px-4 py-2 w-full ${validationErrors.password ? "border-red-500" : ""}`}
         type="password"
         value={formData.password}
         onChange={handleInputChange}
       />
       {validationErrors.password && <div className="text-red-500">{validationErrors.password}</div>}
   
       {/* Roles Input */}
       <label htmlFor="roles" className="font-semibold text-gray-700 block pb-1">
         Roles
       </label>
       <input
         type="text"
         id="roles"
         name="roles"
         className="border-2 rounded-r px-4 py-2 w-full"
         value={formData.roles}
         onChange={handleInputChange}
         disabled
       />
   
       {/* Form Submission */}
       <button
         onClick={handleFormSubmit}
         className="border ml-3 px-3 py-2 mt-4 border-black bg-black text-white font-semibold rounded-md text-sm"
       >
         Create
       </button>
     </div>
   </div>
   
      )}

      {/* Toggle Tab Button */}
      <div className="absolute  right-0 p-2 ">
        <button
          className="border px-3 py-2 border-black bg-black text-white font-semibold rounded-md text-sm"
          onClick={toggleTab}
        >
          {activeTab === "UserDetails" ? "Create User" : "User Details"}
        </button>
      </div>

      {/* Toastify Notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Userdetail;