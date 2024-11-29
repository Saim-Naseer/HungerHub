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
                <div className="Navbar1">
                    <div className="logo" onClick={()=>this.resetRestaurantSession}></div>
                    <p className="title" >Hunger Hub</p>
                    <div className="profile"></div>
                </div>
            </>
        )
    }
}

export default NavbarTop;