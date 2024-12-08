import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import GetNewOrders from './GetNewOrders';
import OrderHIstory from './OrderHistory';
import OrderDetail from './OrderDetail';
import NavigationBar from './NavigationBar';
import OrderHistory from './OrderHistory';
import Profile from './Profile';
import Chat from './Chat';
import Reports from './Reports';
import Signin from '../../Signin/Signin';

const App = () => {
  return (
    <Router>
      <div className="rider-main">
        <NavigationBar />
        <div className="rider-content">
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/OrderDetail/:id" element={<OrderDetail />} />
            <Route path="/GetNewOrders/:id" element={<GetNewOrders />} />
            <Route path="/OrderHistory/:id" element={<OrderHistory />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Reports/:id" element={<Reports />} />
            <Route path="/Signin" element={<Signin />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
