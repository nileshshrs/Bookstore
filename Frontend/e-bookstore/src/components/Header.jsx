import React from 'react';
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs';
 import Userimg from "../assets/avatar-illustrated-03.png";

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            {/* <BsSearch  className='icon'/> */}
        </div>
        <div className='header-right'>
          
          
             <div class="profile-photo">
              
             
            <a href="">
              
                <img src={Userimg} alt="img" />
            </a>
        </div>




        </div>
    </header>
  )
}

export default Header