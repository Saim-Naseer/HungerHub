import React from "react"
import "./NavbarTop.css"
import logo from "./HH_logo.png"
import { Link } from 'react-router-dom';


const NavbarTop = () => {
    return (
      <div className="navigation-bar">
        {/* Top section with logo and title */}
        <div className="nav-header">
          <img src={logo} alt="Hunger Hub Logo" className="nav-logo" />
          <h1 className="nav-title">Hunger Hub</h1>
        </div>
  
        {/* Bottom section with buttons */}
        <div className="nav-buttons">
          <Link to="/" className="nav-button">Orders</Link>
          <Link to="/EditMenu" className="nav-button">Edit Menu</Link>
          <Link to="/VoucherGenerator" className="nav-button">Generate Voucher</Link>
          <Link to="/Reports" className="nav-button">Check Reports</Link>
          <Link to="/orderHistory" className="nav-button">Orders History</Link>
          <Link to="/Res_Profile" className="nav-button">Profile</Link>
        </div>
      </div>
    );
  };
  

export default NavbarTop;