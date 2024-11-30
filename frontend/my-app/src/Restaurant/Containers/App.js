import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavbarTop from '../Components/NavbarTop/NavbarTop'
import NavbarLeft from '../Components/Home/NavbarLeft'
import Body from "../Components/Home/Body"
import VoucherGenerator from "../Components/VoucherGenerator/VoucherGenerator.js";
import EditMenu from "../Components/EditMenu/EditMenu.js";
import Orders from "../Components/orders/order.js";
import Reports from "../Components/Reports/Reports.js";


const App = () => {
    return (
        <Router>
        <div className="app">
          <NavbarTop/> 
          <div className="main-content">
            <Body/>
            <NavbarLeft/>
            <Routes>
              <Route path="/" element={<Orders />} />
              <Route path="/EditMenu" element={<EditMenu />} />
              <Route path="/VoucherGenerator" element={<VoucherGenerator />} />
              <Route path="/Reports" element={<Reports />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  };

export default App