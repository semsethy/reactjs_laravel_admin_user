import React from 'react';
import img from '../images/logos/illustrated-store-front-logo-with-striped-awning-free-vector.jpg';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling
const Nav = () => {
  return (
    <aside className="left-sidebar">
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-center">
          <a href="/admin" className="text-nowrap logo-img mt-4">
            <img src={img} height="130" width="100%" alt="Logo" />
          </a>
          <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
            <i className="ti ti-x fs-8"></i>
          </div>
        </div>
        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul id="sidebarnav">
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span className="hide-menu">Home</span>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link"
                to="/admin/dashboard"
                activeClassName="active" // Apply 'active' class when the route matches
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-layout-dashboard"></i>
                </span>
                <span className="hide-menu">Dashboard</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link"
                to="/admin/slideshow_list"
                activeClassName="active"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-layout-dashboard"></i>
                </span>
                <span className="hide-menu">Slide Show List</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link"
                to="/admin/slideshow_add"
                activeClassName="active"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-layout-dashboard"></i>
                </span>
                <span className="hide-menu">Slide Show Add</span>
              </NavLink>
            </li>
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span className="hide-menu">Categories</span>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link"
                to="/admin/category_list"
                activeClassName="active"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-article"></i>
                </span>
                <span className="hide-menu">Categories List</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link"
                to="/admin/category_add"
                activeClassName="active"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-file-description"></i>
                </span>
                <span className="hide-menu">Categories Add</span>
              </NavLink>
            </li>
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span className="hide-menu">Products</span>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link"
                to="/admin/product_list"
                activeClassName="active"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-article"></i>
                </span>
                <span className="hide-menu">Product List</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link"
                to="/admin/product_add"
                activeClassName="active"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-file-description"></i>
                </span>
                <span className="hide-menu">Product Add</span>
              </NavLink>
            </li>
            {/* <li className="sidebar-item">
              <NavLink
                className="sidebar-link"
                to="/admin/orders_list"
                activeClassName="active"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-file-description"></i>
                </span>
                <span className="hide-menu">Orders</span>
              </NavLink>
            </li> */}
            <li className="sidebar-item">
              <NavLink
                className="sidebar-link"
                to="/admin/setting"
                activeClassName="active"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-file-description"></i>
                </span>
                <span className="hide-menu">Setting</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Nav;
