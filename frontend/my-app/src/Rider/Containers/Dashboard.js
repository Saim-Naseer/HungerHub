import React, { useEffect, useState } from 'react';
import '../Styles/Dashboard.css';
import { Link, useParams, Navigate, useNavigate} from 'react-router-dom';
import axios from 'axios';
import riderProfile from '../Assets/Rider_img.png';
import orderImage from '../Assets/order_img.png';
import Session from '../../Session.js';

const Dashboard = () => {
  const [activeOrders, setActiveOrders] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rider/getActiveOrders/${Session.user_id}`);
        
        if (Array.isArray(response.data)) {
          setActiveOrders(response.data); // Set the response data if it's an array
        } else {
          throw new Error('Unexpected response format');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching active orders:', err);
        setError('No Active Orders Found');
        setLoading(false);
      }
    };

    fetchActiveOrders();
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="Ridersidebar">
        <img src={riderProfile} alt="Rider Profile" className="profile-image" />
        <h2 className="rider-name">{Session.name}</h2>
        <button className="logout-button" onClick={() => window.location.reload()}>Log Out</button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <h2 className="section-title">Active Orders:</h2>

        {loading ? (
          <p>Loading active orders...</p>
        ) : error ? (
          <p className="response">{error}</p>
        ) : Array.isArray(activeOrders) && activeOrders.length === 0 ? (
          <p className="response">No active orders at the moment.</p>
        ) : (
          Array.isArray(activeOrders) &&
          activeOrders.map((order) => (
            <Link
              to={`/OrderDetail/${order.orderId}`} // Adjusted to use order.orderId based on API response
              key={order.orderId} // Changed to use order.orderId as key
              className="order-card"
            >
              <img src={orderImage} alt={`Order ${order.orderId}`} className="order-image" />
              <div className="order_details">
                <p>
                  <strong>From:</strong> {order.restaurantName}, {order.restaurantAddress}
                </p>
                <p>
                  <strong>Destination:</strong> {order.customerAddress}
                </p>
              </div>
              <div className="active-order-amount">
                <p>
                  <strong>Rs: {order.orderAmount} /-</strong>
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
