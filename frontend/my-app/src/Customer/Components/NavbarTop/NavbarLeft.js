// NavbarLeft.js
import React from "react";
import { Link } from "react-router-dom"; 
import "./NavbarLeft.css";
import EditInfoPopup from "./EditInfoPopup"; // Import the popup
import Session from "../../../Session";

class NavbarLeft extends React.Component {
  constructor() {
    super();
    this.state = {
      showEditPopup: false,
    };
  }

  toggleEditPopup = () => {
    this.setState((prevState) => ({
      showEditPopup: !prevState.showEditPopup,
    }));
  };

  render() {
    return (
      <div className="navbar1">
        <div className="navbar_profile">
          <p>
            <b>Name:</b> {Session.name}
          </p>
          <p>
            <b>Email:</b> {Session.email}
          </p>
          <p>
            <b>Phone:</b> 0{Session.phone}
          </p>
          <p>
            <b>Address:</b> {Session.address}
          </p>
          <p>
            <b>Region:</b> {Session.location}
          </p>
        </div>

        <div className="navbar_update" onClick={this.toggleEditPopup}>
          Edit Info
        </div>

        <Link to="/restaurant-report" className="navbar_restaurantreport">
          View Restaurant Reports
        </Link>

        <Link to="/rider-report" className="navbar_riderreport">
          View Rider Reports
        </Link>

        <div className="navbar_logout" onClick={() => window.location.reload()}>
          Log Out
        </div>

        {this.state.showEditPopup && (
          <EditInfoPopup 
            closePopup={this.toggleEditPopup} 
            update={this.props.update} 
          />
        )}
      </div>
    );
  }
}

export default NavbarLeft;
