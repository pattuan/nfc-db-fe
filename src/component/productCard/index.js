import React, { useState } from "react";

export default function ProductCard({ title, desc, price, id, quantity, addToCart }) {
  const [quantityToAdd, setQuantityToAdd] = useState(0);
  const [size, setSize] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(price); // Thêm state cho giá đã chọn

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 0) {
      setQuantityToAdd(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({ title, desc, price: selectedPrice, id, quantity, size }, quantityToAdd);
  };

  return (
    <div style={{ maxWidth: "30rem", marginTop: "15px" }}>
      <div className="bg-image hover-overlay" style={{ position: "relative", flex: 1, backgroundColor: "#f0f0f0" }}>
        <div style={{ backgroundColor: "rgba(251, 251, 251, 0.15)", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}></div>
      </div>
      <div style={{ padding: "1rem", flex: 1, backgroundColor: "#ffffff", border: "2px solid #ccc", height: "330px" }}>
        <h4 className="text-dark mb-4" style={{ fontSize: "1.8rem" }}>{title}</h4>
        <div style={{ marginBottom: "0.75rem" }}>
          <h5 className="text-dark mb-0">{desc}</h5>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "0.75rem" }}>
          <label htmlFor="quantity" style={{ marginRight: "1rem" }}>Quantity:</label>
          <input type="number" style={{ width: "50px" }} id="quantity" value={quantityToAdd} onChange={handleQuantityChange} />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "0.75rem" }}>
          <label htmlFor="size" style={{ marginRight: "1rem" }}>Size:</label>
          <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">Select size</option>
            <option value="S">Small</option>
            <option value="L">Large</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "0.75rem" }}>
          <label htmlFor="price" style={{ marginRight: "1rem" }}>Price ($):</label>
          <select id="price" value={selectedPrice} onChange={(e) => setSelectedPrice(parseFloat(e.target.value))}>
            <option value="">Select price</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="60">60</option>
            <option value="80">80</option>
          </select>
        </div>
        <button onClick={handleAddToCart} style={{ padding: "0.5rem 1rem", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer", alignSelf: "flex-end" }}>Add to Cart</button>
      </div>
    </div>
  );
}
