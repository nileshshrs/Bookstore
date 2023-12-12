
import React, { useEffect, useRef } from 'react';
import "../css/dashboard.css";
import "../css/style.css";
import feather from 'feather-icons';




const Dashboard = () => {
  const sidebarRef = useRef(null);
  const catSubMenuRef = useRef(null);
  const sidebarBtnsRef = useRef([]);

  useEffect(() => {
    feather.replace();

    const sidebar = sidebarRef.current;
    const catSubMenu = catSubMenuRef.current;
    const sidebarBtns = sidebarBtnsRef.current;

    const handleSidebarToggle = () => {
      for (const sdbrBtn of sidebarBtns) {
        sdbrBtn.classList.toggle('rotated');
      }

      sidebar.classList.toggle('hidden');
      catSubMenu.classList.remove('visible');
    };

    if (sidebarBtns) {
      sidebarBtns.forEach((sidebarBtn) => {
        sidebarBtn.addEventListener('click', handleSidebarToggle);
      });
    }

    // Cleanup event listeners
    return () => {
      if (sidebarBtns) {
        sidebarBtns.forEach((sidebarBtn) => {
          sidebarBtn.removeEventListener('click', handleSidebarToggle);
        });
      }
    };
  }, []); // Empty dependency array indicates this effect runs once on mount

  useEffect(() => {
  

    const darkMode = localStorage.getItem('darkMode');
    const darkModeToggle = document.querySelector('.theme-switcher');

    const enableDarkMode = () => {
      document.body.classList.add('darkmode');
      localStorage.setItem('darkMode', 'enabled');
    };

    const disableDarkMode = () => {
      document.body.classList.remove('darkmode');
      localStorage.setItem('darkMode', null);
    };

    if (darkMode === 'enabled') {
      enableDarkMode();
    }

    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        const darkMode = localStorage.getItem('darkMode');

        if (darkMode !== 'enabled') {
          enableDarkMode();
        } else {
          disableDarkMode();
        }

        addData(); // You need to define the addData function
      });
    }

    // Cleanup event listeners
    return () => {
      if (darkModeToggle) {
        darkModeToggle.removeEventListener('click', () => {
          addData(); // You need to define the addData function
        });
      }
    };
  }, []); // Empty dependency array indicates this effect runs once on mount

  
  return (
    <>
      <div className="layer"></div>
      {/* ! Body */}
      <a className="skip-link sr-only" href="#skip-target">
        Skip to content
      </a>
      <div className="page-flex">
        {/* ! Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-start">
            <div className="sidebar-head">
              <a href="/" className="logo-wrapper" title="Home">
                <span className="sr-only">Home</span>
                <span className="icon logo" aria-hidden="true"></span>
                <div className="logo-text">
                  <span className="logo-title">Logo</span>
                  <span className="logo-subtitle">Dashboard</span>
                </div>
              </a>
              <button className="sidebar-toggle transparent-btn" title="Menu" type="button">
                <span className="sr-only">Toggle menu</span>
                <span className="icon menu-toggle" aria-hidden="true"></span>
              </button>
            </div>
            <div className="sidebar-body">
              <ul className="sidebar-body-menu">
                <li>
                  <a className="active" href="/">
                    <span className="icon home" aria-hidden="true"></span>Dashboard
                  </a>
                </li>
              </ul>
              <ul className="sidebar-body-menu">
                <li>
                  <a className="active" href="/">
                    <span className="icon home" aria-hidden="true"></span>Dashboard
                  </a>
                  <ul className="cat-sub-menu">
                    
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <div className="main-wrapper">
          {/* Main nav */}
          <nav className="main-nav--bg">
            <div className="container main-nav">
              <div className="main-nav-start">
                <div className="search-wrapper">
                  <i data-feather="search" aria-hidden="true"></i>
                  <input type="text" placeholder="Enter keywords ..." required />
                </div>
              </div>
              <div className="main-nav-end">
                <button className="sidebar-toggle transparent-btn" title="Menu" type="button">
                  <span className="sr-only">Toggle menu</span>
                  <span className="icon menu-toggle--gray" aria-hidden="true"></span>
                </button>

                <button className="theme-switcher gray-circle-btn" type="button" title="Switch theme">
                  <span className="sr-only">Switch theme</span>
                  <i className="sun-icon" data-feather="sun" aria-hidden="true"></i>
                  <i className="moon-icon" data-feather="moon" aria-hidden="true"></i>
                </button>

                <div className="nav-user-wrapper">
                  <button href="##" className="nav-user-btn dropdown-btn" title="My profile" type="button">
                    <span className="sr-only">My profile</span>
                    <span className="nav-user-img">
                      <picture>
                        <source srcSet="./img/avatar/avatar-illustrated-02.webp" type="image/webp" />
                        <img src="./img/avatar/avatar-illustrated-02.png" alt="User name" />
                      </picture>
                    </span>
                  </button>
                  <ul className="users-item-dropdown nav-user-dropdown dropdown">
                    <li>
                      <a href="##">
                        <i data-feather="user" aria-hidden="true"></i>
                        <span>Profile</span>
                      </a>
                    </li>

                    <li>
                      <a className="danger" href="##">
                        <i data-feather="log-out" aria-hidden="true"></i>
                        <span>Log out</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          {/* Main */}
          <main className="main users chart-page" id="skip-target">
            <div className="container">
              <h2 className="main-title">Dashboard</h2>
            </div>
          </main>

          {/* Footer */}
        </div>
      </div>
    
     
    </>
  );
};

export default Dashboard;
