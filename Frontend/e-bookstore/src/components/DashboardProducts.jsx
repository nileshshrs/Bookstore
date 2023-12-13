import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import AddBookForm from "./AddBookForm";

const DashboardProducts = () => {
  return (
    <div className="relative">
      <button className="absolute right-0 top-[50%] rounded-full border p-3 text-xl">
        <FaPlusCircle />
      </button>
      <AddBookForm />
    </div>
  );
};

export default DashboardProducts;
