import React from 'react';
import {useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../Styles/NavigationBar.css'; 
import logo from '../Assets/HungerHub Logo.png'; // Replace with the path to your logo image
import Session from '../../Session.js'

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
        <Link to={`/${Session.user_id}`} className="nav-button">Dashboard</Link>
        <Link to={`/GetNewOrders/${Session.location}`} className="nav-button">Get New Orders</Link>
        <Link to="/chat" className="nav-button">Chat Box</Link>
        <Link to={`/OrderHistory/${Session.user_id}`} key={Session.user_id} className="nav-button">Orders History</Link>
        <Link to="/profile" className="nav-button">Profile</Link>
      </div>
    </div>
  );
};

export default NavigationBar;
