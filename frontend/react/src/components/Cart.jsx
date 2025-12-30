import React, { useEffect,useState } from 'react';
import './Cart.css';
import authService from '../utils/auth';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await authService.apiCall('/cart/');
      const data = await response.json();
      console.log('Cart data received:', data); // Debug log
      setCartItems(data);
    }
    catch (error) {
      console.error('Error fetching cart:', error);
    }
    finally {
      setLoading(false);
    }
  };
  const updateQuantity = async (productId, newQuantity) => {
    try {
      const response = await authService.apiCall('/cart/update/', {
        method: 'POST',
        body: JSON.stringify({
          product_id: productId,
          quantity: newQuantity
        })
      });
      
      if (response.ok) {

        setCartItems(items =>
          items.map(item =>
            item.product.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      console.log('Removing item with product ID:', productId); // Debug log
      const response = await authService.apiCall('/cart/remove/', {
        method: 'POST',
        body: JSON.stringify({
          product_id: productId,
        })
      });
      
      console.log('Remove response status:', response.status); // Debug log
      
      if (response.ok) {
        // Remove item from local state
        setCartItems(items => {
          const filteredItems = items.filter(item => item.product.id !== productId);
          console.log('Items after removal:', filteredItems); // Debug log
          return filteredItems;
        });
      } else {
        const errorData = await response.json();
        console.error('Remove failed:', errorData);
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">Loading product...</div>
      </div>
    );
  }


  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <a href="/products" className="continue-shopping">Continue Shopping</a>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.product.id} className="cart-item">
                <img src={item.product.image} alt={item.product.name} className="item-image" />
                
                <div className="item-details">
                  <h3 className="item-name">{item.product.name}</h3>
                  <p className="item-price">${item.product.price}</p>
                </div>

                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                    +
                  </button>
                </div>

                <div className="item-total">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => removeItem(item.product.id)}
                >
                  ×
                </button>
              </div>
            ))}
            
            <div className="cart-summary">
              <button className="checkout-btn">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;