import React from "react";
import NavbarLeft from "./NavbarLeft";
import Session from "../../../Session";
import "./Profile.css";
import Order from "./Order";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      past: [],
      waiting: [],
    };
  }

  // Fetch past and waiting orders simultaneously
  fetchData = async () => {
    try {
      const pastResponse = await fetch(
        `http://localhost:5000/customer/pastorders?uid=${Session.user_id}`
      );
      const pastOrders = await pastResponse.json();

      const waitingResponse = await fetch(
        `http://localhost:5000/customer/waitingorder?uid=${Session.user_id}`
      );
      const waitingOrders = await waitingResponse.json();

      // Update state after both fetches complete
      this.setState({
        past: pastOrders,
        waiting: waitingOrders,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }

  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { past, waiting } = this.state;

    return (
      <>
        <NavbarLeft />
        <h2 className="profile_waith" style={{display:"inline"}}>Waiting Orders</h2>
        <div className="orders-container2">
          {waiting.length > 0 ? (
            waiting.map((order) => (
              <Order key={order.Order_id} Order_id={order.Order_id} Restaurant_id={order.Restaurant_id} Price={order.price} />
            ))
          ) : (
            <p style={{display:"inline"}}>No waiting orders found.</p>
          )}
        </div>

        <h2 className="profile_pasth" style={{display:"inline"}}>Past Orders</h2>
        <div className="orders-container1">
          {past.length > 0 ? (
            past.map((order) => (
              <Order key={order.Order_id} Order_id={order.Order_id} Price={order.price} />
            ))
          ) : (
            <p style={{display:"inline"}}>No past orders found.</p>
          )}
        </div>
      </>
    );
  }
}

export default Profile;
