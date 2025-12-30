import React, { useState } from 'react';
import './QuantityModal.css';

const QuantityModal = ({ isOpen, onClose, onConfirm, productName }) => {
  const [quantity, setQuantity] = useState(1);

  const handleConfirm = () => {
    onConfirm(quantity);
    setQuantity(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h3>Select Quantity</h3>
        <p>{productName}</p>
        
        <div className="quantity-selector">
          <div className="quantity-controls">
            <button 
              className="quantity-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="quantity-display">{quantity}</span>
            <button 
              className="quantity-btn"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <button className="confirm-btn" onClick={handleConfirm}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default QuantityModal;