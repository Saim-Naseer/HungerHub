import React from "react"
import "./NavbarTop.css"
import "./HH_logo.png"
import { Link } from 'react-router-dom';


const NavbarTop=()=>{
    return(
        <div className="Navbar">
             <div className="logo"></div>
            <p className="title">Hunger Hub</p>
            <div className="profile"></div>
            <div className="nav-buttons">
                <Link to="/" className="nav-button">Orders</Link>
                <Link to="/EditMenu" className="nav-button">Edit Menu</Link>
                <Link to="/VoucherGenerator" className="nav-button">Generate Vouchers</Link>
                <Link to="/Reports" className="nav-button">Reports</Link>
            </div>
        </div>
    )
}

export default NavbarTop;