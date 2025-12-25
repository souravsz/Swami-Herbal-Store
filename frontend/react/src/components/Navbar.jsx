import React from "react";
import "./Navbar.css";
import LogoImage from "../assets/logo.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/"></Link>
      </div>
      <div className="nav-links">
        <Link className="nav-button" to="/products">About Us</Link>
        <Link className="nav-button" to="/products">Products</Link>
        <Link className="nav-button" to="/cart">Cart</Link>
        <Link className="nav-button" to="/login">Sign Up</Link>

      </div>
    </nav>
  );
};

export default Navbar;
