import React from "react";
import "../css/dashboard.css";


const Dashboard = () => {
 
  return (
    <>
    <div class="container">
      <aside>
           
         <div class="top">
           <div class="logo">
            
            
            <a href="">
              <img src="logo.png" alt="img"/>  </a>
           </div>
           <div class="close" id="close_btn">
            <span class="material-symbols-sharp">
              close
              </span>
           </div>
         </div>
         {/* <!-- end top --> */}
          <div class="sidebar">

            <a href="#" id="dashboardLink" class="active">
              <span class="material-symbols-sharp ">grid_view </span>
              <h3>Dashbord</h3>
           </a>
           <a href="user.html"  id="customerLink">
              <span class="material-symbols-sharp">person_outline </span>
              <h3>User</h3>
           </a>
         
           
           <a href="Product.html" id="productLink">
              <span class="material-symbols-sharp">receipt_long </span>
              <h3>Products</h3>
           </a>
           <a href="blog.html" id="blogLink" >
            <span class="material-symbols-sharp">insights </span>
            <h3>Blogs</h3>
         </a>
          
          
           <a href="#">
              <span class="material-symbols-sharp">logout </span>
              <h3>logout</h3>
           </a>
             


          </div>

      </aside>
      {/* <!-- --------------
        end asid
      -------------------- -->

      <!-- --------------
        start main part
      --------------- --> */}

      <main>
           <h1>Hi, Welcome Back</h1>

         

       {/* <!-- end insights --> */}
    
      </main>
      {/* <!------------------
         end main
        ------------------->

      <!----------------
        start right main 
      ----------------------> */}
    <div class="right">
      


<div class="top">
   <button id="menu_bar">
     <span class="material-symbols-sharp">menu</span>
   </button>

  

   <div class="theme-toggler">
     <span class="material-symbols-sharp active">light_mode</span>
     <span class="material-symbols-sharp">dark_mode</span>
   </div>
    <div class="profile">
       <div class="info">
           <p><b>Bibhakta Lamsal</b></p>
           <small class="text-muted"></small>
       </div>
       <a href="">
       <div class="profile-photo">
         <img src="avatar-illustrated-03.png" alt="img"/>
       </div></a>
    </div>
</div>
</div>

   </div>

    </>
  );
};

export default Dashboard;