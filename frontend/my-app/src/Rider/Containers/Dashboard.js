import React, { useEffect, useState } from 'react';
import '../Styles/Dashboard.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; // Axios for API calls
import riderProfile from '../Assets/Rider_img.png'; // Replace with your profile image path
import orderImage from '../Assets/order_img.png';
import Session from '../../Session.js'

const Dashboard = () => {
    const [activeOrders, setActiveOrders] = useState([]); // State to hold active orders
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const {id} = useParams()

    useEffect(() => {
        const fetchActiveOrders = async () => {
            try {
                
                const response = await axios.get(`http://localhost:5000/rider/getActiveOrders/${id}`); // Adjust URL as needed
                setActiveOrders(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching active orders:', err);
                setError('Failed to fetch active orders. Please try again later.');
                setLoading(false);
            }
        };

        fetchActiveOrders();
    }, []);

    return (
      <div className="dashboard">
        {/* Sidebar */}
        <div className="sidebar">
          <img src={riderProfile} alt="Rider Profile" className="profile-image" />
          <h2 className="rider-name">{Session.name}</h2>
          <button className="logout-button">Log Out</button>
        </div>
  
        {/* Main content */}
        <div className="main-content">
          <h2 className="section-title">Active Orders:</h2>

          {loading ? (
            <p>Loading active orders...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : activeOrders.length === 0 ? (
            <p className="no-orders-message">No active orders at the moment.</p>
          ) : (
            activeOrders.map((order) => (
              <Link
                to={`/OrderDetail/${order.orderId}`} // Adjusted to use order.orderId based on API response
                key={order.orderId} // Changed to use order.orderId as key
                className="order-card"
              >
                <img src={orderImage} alt={`Order ${order.orderId}`} className="order-image" />
                <div className="order_details">
                  <p>
                    <strong>From:</strong> {order.restaurantAddress}
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
