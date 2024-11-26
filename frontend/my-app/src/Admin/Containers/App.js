import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from '../Pages/Backgrounds/Background.js';
import Main_Resturant from '../Pages/Resturants/Main/Main_Resturant.js';
import Main_Customer from '../Pages/Customers/Main/Main_Customers.js';
import Main_Driver from '../Pages/Drivers/Main/Main_Drivers.js';
import Main_Customers from '../Pages/Customers/Main/Main_Customers.js';
import Main_Resturant_Details from '../Pages/Resturants/ResturantsDetail/main/_Main.js';
import Main_Customer_Details from '../Pages/Customers/CustomersDetail/main/main_CustomersDetail.js';
import Main_Drivers_Details from '../Pages/Drivers/DriversDetail/main/main_DriversDetail.js';
import Main_Report from '../Pages/Reports/Main_Report/main_report.js';
import Main_Resturant_Report from '../Pages/Reports/Resturants_Report/Main/main_resturants_report.js';
import Main_Rider_Report from '../Pages/Reports/Riders_Report/Main/main_riders_report.js';
import Main_Home from '../Pages/Home/Main/main_home.js'
import './App.css'

class App extends React.Component{
  render(){
      return(
          <div>
            <Router>
              <Routes>
                <Route path="/" element={<Main_Home />} />
                <Route path="/background" element={<Background />} />
                <Route path="/resturants" element={<Main_Resturant />} />
                <Route path="/customers" element={<Main_Customer />} />
                <Route path="/drivers" element={<Main_Driver />} />
                <Route path="/customers" element={<Main_Customers />} />
                <Route path="/resturant/:id" element={<Main_Resturant_Details />} />
                <Route path="/customer/:id" element={<Main_Customer_Details />} />
                <Route path="/driver/:id" element={<Main_Drivers_Details />} />
                <Route path="/report" element={<Main_Report />} />
                <Route path="/resturant-report" element={<Main_Resturant_Report />} />
                <Route path="/rider-report" element={<Main_Rider_Report />} />
              </Routes>
            </Router>
          </div>
        )
    }
}

export default App
