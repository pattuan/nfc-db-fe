import React from "react";
import "./index.css";

export default function ReceiptCard({ id, title, price, quantity, removeItem }) {
  return (
    <div className="receipt-card">
      {/* <div className="receipt-card-image">
        <img src={image} alt={title} />
      </div> */}
      <div className="receipt-card-details">
        <p className="receipt-card-title">{title}</p>
        <p className="receipt-card-quantity">Quantity: {quantity}</p>
        <p className="receipt-card-price">${price}</p>
      </div>
      <div className="receipt-card-actions">
        <button className="remove-button" onClick={() => removeItem(id)}>
          Remove
        </button>
      </div>
    </div>
  );
}
