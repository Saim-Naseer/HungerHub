import React from "react";
import "./order.css";
import Session from "../../../Session";

const Orders = () => {
  const order = {
    id: "97245639",
    customer: "Kashif Ijaz",
    time: "10:50 pm",
    payment: "COD",
    rider: { name: "Majid Khan", code: "4378" },
    items: [
      { name: "Pasta", size: "M", qty: 1, price: 1200 },
      { name: "Beef Burger", size: "-", qty: 3, price: 1850 },
      { name: "Pizza", size: "L", qty: 1, price: 2100 },
    ],
    total: 5150,
    timeRemaining: "15 mins",
  };

  const handleCancel = () => {
    // Display message when Cancel button is clicked
    alert("You cannot cancel now, it's against our contract!");
  };

  return (
    <div className="orders">
      <div>
        <h1 className="restaurant-name">"{Session.name}"</h1>
      </div>
      <h2 className="heading">Active Orders</h2>
      <div className="rest-order-card">
        <div className="order-info">
          <h3>Order #1</h3>
          <p>ID: {order.id}</p>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} ({item.size}) - {item.qty} x {item.price}/-
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> Rs {order.total}/-</p>
        </div>
        <div className="customer-info">
          <p><strong>Customer:</strong> {order.customer}</p>
          <p><strong>Ordered at:</strong> {order.time}</p>
          <p><strong>Payment:</strong> {order.payment}</p>
          <p><strong>Rider:</strong> {order.rider.name} (Code: {order.rider.code})</p>
        </div>
        <div className="actions">
          <button className="done-btn">Mark as Done</button>
          <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
