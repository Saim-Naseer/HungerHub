// NavbarTop.js
import React from "react";
import { Link } from "react-router-dom"; // React Router link
import "./NavbarTop.css";
import "./HH_logo.png";
import R_Session from "../Restaurant/Session";

class NavbarTop extends React.Component {
  resetRestaurantSession = () => {
    R_Session.restaurant_id = 0;
    R_Session.name = "";
    R_Session.location = "";
  };

  render() { 
    return (
      <div className="Navbar4">
        {/* Navigate to Home on Logo Click */}
        <Link to="/" className="logo4" onClick={this.resetRestaurantSession}></Link>

        <p className="title4">Hunger Hub</p>

        {/* Navigate to Profile */}
        <Link to="/profile" className="profile4"></Link>
      </div>
    );
  }
}

export default NavbarTop;
