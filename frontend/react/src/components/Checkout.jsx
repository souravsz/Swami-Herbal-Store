import React, { useState, useEffect } from 'react';
import authService from '../utils/auth';
import './Checkout.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await authService.apiCall('/cart/');
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    console.log('Order placed with payment method:', paymentMethod);
    // Add order placement logic here
  };

  if (loading) {
    return (
      <div className="checkout-container">
        <div className="loading">Loading checkout...</div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      
      <div className="checkout-content">
        <div className="order-summary">
          <h2 className="section-title">Order Summary</h2>
          
          <div className="checkout-items">
            {cartItems.map(item => (
              <div key={item.product.id} className="checkout-item">
                <img src={item.product.image} alt={item.product.name} className="checkout-item-image" />
                
                <div className="checkout-item-details">
                  <h3 className="checkout-item-name">{item.product.name}</h3>
                  <p className="checkout-item-price">${item.product.price}</p>
                </div>

                <div className="checkout-item-quantity">
                  Qty: {item.quantity}
                </div>

                <div className="checkout-item-total">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="pricing-summary">
            <div className="pricing-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="pricing-row">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="pricing-row total-row">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="payment-section">
          <h2 className="section-title">Payment Method</h2>
          
          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-label">Cash on Delivery (COD)</span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === 'online'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-label">Online Payment</span>
            </label>
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;