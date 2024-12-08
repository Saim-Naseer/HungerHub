import React from "react";
import Customer from "../../Session"; 
import Restaurant from "../../Customer/Components/Restaurant/Session"; 

class Re extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "", // Holds the input message
    };
  }

  // Function to capture input value
  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  // Function to send the report to the API
  sendReport = async () => {
    const { message } = this.state;

    if (!message) {
      alert("Please enter a message");
      return;
    }

    try {
      // Fetch the customer and restaurant IDs from session
      const customerId = Customer.user_id;
      const restaurantId = Restaurant.restaurant_id;

      // Send the data to the API
      const response = await fetch("http://localhost:5000/customer/writerestaurantreport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: customerId,
          restaurant_id: restaurantId,
          message: message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Success message from API
        this.setState({ message: "" }); // Clear the input
      } else {
        alert(data.message || "Failed to submit the report"); // Error message from API
      }
    } catch (error) {
      console.error("Error submitting the report:", error);
      alert("An error occurred while submitting the report.");
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.message}
          onChange={this.handleMessageChange}
          placeholder="Enter your message"
        />
        <button onClick={this.sendReport}>Enter</button>
      </div>
    );
  }
}

export default Re;