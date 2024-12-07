import React, { useState, useEffect } from "react";
import {useNavigate, useParams } from 'react-router-dom';
import axios from "axios"; // Axios for API requests
import "../Styles/GetNewOrders.css"; // Assuming you have a CSS file for styling
import Session from '../../Session.js'

const GetNewOrders = () => {
  // State to store orders
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate()
 const {id} = useParams()
  // Fetch orders dynamically (API call)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Make the API call
        const response = await axios.get(`http://localhost:5000/rider/new-orders/${id}`);

        // Extract orders from response.data.data        
        setOrders(response.data.data); 

        setLoading(false);
      } catch (err) {
        console.error("Error fetching new orders:", err);
        setError("No New Orders Available...");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Function to accept an order
  const acceptOrder = async (id) => {
    const response = await axios.put(`http://localhost:5000/rider/set-rider/${id}/${Session.user_id}`);
    setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== id));
    navigate('/');
    // Optionally, update the active orders in your app's state
  };

  // Function to reject an order
  const rejectOrder = (id) => {
    console.log(`Order ${id} rejected!`);
    // Here, send a request to the backend to reject the order
    setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== id));
  };

  return (
    <div className="Driver-get-new-orders">
      <h2>Available Orders:</h2>
      {loading ? (
        <p className="response">Loading new orders...</p>
      ) : error ? (
        <p className="response">{error}</p>
      ) : orders.length === 0 ? (
        <p className="response">No new orders available in your area.</p>
      ) : (
        orders.map((order) => (
          <div key={order.order_id} className="order-card1">
            <div className="order-info1">
              <p>
                <strong>From:</strong> {order.restaurantName}
              </p>
              <p>{order.restaurantLocation}</p>
              <p>
                <strong>To:</strong> {order.customerLocation}
              </p>
              <p>
                <strong>Rs:</strong> {order.orderAmount}
              </p>
              <p>
                <strong>Order Time:</strong> {new Date(order.orderDate).toLocaleString()}
              </p>
            </div>
            <div className="order-actions">
              <button
                className="accept-button"
                onClick={() => acceptOrder(order.order_id)}
              >
                Pick Order
              </button>
              <button
                className="reject-button"
                onClick={() => rejectOrder(order.order_id)}
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
