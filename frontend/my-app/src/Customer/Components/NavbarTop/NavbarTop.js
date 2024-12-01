import React from "react"
import "./NavbarTop.css"
import "./HH_logo.png"
import App from "../../Containers/App"
import R_Session from "../Restaurant/Session"
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

class NavbarTop extends React.Component{
    constructor()
    {
        super()
    }

    resetRestaurantSession = () => {
        R_Session.restaurant_id=0
        R_Session.name=""
        R_Session.location=""
    }

    render()
    {

        return(
            <>
                <div className="Navbar2">
                    <div className="logo2" onClick={()=>this.resetRestaurantSession}></div>
                    <p className="title2" >Hunger Hub</p>
                    <div className="profile2"></div>
                </div>
            </>
        )
    }
}

export default NavbarTop;