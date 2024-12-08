import React from "react";
import "./order.css";
import Session from "../../../Session";

class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [], // Initial state with an empty array for orders
    };
  }

  // Fetch data from the server
  fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/restaurant/active-orders?rid=1`);
      const data = await response.json();

      // Check if activeOrders is present in the response
      if (data && data.activeOrders) {
        this.setState({ orders: data.activeOrders });
      } else {
        console.warn("No active orders in the response");
        this.setState({ orders: [] });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ orders: [] }); // Ensure state is still set
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  handleMarkAsDone = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/restaurant/orders/ready?oid=${orderId}`, {
        method: "PUT",
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the order from the frontend by filtering it out from the state
        this.setState((prevState) => ({
          orders: prevState.orders.filter((order) => order.Order_id !== orderId),
        }));
      } else {
        alert(data.message || "Failed to mark order as ready");
      }
    } catch (error) {
      console.error("Error marking order as ready:", error);
      alert("Failed to mark order as ready");
    }
  };

  handleCancel = () => {
    // Display message when Cancel button is clicked
    alert("You cannot cancel now, it's against our contract!");
  };

  render() {
    const { orders } = this.state; // Destructure state

    return (
      <div className="orders">
        <div className="logutbutton-div"onClick={() => window.location.reload()}>
        <button className="logout-btn">Logout</button>
      </div>
        <div>
        <h1 className="restaurant-name">"{Session.name}"</h1>
        </div>
        <h2 className="header">Active Orders</h2>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="rest-order-card">
              <div className="order-info">
                <h3>Order #{index + 1}</h3>
                <p><strong>ID:</strong> {order.Order_id}</p>
                <ul>
                  {order.items && order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} -- {item.qty} x Rs {item.price}/-
                    </li>
                  ))}
                </ul>
                <p><strong>Total:</strong> Rs {order.totalPrice}/-</p>
              </div>
              <div className="customer-info">
                <p><strong>Customer:</strong> {order.customerName}</p>
                <p><strong>Ordered at:</strong> {order.date}</p>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>
                <p><strong>Rider:</strong> {order.riderName}</p>
              </div>
              <div className="actions">
                <button
                  className="done-btn"
                  onClick={() => this.handleMarkAsDone(order.Order_id)} // Pass the order ID
                >
                  Mark as Done
                </button>
                <button className="cancel-btn" onClick={this.handleCancel}>Cancel</button>
              </div>
            </div>
          ))
        ) : (
          <p>No active orders found.</p>
        )}
      </div>
    );
  }
}

export default Orders