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
              ? "z-[999]  px-3 w-[120px] flex justify-center items-center"
              : "z-[999] absolute right-[2%] px-3 flex justify-center items-center text-[22px]"
          }
        >
          {!open ? (
            <>
              <span className="text-[18px]">
                <MdOutlineLibraryAdd />
              </span>
              <span className="text-[18px] font-bold">Add</span>
            </>
          ) : (
            <MdClose />
          )}
        </button>
        <AddBookForm open={open} />
        <EditForm />
      </div>
    </div>
  );
};

export default DashboardHeader;
