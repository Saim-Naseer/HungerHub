import React, { useState, useEffect } from 'react';
import './orderHistory.css'; // Updated CSS file for styling
import Session from "../../../Session";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]); // Store all orders
  const [filteredOrders, setFilteredOrders] = useState([]); // Store filtered orders
  const [loading, setLoading] = useState(true); // Show loading spinner
  const [error, setError] = useState(null); // Handle error messages

  // Filter states
  const [filterDay, setFilterDay] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const restaurantId = Session.user_id; // Assuming Session contains user details
        const response = await fetch(`http://localhost:5000/restaurant/history-orders?rid=${encodeURIComponent(restaurantId)}`);
        if (!response.ok) throw new Error('Failed to fetch order history.');

        const data = await response.json();
        const activeOrders = Array.isArray(data.activeOrders) ? data.activeOrders : [];
        setOrders(activeOrders);
        setFilteredOrders(activeOrders); // Initially, show all orders
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load order history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Extract day, month, and year from date string
  const extractDateParts = (date) => {
    const dateObj = new Date(date);
    if (isNaN(dateObj)) return { day: '', month: '', year: '' };
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = String(dateObj.getFullYear());
    return { day, month, year };
  };

  // Handle filtering of orders
  useEffect(() => {
    const applyFilters = () => {
      const filtered = orders.filter((order) => {
        const { day, month, year } = extractDateParts(order.date);
        const isDayMatch = !filterDay || day === filterDay;
        const isMonthMatch = !filterMonth || month === filterMonth;
        const isYearMatch = !filterYear || year === filterYear;
        return isDayMatch && isMonthMatch && isYearMatch;
      });
      setFilteredOrders(filtered);
    };

    applyFilters();
  }, [filterDay, filterMonth, filterYear, orders]);

  // Clear filters
  const clearFilters = () => {
    setFilterDay('');
    setFilterMonth('');
    setFilterYear('');
    setFilteredOrders(orders); // Reset filtered orders to all orders
  };

  return (
    <div className="order-history">
      <h2>Order History</h2>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="date-picker">
          <label htmlFor="month">Month:</label>
          <input
            type="text"
            id="month"
            placeholder="MM"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value.replace(/\D/g, '').slice(0, 2))}
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
            onChange={(e) => setFilterDay(e.target.value.replace(/\D/g, '').slice(0, 2))}
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
            onChange={(e) => setFilterYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
            className="date-picker-input"
          />
        </div>
        <button className="clear-filter-button" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {/* Orders List */}
      {loading ? (
        <p>Loading order history...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : filteredOrders.length > 0 ? (
        <div className="ordersHistory">
          {filteredOrders.map((order) => (
            <div key={order.Order_id || Math.random()} className="order-Card">
              <div className="order-details">
                <p><strong>Order ID:</strong> {order.Order_id || 'N/A'}</p>
                <p><strong>Customer Name:</strong> {order.customerName || 'N/A'}</p>
                <p><strong>Rider Name:</strong> {order.riderName || 'N/A'}</p>
                <p><strong>Date:</strong> {order.date || 'N/A'}</p>
                <p><strong>Total Price:</strong> Rs. {order.totalPrice ? `${order.totalPrice}/-` : 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-orders-message">No orders found for the selected criteria.</p>
      )}
    </div>
  );
};

export default OrderHistory;
