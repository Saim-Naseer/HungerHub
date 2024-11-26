import React from 'react';
import {useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Styles/NavigationBar.css'; 
import logo from '../Assets/HungerHub Logo.png'; // Replace with the path to your logo image


const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      {/* Top section with logo and title */}
      <div className="nav-header">
        <img src={logo} alt="Hunger Hub Logo" className="nav-logo" />
        <h1 className="nav-title">Hunger Hub</h1>
      </div>

      {/* Bottom section with buttons */}
      <div className="nav-buttons">
        <Link to="/" className="nav-button">Dashboard</Link>
        <Link to="/GetNewOrders" className="nav-button">Get New Orders</Link>
        <Link to="/chat" className="nav-button">Chat Box</Link>
        <Link to="/OrderHistory" className="nav-button">Orders History</Link>
        <Link to="/profile" className="nav-button">Profile</Link>
      </div>
    </div>
  );
};

export default NavigationBar;
