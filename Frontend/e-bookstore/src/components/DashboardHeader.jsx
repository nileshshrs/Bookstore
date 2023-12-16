import React, { useState } from "react";
import AddBookForm from "./AddBookForm";
import { MdOutlineLibraryAdd, MdClose } from "react-icons/md";
import EditForm from "./EditForm";
import { AiOutlineMenu } from "react-icons/ai";

const DashboardHeader = ({ toggle }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="topbar py-3 mb-3 flex items-center px-2">
      <div className="left h-full">
        <button onClick={toggle} className="open-btn">
          <AiOutlineMenu />
        </button>
        <h2 className="sm:text-[1.3rem] font-bold">Welcome to Dashboard !</h2>
      </div>
      <div className="right relative h-full">
        <button
          onClick={handleOpen}
          className={
            !open
              ? "z-[999]  px-3 w-[150px] flex justify-center items-center gap-1"
              : "z-[999]  px-3 w-[150px] flex justify-center items-center gap-1"
          }
        >
          <span className="text-[15px]">
            <MdOutlineLibraryAdd />
          </span>
          <span className="text-[12px] font-bold">Add Book</span>
        </button>
        <AddBookForm open={open} handleOpen={handleOpen} />
        <EditForm />
      </div>
    </div>
  );
};

export default DashboardHeader;
