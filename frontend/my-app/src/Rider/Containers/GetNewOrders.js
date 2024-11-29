import React, { useState, useEffect } from "react";
import "../Styles/GetNewOrders.css"; // Assuming you have a CSS file for styling

const GetNewOrders = () => {
  // State to store orders
  const [orders, setOrders] = useState([]);

  // Fetch orders dynamically (simulated with useEffect)
  useEffect(() => {
    // Replace this with an API call to fetch orders for the rider's area
    const fetchedOrders = [
      {
        id: 1,
        restaurant: {
          name: "Tasty Bites",
          address: "123 Street, City",
        },
        customer: {
          address: "456 Avenue, City",
        },
        amount: 500,
      },
      {
        id: 2,
        restaurant: {
          name: "Foodies Hub",
          address: "789 Road, Town",
        },
        customer: {
          address: "101 Block, City",
        },
        amount: 700,
      },
    ];

    setOrders(fetchedOrders);
  }, []);

  // Function to accept an order
  const acceptOrder = (id) => {
    console.log(`Order ${id} accepted!`);
    // Here, send a request to the backend to mark the order as active
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    // Optionally, update the active orders in your app's state
  };

  // Function to reject an order
  const rejectOrder = (id) => {
    console.log(`Order ${id} rejected!`);
    // Here, send a request to the backend to reject the order
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  return (
    <div className="Driver-get-new-orders">
      <h2>Available Orders:</h2>
      {orders.length === 0 ? (
        <p>No new orders available in your area.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card1">
            <div className="order-info1">
              <p>
                <strong>From:</strong> {order.restaurant.name}
              </p>
              <p>{order.restaurant.address}</p>
              <p>
                <strong>To:</strong> {order.customer.address}
              </p>
              <p>
                <strong>Rs:</strong> {order.amount}
              </p>
            </div>
            <div className="order-actions">
              <button
                className="accept-button"
                onClick={() => acceptOrder(order.id)}
              >
                Pick Order
              </button>
              <button
                className="reject-button"
                onClick={() => rejectOrder(order.id)}
              >
                Reject Order
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GetNewOrders;
