// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import NavbarTop from '../Components/NavbarTop/NavbarTop';
import Profile from '../Components/NavbarTop/Profile';
import RestaurantReport from '../Components/NavbarTop/RestaurantReport';
import RiderReport from "../Components/NavbarTop/RiderReport"
import Waiting from "./Waiting"

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavbarTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/restaurant-report" element={<RestaurantReport />} />
          <Route path="/rider-report" element={<RiderReport />} />
          <Route path="/waiting" element={<Waiting/>}/>
        </Routes>
      </Router>
    );
  }
}

export default App;
