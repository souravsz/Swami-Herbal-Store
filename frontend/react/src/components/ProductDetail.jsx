import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authService from '../utils/auth';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); // 👈 product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${authService.getBaseURL()}/products/${id}/`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="loading">Product not found</div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <img 
        src={product.image || 'https://via.placeholder.com/500x500'} 
        alt={product.name} 
      />

      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        
        <div className="price-section">
          {product.discounted_price && product.discounted_price !== product.price ? (
            <>
              <span className="original-price">${product.price}</span>
              <h2>${product.discounted_price}</h2>
            </>
          ) : (
            <h2>${product.price}</h2>
          )}
        </div>

        <div className="product-detail-actions">
          <button className="add-to-cart-btn-detail">Add to Cart</button>
          <button className="buy-now-btn-detail">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
