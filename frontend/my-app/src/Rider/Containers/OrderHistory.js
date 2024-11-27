import React, { useState } from 'react';
import '../Styles/OrderHistory.css'; // Add your CSS file for styling

const OrderHistory = () => {
  // Sample order data
  const [orders] = useState([
    {
      id: 1,
      orderNo: '001',
      from: 'Lahori Restaurant',
      fromAddress: 'Valencia Town, Lahore',
      to: 'Customer Address',
      date: '25/11/2024',
      amount: 800,
      timeElapsed: '45 minutes',
    },
    {
      id: 2,
      orderNo: '002',
      from: 'Cheezious',
      fromAddress: 'Johar Town, Lahore',
      to: 'Customer Address',
      date: '24/11/2024',
      amount: 1200,
      timeElapsed: '30 minutes',
    },
    {
      id: 3,
      orderNo: '003',
      from: 'Pizza Hut',
      fromAddress: 'DHA, Lahore',
      to: 'Customer Address',
      date: '15/10/2024',
      amount: 1500,
      timeElapsed: '50 minutes',
    },
    {
      id: 4,
      orderNo: '004',
      from: 'McDonalds',
      fromAddress: 'Gulberg, Lahore',
      to: 'Customer Address',
      date: '25/11/2023',
      amount: 700,
      timeElapsed: '40 minutes',
    },
  ]);


  // State for filters
  const [filterDay, setFilterDay] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  

  // Filter orders based on user input
  const filteredOrders = orders.filter((order) => {
    const [day, month, year] = order.date.split('/'); // Split the date into day, month, and year
    return (
      (!filterDay || day === filterDay) &&
      (!filterMonth || month === filterMonth) &&
      (!filterYear || year === filterYear)
    );
  });


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
        <button className="clear-filter-button" onClick={clearFilters}>Clear Filter</button>
      </div>

      {/* Orders List */}
      <div className="orders">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="order-Card">
              <div className="order-details">
                <p><strong>Order No.:</strong> {order.orderNo}</p>
                <p>
                  <strong>From:</strong> {order.from}, {order.fromAddress}
                </p>
                <p>
                  <strong>To:</strong> <a href="#">{order.to}</a>
                </p>
                <p>
                  <strong>Date/Time:</strong> {order.date}
                </p>
                <p>
                  <strong>Rs:</strong> {order.amount}/-
                </p>
                <p><strong>Completed in:</strong> {order.timeElapsed}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-orders-message">No completed orders found for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
