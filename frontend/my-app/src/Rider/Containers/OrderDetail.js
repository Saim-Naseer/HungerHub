import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to make API calls
import '../Styles/OrderDetail.css'; // Import the styles for this page
import Session from '../../Session';

const OrderDetail = () => {
  const { id } = useParams();  // Get the order ID from the URL
  console.log(id)
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null); // To track if there's an error
  
  useEffect(() => {
    // Function to fetch order details from the API
    const fetchOrderDetails = async () => {
      try {
        // Call the getOrderDetails API, replace the URL with the actual endpoint
        const response = await axios.get(`http://localhost:5000/rider/getOrderDetails/${id}`);
        
        // Assuming the response is in the format you provided
        setOrder(response.data);
      } catch (error) {
        setError('Error fetching order details.');
        console.error('Error:', error);
      }
    };

    fetchOrderDetails();
  }, [id]); // Runs when component mounts or when `id` changes

  // Handle the complete order action
  const handleCompleteOrder = async () => {
    try {
        alert("Are you sure you want to proceed?");
        await axios.put(`http://localhost:5000/rider/complete-order/${id}/${Session.user_id}`);
        console.log('Order completed');
        navigate('/'); // Redirect to the dashboard after completing the order
      
    } catch (error) {
      console.error('Error completing the order:', error);
      setError('Failed to complete the order');
    }
  };

  function Time_remaining_func(dateInput) {
    // Step 1: Extract the time from the provided Date object
    const providedTime = new Date(dateInput);
  
    // Step 2: Get the current time
    const currentTime = new Date();
  
    // Step 3: Calculate the difference in milliseconds between current time and the provided time
    const timeDifference = currentTime - providedTime;
  
    // Step 4: Convert the time difference from milliseconds to minutes
    const minutesPassed = timeDifference / (1000 * 60); // 1000 ms = 1 second, 60 seconds = 1 minute
  
    
  
    return minutesPassed.toFixed(2); // Return the result (how much time has passed minus 45 minutes)
  }
  const timeRemaining = Time_remaining_func(order?.orderTime)
  // If the order is not yet loaded, show a loading message
  if (!order && !error) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Rider-order-detail-page">
      <button className="backbutton" onClick={() => navigate(`/`)}>back</button>

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      <div className="upper-half">
        {/* Customer Info Section */}
        <div className="info-box customer-info">
          <h3>Customer Info</h3>
          <p><strong>Name:</strong> {order?.customer?.name}</p>
          <p><strong>Contact:</strong> {order?.customer?.contact}</p>
          <p><strong>Address:</strong> {order?.customer?.address}</p>
          <button className="chat-button" onClick={() => navigate('/chat')}>
            Chat with Customer
          </button>
        </div>

        {/* Restaurant Info Section */}
        <div className="info-box restaurant-info">
          <h3>Restaurant Info</h3>
          <p><strong>Name:</strong> {order?.restaurant?.name}</p>
          <p><strong>Contact:</strong> {order?.restaurant?.contact}</p>
          <p><strong>Address:</strong> {order?.restaurant?.address}</p>
        </div>
      </div>

      {/* Order Details Section */}
      <div className="order-Alldetails">
        <div className="order-info-box">
          <h3>Order Details</h3>
          <div className="order-summary">
            <p><strong>Bill:</strong> Rs{order?.orderAmount}/-</p>
            <p><strong>Order Time:</strong> {order?.orderTime}</p>
            <p><strong>Time Passed:</strong> {timeRemaining} mins</p>
          </div>
          <button className="complete-order-button" onClick={handleCompleteOrder}>
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
