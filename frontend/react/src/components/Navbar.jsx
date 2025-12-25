import React from "react";
import "./Navbar.css";
import LogoImage from "../assets/logo.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">logo</Link>
      </div>
      <div className="nav-links">
        <Link className="nav-button" to="/login">Products</Link>
        <Link className="nav-button" to="/login">Cart</Link>
        <Link className="nav-button" to="/login">Login</Link>
        <Link className="nav-button" to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
