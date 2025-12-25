import React from "react";
import "./Home.css";
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Complete Ayurvedic Care for Skin & Hair</h1>
        <p className="hero-subtitle">
          Experience nature’s healing power with Swami Herbal Products  crafted from pure herbs for your body, mind, and spirit
        </p>
        <div className="hero-buttons">
          <Link className="cta-button primary" to="/products">Buy Now</Link>
          <button className="cta-button secondary">About Us</button>
        </div>
      </div>
    </div>
  );
};

export default Home;