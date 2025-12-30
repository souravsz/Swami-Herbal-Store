import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authService from '../utils/auth';
import QuantityModal from './QuantityModal';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); // 👈 product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    if (!authService.isAuthenticated()) {
      alert('Please login to add items to cart');
      return;
    }
    setShowModal(true);
  };

  const handleConfirmAddToCart = async (quantity) => {
    setAddingToCart(true);
    try {
      const response = await authService.apiCall('/cart/add/', {
        method: 'POST',
        body: JSON.stringify({ 
          product_id: id,
          quantity: quantity 
        })
      });

      if (response.ok) {
        alert('Product added to cart!');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart');
    }
    setAddingToCart(false);
  };

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
          <button 
            className="add-to-cart-btn-detail" 
            onClick={handleAddToCart}
            disabled={addingToCart}
          >
            {addingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
          <button className="buy-now-btn-detail">Buy Now</button>
        </div>
      </div>
      
      <QuantityModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmAddToCart}
        productName={product?.name}
      />
    </div>
  );
};

export default ProductDetail;
