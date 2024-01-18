import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../css/userdetail.scss";

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

  return (
    <div className="flex flex-col md:flex-row">
      {/* User Details Section */}
      <div className="w-full md:w-6/10 container border-t ml-8 mt-8 mb-8" style={{ maxWidth: "100%" }}>
        <h3 className="font-bold text-gray-900 p-2 mb-6" style={{ fontSize: "30px", fontFamily: "Prata", fontWeight: "700" }}>
          User Details
        </h3>

        <div className="max-w-lg rounded-md shadow-lg table-container" style={{ maxWidth: "100%" }}>
          <table className="w-full ml-4 mt-4" style={{ fontFamily: "Prata", fontWeight: "100", fontSize: "15px" }}>
            <thead>
              <tr>
                <th className="">Username</th>
                <th className="">Name</th>
                <th className="">Email</th>
                <th className="">Roles</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.sort((a, b) => a.id - b.id).map((user) => (
                <tr key={user.id}>
                  <td style={{ paddingBottom: "20px" }}>{user.username}</td>
                  <td style={{ paddingBottom: "20px" }}>{user.name}</td>
                  <td style={{ paddingBottom: "20px" }}>{user.email}</td>
                  <td style={{ paddingBottom: "20px" }}>{user.roles}</td>
                  <td style={{ paddingBottom: "20px" }}>
                    <button
                      className="action-button rounded text-white bg-black p-1 w-18 mr-2"
                      onClick={() => handleRoleChange(user.id, user.roles === 'admin' ? 'users' : 'admin')}
                    >
                      Change roles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-4/10 sm:p-8 mt-8 mb-4 lg:w-2/5 xl:w-2/5" style={{ maxWidth: "100%" }}>
        <div className="rounded shadow p-4 sm:p-6">
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
      {/* Toastify Notifications */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Userdetail;
