 import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignin = () => {
  const { dispatch } = useAuthContext();

  const url = "http://localhost:8080/api/v2/users/login";

  const signin = async (email, password) => {
    try {
      const response = await axios.post(url, {
        usernameOrEmail: email,
        password: password,
      });

      if (response.data.user) {
        const { usernameOrEmail, password, ...jsonData } = response.data.user;
        console.log(jsonData);

        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(jsonData));
          dispatch({ type: "LOGIN", payload: jsonData });
        }
      } else {
        console.error("Response data is undefined");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error(error.response.data);
    }
  };

  return { signin };
};
