import React, { useState, useEffect } from 'react';
import './orderHistory.css'; // Updated CSS file for styling
import Session from "../../../Session";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterDay, setFilterDay] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const restaurantId = Session.user_id;
        const response = await fetch(`http://localhost:5000/restaurant/history-orders?rid=${restaurantId}`);
        if (!response.ok) throw new Error('Failed to fetch order history.');

        const data = await response.json();
        setOrders(data.activeOrders || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load order history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const extractDateParts = (date) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = String(dateObj.getFullYear());
    return { day, month, year };
  };

  const filteredOrders = orders.filter((order) => {
    const { day, month, year } = extractDateParts(order.date);
    const isDayMatch = !filterDay || day === filterDay;
    const isMonthMatch = !filterMonth || month === filterMonth;
    const isYearMatch = !filterYear || year === filterYear;
    return isDayMatch && isMonthMatch && isYearMatch;
  });

  const clearFilters = () => {
    setFilterDay('');
    setFilterMonth('');
    setFilterYear('');
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
          Clear Filters
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
              <div key={order.Order_id} className="order-Card">
                <div className="order-details">
                  <p><strong>Order ID:</strong> {order.Order_id}</p>
                  <p><strong>Customer Name:</strong> {order.customerName}</p>
                  <p><strong>Rider Name:</strong> {order.riderName}</p>
                  <p><strong>Date:</strong> {order.date}</p>
                  <p><strong>Total Price:</strong> Rs. {order.totalPrice}/-</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-orders-message">No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
