import React, { useState } from "react";
import AddBookForm from "./AddBookForm";
import { MdOutlineLibraryAdd, MdClose } from "react-icons/md";
import EditForm from "./EditForm";

const DashboardHeader = ({ toggle }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="topbar">
      <div className="left">
        <button onClick={toggle} className="open-btn">
          Slide
        </button>
        <h2>Welcome to Dashboard !</h2>
      </div>
      <div className="right relative">
        <button
          onClick={handleOpen}
          className="z-[999] absolute top-0 right-[15%] text-[30px] px-3"
        >
          {!open ? <MdOutlineLibraryAdd /> : <MdClose />}
        </button>
        <AddBookForm open={open} />
        <EditForm />
      </div>
    </div>
  );
};

export default DashboardHeader;
