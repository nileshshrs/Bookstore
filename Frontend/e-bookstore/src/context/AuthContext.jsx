// AuthContextProvider.jsx
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
    setLoading(false); // Set loading to false once user information is fetched
  }, []);

  console.log("AuthContext state: ", state);

  // Render children only when loading is false and user information is available
  return (
    !loading && (
      <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
      </AuthContext.Provider>
    )
  );
};
export default AuthContext;
