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

      console.log(response.data);

    } catch (error) {
      // Handle network errors or other exceptions
      console.error(error.response.data);
    }
  };

  return { signin };
};