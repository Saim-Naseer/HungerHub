import React, { useEffect, useState } from 'react';
import '../Styles/Dashboard.css';
import { Link, useParams, Navigate, useNavigate, useFetcher} from 'react-router-dom';
import axios from 'axios';
import riderProfileAlter from '../Assets/Rider_img.png'; 
import orderImage from '../Assets/order_img.png';
import Session from '../../Session.js';

const Dashboard = () => {
  const [activeOrders, setActiveOrders] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [earnings, setEarnings] = useState(0);
  const [TotalEarnings, setTotalEarnings] = useState(0);
  let riderProfile = Session.image;
  const navigate = useNavigate();

  if(riderProfile === ''){
    riderProfile = riderProfileAlter;
  }

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
    const fetchEarnings = async () => {
      try {
        const earningsResponse = await axios.get(`http://localhost:5000/rider/earnings/${Session.user_id}`);
        if (earningsResponse.data && earningsResponse.data.success) {
          setEarnings(earningsResponse.data.earnings);
        } else {
          throw new Error('Unexpected earnings response format');
        }
        const TotalearningsResponse = await axios.get(`http://localhost:5000/rider/TotalEarnings/${Session.user_id}`);
        if (TotalearningsResponse.data && TotalearningsResponse.data.success) {
          setTotalEarnings(TotalearningsResponse.data.earnings);
        } else {
          throw new Error('Unexpected earnings response format');
        }
      } catch (err) {
        console.error('Error fetching earnings:', err);
        setError('Failed to fetch earnings');
      }
    };

    fetchActiveOrders();
    fetchEarnings();
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="Ridersidebar">
      <img src={riderProfile} alt="Rider Profile" className="profile-image" />
<h2 className="rider-name">{Session.name}</h2>

<hr className="separator" />
<h3 className="rider-earnings">Earnings in Last 24hrs:</h3>
<h3 className="earnings">Rs {Math.round(earnings)} /-</h3>

<h3 className="rider-earnings">Total Earnings:</h3>
<h3 className="earnings">Rs {Math.round(TotalEarnings)} /-</h3>
<hr className="separator" />

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
