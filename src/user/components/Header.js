import React, { useContext, useState } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';  // Context to handle sidebar state
import { CartContext } from '../contexts/CartContext'; 
import img from '../images/logoA1.png';
import './Header.css';
import { Link } from 'react-router-dom';
const Header = () => {
  const [isActive, setIsActive] = useState(false);  
  const { isOpen, setIsOpen } = useContext(SidebarContext);  
  const [isLoggedIn, setIsLoggedIn] = useState(false); // mock login state
  const [showUserMenu, setShowUserMenu] = useState(false); // for dropdown toggle
  const { itemAmount } = useContext(CartContext); 
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    setShowUserMenu(false);
    window.location.reload(); // Optionally refresh to force re-render or redirect
  };

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = '/login'; // or use `navigate('/login')` if using React Router hooks
  };

  return (
    <>
        {/* Header Section Starts */}
        <header className="header_section sticky-header">
          <div className="container">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <Link className="navbar-brand" to="/">
                <img width="60" src={img} alt="Logo" />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className=""></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                  <li className="nav-item ">
                    <Link className="nav-link" to="/">
                      Home <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    {/* <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      data-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <span className="nav-label">Pages <span className="caret"></span></span>
                    </Link> */}
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/aboutus">About</Link>
                      </li>
                      <li>
                        <Link to="/testimonial">Testimonial</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/blog">
                      Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contactus">
                      Contact
                    </Link>
                  </li>
                  

                </ul>
                <ul className="navbar-nav">
                  
                  <li className="nav-item">
                    <Link class="nav-link" onClick={() => setIsOpen(!isOpen)}>
                      <svg
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 456.029 456.029"
                        style={{ enableBackground: "new 0 0 456.029 456.029;" }}
                        xmlSpace="preserve"
                      >
                        <g>
                                    <g>
                                       <path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                                          c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z" />
                                    </g>
                                 </g>
                                 <g>
                                    <g>
                                       <path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                                          C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                                          c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                                          C457.728,97.71,450.56,86.958,439.296,84.91z" />
                                    </g>
                                 </g>
                                 <g>
                                    <g>
                                       <path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                                          c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z" />
                                    </g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                                 <g>
                                 </g>
                      </svg>
                      {itemAmount > 0 && (
                        <div className="cart-item-count">
                          {itemAmount}
                        </div>
                      )}
                    </Link>
                  </li>
                  <form className="form-inline">
                    <button className="btn my-2 my-sm-0 nav_search-btn" type="submit">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </form>
                  {/* User Icon */}
                  <li className="nav-item user-icon-dropdown" style={{ position: 'relative' }}>
                  <span
                    className="nav-link"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <i className="fa fa-user-circle" style={{ fontSize: '24px' }}></i>
                  </span>

                  {/* Dropdown */}
                  {showUserMenu && (
                    <div className="user-dropdown" style={{
                      position: 'absolute',
                      top: '40px',
                      right: 0,
                      background: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      zIndex: 10,
                      padding: '10px',
                      minWidth: '120px',
                    }}>
                      {token ? (
                        <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                      ) : (
                        <button className="dropdown-item" onClick={handleLogin}>Login</button>
                      )}
                    </div>
                  )}
                </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        {/* Header Section Ends */}
      
    </>
  );
};

export default Header;
