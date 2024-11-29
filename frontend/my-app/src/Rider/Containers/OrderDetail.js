import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import '../Styles/OrderDetail.css'; // Import the styles for this page

const OrderDetail = () => {
  const { id } = useParams();  // Get the order ID from the URL
  const navigate = useNavigate();

  // Example data for the order, typically this would be fetched from an API or database
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Simulate fetching order data (replace with actual API call)
    const fetchedOrder = {
      id,
      customer: {
        name: 'John Doe',
        contact: '+1234567890',
        address: '123 Street, City, Country',
      },
      restaurant: {
        name: 'Tasty Restaurant',
        contact: '+0987654321',
        address: '456 Avenue, City, Country',
      },
      orderDetails: {
        bill: 25.99,
        orderTime: '2024-11-24 18:30',
        estimatedDeliveryTime: 30, // In minutes
        foodStatus: 'Preparing',
        otherInfo: 'Delivery will be made by Rider XYZ.',
      },
    };

    setOrder(fetchedOrder);
  }, [id]);

  // Complete order functionality
  const handleCompleteOrder = () => {
    // Here you would make an API call to mark the order as completed
    console.log('Order completed');
    navigate('/');  // Redirect to the dashboard after completing the order
  };

  // If order is not yet loaded, show a loading message
  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Rider-order-detail-page">
      <button className="backbutton" onClick={() => navigate('/')}>back</button>
      <div className="upper-half">
        {/* Customer Info Section */}
        <div className="info-box customer-info">
          <h3>Customer Info</h3>
          <p><strong>Name:</strong> {order.customer.name}</p>
          <p><strong>Contact:</strong> {order.customer.contact}</p>
          <p><strong>Address:</strong> {order.customer.address}</p>
          <button className="chat-button" onClick={() => navigate('/chat')}>
            Chat with Customer
          </button>
        </div>

        {/* Restaurant Info Section */}
        <div className="info-box restaurant-info">
          <h3>Restaurant Info</h3>
          <p><strong>Name:</strong> {order.restaurant.name}</p>
          <p><strong>Contact:</strong> {order.restaurant.contact}</p>
          <p><strong>Address:</strong> {order.restaurant.address}</p>
        </div>
      </div>

      {/* Order Details Section */}
      <div className="order-Alldetails">
        <div className="order-info-box">
          <h3>Order Details</h3>
          <div className="order-summary">
            <p><strong>Bill:</strong> Rs{order.orderDetails.bill}/-</p>
            <p><strong>Order Time:</strong> {order.orderDetails.orderTime}</p>
            <p><strong>Estimated Delivery Time:</strong> {order.orderDetails.estimatedDeliveryTime} mins</p>
            <p><strong>Food Status:</strong> {order.orderDetails.foodStatus}</p>
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
