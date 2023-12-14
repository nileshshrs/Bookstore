import React from 'react';
import {
  BsGrid1X2,
  BsArchive,
  BsPerson,
  BsBoxArrowRight,
} from 'react-icons/bs';
import { BiLogOut, BiBook } from 'react-icons/bi';
import "../css/dashboard.css";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const outlineIconStyle = {
    color: 'transparent',
    border: '1px solid #7d8da1',
    borderRadius: '50%',
    padding: '8px', // Adjust the padding to your preference
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          Bookstore
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="">
            <BsGrid1X2 className="icon" style={{ color: '#7d8da1' }} /> Dashboard
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsArchive className='icon' style={{ color: '#7d8da1' }} /> Products
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsPerson className='icon' style={{ color: '#7d8da1' }} /> User
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BiBook className='icon' style={{ color: '#7d8da1' }} /> Blog
          </a>
        </li>

        <li className='sidebar-list-item'>
          <a href="">
            <BiLogOut className='icon' style={{ color: '#7d8da1' }} /> Logout
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
