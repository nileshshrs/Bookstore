import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";

import './index.scss'; // Import styles
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from "./context/AuthContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
