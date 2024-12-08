import React, { useState, useEffect } from 'react';
import './orderHistory.css'; // Add your CSS file for styling

const OrderHistory = () => {
  // State to store orders
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  // States for filters
  const [filterDay, setFilterDay] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');

  // Simulate fetching orders
  useEffect(() => {
    const fetchOrders = () => {
      try {
        // Static sample data for orders
        const sampleOrders = [
          {
            order_id: '001',
            restaurantName: 'Pizza Hut',
            customerAddress: '123 Main Street',
            orderDate: '2023-12-01T14:30:00Z',
            orderAmount: 1200,
          },
          {
            order_id: '002',
            restaurantName: 'Subway',
            customerAddress: '456 Elm Street',
            orderDate: '2023-12-05T18:45:00Z',
            orderAmount: 850,
          },
          {
            order_id: '003',
            restaurantName: 'McDonalds',
            customerAddress: '789 Oak Avenue',
            orderDate: '2023-11-25T12:00:00Z',
            orderAmount: 500,
          },
        ];

        setOrders(sampleOrders); // Set the sample orders
        setLoading(false);
      } catch (err) {
        console.error('Error loading sample data:', err);
        setError('Failed to load order history. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Runs once when the component mounts

  // Function to extract day, month, and year from the ISO date string
  const extractDateParts = (date) => {
    const dateObj = new Date(date); // Convert to Date object
    const day = String(dateObj.getDate()).padStart(2, '0'); // Pad day to 2 digits
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Pad month to 2 digits
    const year = String(dateObj.getFullYear());
    return { day, month, year };
  };

  // Filter orders based on user input
  const filteredOrders = orders.filter((order) => {
    const { day, month, year } = extractDateParts(order.orderDate); // Extract day, month, and year

    // Compare the filter values (if they are not empty) with the extracted date parts
    const isDayMatch = !filterDay || day === filterDay;
    const isMonthMatch = !filterMonth || month === filterMonth;
    const isYearMatch = !filterYear || year === filterYear;

    return isDayMatch && isMonthMatch && isYearMatch;
  });

  // Clear filters
  const clearFilters = () => {
    setFilterDay('');
    setFilterMonth('');
    setFilterYear('');
  };

  return (
    <div className="order-history">
      <h2>Completed Orders:</h2>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="date-picker">
          <label htmlFor="month">Month:</label>
          <input
            type="text"
            id="month"
            placeholder="MM"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="date-picker-input"
          />
        </div>
        <div className="date-picker">
          <label htmlFor="day">Day:</label>
          <input
            type="text"
            id="day"
            placeholder="DD"
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value)}
            className="date-picker-input"
          />
        </div>
        <div className="date-picker">
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            placeholder="YYYY"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="date-picker-input"
          />
        </div>
        <button className="clear-filter-button" onClick={clearFilters}>
          Clear Filter
        </button>
      </div>

      {/* Orders List */}
      {loading ? (
        <p>Loading order history...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="ordersHistory">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.order_id} className="order-Card">
                <div className="order-details">
                  <p><strong>Order No.:</strong> {order.order_id}</p>
                  <p><strong>From:</strong> {order.restaurantName}</p>
                  <p>
                    <strong>To:</strong> <a href="#">{order.customerAddress}</a>
                  </p>
                  <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                  <p><strong>Rs:</strong> {order.orderAmount}/-</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-orders-message">No completed orders found for the selected filters.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
