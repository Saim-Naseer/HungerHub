import React from 'react';
import '../Styles/Dashboard.css';
import { Link } from 'react-router-dom';
import riderProfile from '../Assets/Rider_img.png'; // Replace with your profile image path
import orderImage from '../Assets/order_img.png';

const Dashboard = () => {
    // Active orders data
    const activeOrders = [
      {
        id: 1,
        image: orderImage,
        from: 'Lahori Restaurant, Valencia',
        destination: "Customer's address",
      },
      {
        id: 2,
        image: orderImage,
        from: 'Cheezious, Johar Town',
        destination: "Customer's address",
      },
    ];
  
    return (
      <div className="dashboard">
        {/* Sidebar */}
        <div className="sidebar">
          <img src={riderProfile} alt="Rider Profile" className="profile-image" />
          <h2 className="rider-name">Rider Name</h2>
          <button className="logout-button">Log Out</button>
        </div>
  
        {/* Main content */}
        <div className="main-content">
          <h2 className="section-title">Active Orders:</h2>
  
          {activeOrders.length === 0 ? (
            <p className="no-orders-message">No active orders at the moment.</p>
          ) : (
            activeOrders.map((order) => (
              <Link
                to={`/OrderDetail/${order.id}`} // Navigate to order detail page with order ID
                key={order.id}
                className="order-card"
              >
                <img src={order.image} alt={`Order ${order.id}`} className="order-image" />
                <div className="order_details">
                  <p>
                    <strong>From:</strong> {order.from}
                  </p>
                  <p>
                    <strong>Destination:</strong> {order.destination}
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