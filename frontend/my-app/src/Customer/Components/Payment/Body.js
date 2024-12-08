import React from "react";
import StatusBar from "./StatusBar3";
import Bill from "./Bill";
import "./Body.css";
import Waiting from "../../Containers/Waiting";
import Home from "../../Containers/Home";
import ConfCart from "../../Containers/ConfCart";
import Session from "../../../Session";
import R_Session from "../Restaurant/Session";

class Body extends React.Component {
  constructor() {
    super();
    this.state = {
      page: "payment",
      showPopup: true, // For toggling popup visibility
      atmAccount: "",
      atmPassword: "",
    };
  }

  changePage = (pageName) => {
    this.setState({ page: pageName });
  };

  placeOrder = async () => {
    const data = await fetch(
      `http://localhost:5000/customer/placeorder?uid=${Session.user_id}&rid=${R_Session.restaurant_id}`
    );
    const data2 = await data.json();

    this.changePage("waiting");
  };

  openPopup = () => {
    this.setState({showPopup:true});
  };

  closePopup = () => {
    this.setState({showPopup:false});
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { showPopup, atmAccount, atmPassword } = this.state;
    let content;

    let content2 = (
        <div className="popup_overlay">
            <div className="popup_container">
              <h3 className="popup_heading">ATM Payment Details</h3>
              <input
                type="text"
                name="atmAccount"
                value={atmAccount}
                onChange={this.handleInputChange}
                placeholder="Enter ATM Account"
                className="popup_input"
              />
              <input
                type="password"
                name="atmPassword"
                value={atmPassword}
                onChange={this.handleInputChange}
                placeholder="Enter Password"
                className="popup_input"
              />
              <div className="popup_buttons">
                <button className="popup_button proceed" onClick={this.placeOrder}>
                  Proceed
                </button>
                <button className="popup_button cancel" onClick={this.closePopup}>
                  Cancel
                </button>
              </div>
            </div>
        </div>
    )

    if (this.state.page === "payment" & this.state.showPopup=== false) {
      content = (
        <>
          <StatusBar pagefunc={this.changePage} />
          <Bill />
          <div className="c_COD" onClick={this.placeOrder}></div>
          <div className="c_Online" onClick={this.openPopup}></div>
        </>
      );
    }else if (this.state.page === "payment" & this.state.showPopup=== true) {
        content = (
            <>
            <StatusBar pagefunc={this.changePage} />
            <Bill />
            <div className="c_COD" onClick={this.placeOrder}></div>
            <div className="c_Online" onClick={this.togglePopup}></div>
            {content2}
            </>
        );
    } else if (this.state.page === "waiting") {
      content = <Waiting />;
    } else if (this.state.page === "home") {
      content = <Home />;
    } else if (this.state.page === "confcart") {
      content = <ConfCart />;
    }

    

    return (
      <>
        {content}
      </>
    );
  }
}

export default Body;
