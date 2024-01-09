import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const addToCart = async (bookId, userID) => {
    const cartData = {
      userId: userID,
      bookId: parseInt(bookId),
      quantity: 1,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v2/carts/add-to-cart",
        cartData
      );
      console.log("Cart data added:", cartData);
      // Handle successful response as needed
      console.log(response.data);

      toast.success("Book has been added to the Cart", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.warning("You must login to add book to cart.", {
        position: "top-right",
      });
      // Handle errors
    }
  };