import React from "react";
import "./Navbar.css";
import LogoImage from "../assets/logo.png";
import { Link } from 'react-router-dom';
import authService from '../utils/auth';

const Navbar = () => {
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <span className="logo-text">Swami Herbal</span>
        </Link>
      </div>
      <div className="nav-links">
        <Link className="nav-button" to="/about">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H19C20.1 23 21 22.1 21 21V9M19 21H5V3H13V9H19Z"/>
          </svg>
          About Us
        </Link>
        <Link className="nav-button" to="/products">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,7H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6V7H5A1,1 0 0,0 4,8V19A3,3 0 0,0 7,22H17A3,3 0 0,0 20,19V8A1,1 0 0,0 19,7M11,6A1,1 0 0,1 12,5A1,1 0 0,1 13,6V7H11V6M18,19A1,1 0 0,1 17,20H7A1,1 0 0,1 6,19V9H8V10A1,1 0 0,0 9,11A1,1 0 0,0 10,10V9H14V10A1,1 0 0,0 15,11A1,1 0 0,0 16,10V9H18V19Z"/>
          </svg>
          Products
        </Link>
        <Link className="nav-button" to="/cart">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5H5.21L4.27,3H1M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
          </svg>
          Cart
        </Link>
        {isAuthenticated ? (
          <button className="nav-button" onClick={handleLogout}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"/>
            </svg>
            Sign Out
          </button>
        ) : (
          <Link className="nav-button" to="/login">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
            </svg>
            Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
