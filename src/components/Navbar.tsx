import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Notificationwidget from './Notificationwidget.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import appLogo from '../assets/images/pirate/Pirate.png';
import './Navbar.css';  // Custom CSS for the sidebar layout
import { useLocation } from 'react-router-dom';
import { faChartLine, faUsers, faBox, faBell, faTurnUp, faListCheck } from '@fortawesome/free-solid-svg-icons'
function Navbar({ children }) {
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='bg-dark text-white '>
            <nav className="navbar m-bg-secondary  border-start-0 border-tetiary border-top-0">
                <div className="container-fluid px-3">

                    <button className="navbar-toggler" type="button" onClick={toggleSidebar} aria-controls="sidebar" aria-expanded={isSidebarOpen} aria-label="Toggle navigation">
                        {isSidebarOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon menu-btn" width="24" height="24" fill="#ffffff" viewBox="0 0 50 50" x="0px" y="0px">
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"
                                    fill="#ffffff"
                                    stroke="#ffffff"
                                    stroke-width="2" />
                            </svg>

                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="header-link-icon menu-btn" width="28" height="28" fill="#ffffff" viewBox="0 0 256 256">
                                <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
                            </svg>
                        )}
                    </button>

                    <a href='#' aria-label="anchor" className="navbar-brand fw-bolder fs-6 text-center" >
                        PIRATE HUNT
                    </a>
                    <div>
                        <Notificationwidget />

                    </div>

                </div>
            </nav>
            <div className={`main-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar m-bg-secondary text-white ff-secondary border-start-0 border-tetiary border-top-0 h-auto">
                    <ul className="navbar-nav">
                        <Link to="/dashboard" className="nav-item side-menu_item fs-6 d-md-block d-none  rounded d-flex align-items-center ">

                            <img src={appLogo} alt="App Logo" className="img mx-2" width={40} />
                            Admin
                        </Link>


                        <hr className='text-primary' />
                        <li>
                            <Link to="/dashboard" className={location.pathname === '/dashboard' ? "active nav-item active side-menu_item  rounded d-flex fs-6 justify-content-start align-items-center" : "nav-item side-menu_item  rounded d-flex fs-6 justify-content-start align-items-center"}>
                                <FontAwesomeIcon icon={faChartLine} className='mx-2' />
                                Dashboard

                            </Link>

                        </li>
                        <li>
                            <Link to="/players" className={location.pathname === '/players' ? "active nav-item active side-menu_item  rounded d-flex fs-6 justify-content-start align-items-center" : "nav-item side-menu_item  rounded d-flex fs-6 justify-content-start align-items-center"}>
                                <FontAwesomeIcon icon={faUsers} className='mx-2' />
                                Players

                            </Link>

                        </li>
                        <li>
                            <Link to="/tasks" className={location.pathname === '/tasks' ? "active nav-item active side-menu_item  rounded d-flex fs-6 justify-content-start align-items-center" : "nav-item side-menu_item  rounded d-flex fs-6 justify-content-start align-items-center"}>
                                <FontAwesomeIcon icon={faListCheck} className='mx-2' />
                                Tasks

                            </Link>

                        </li>
                        <li>
                            <Link to="/levels" className={location.pathname === '/levels' ? "active nav-item active side-menu_item  rounded d-flex fs-6 justify-content-start align-items-center" : "nav-item side-menu_item  rounded d-flex fs-6 justify-content-start align-items-center"}>
                                <FontAwesomeIcon icon={faTurnUp} className='mx-2' />
                                Levels

                            </Link>

                        </li>
                        <li>
                            <Link to="/notifications" className={location.pathname === '/notifications' ? "active nav-item active side-menu_item  rounded d-flex fs-6 justify-content-start align-items-center" : "nav-item side-menu_item  rounded d-flex fs-6 justify-content-start align-items-center"}>
                                <FontAwesomeIcon icon={faBell} className='mx-2' />
                                Activity

                            </Link>

                        </li>

                        <li>
                            <Link to="/treasure-chest-purchase" className={location.pathname === 'treasure-chest-purchase' ? "active nav-item active side-menu_item  rounded d-flex fs-6 justify-content-start align-items-center" : "nav-item side-menu_item  rounded d-flex fs-6 justify-content-start align-items-center"}>
                                <FontAwesomeIcon icon={faBox} className='mx-2' />
                                Treasure Purchases

                            </Link>
                        </li>





                        <hr className='text-primary' />
                        <li className="">


                        </li>

                    </ul>
                </div>

                <div className="main-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
