import React from "react"
import "./NavbarLeft.css"
import Session from "../../../Session"

class NavbarLeft extends React.Component{

    render()
    {
        return(
            <div className="navbar1">
                <div className="navbar_profile">
                    <p><b>Name : </b>{Session.name} </p>
                    <p><b>Email :</b>{Session.email}</p>
                    <p><b>Phone : </b>0{Session.phone}</p>
                    <p><b>Address :</b>{Session.address}</p>
                    <p><b>Region :</b>{Session.location}</p>
                </div>
                <div className="navbar_update">Edit Info</div>
            </div>
        )
    }
}

export default NavbarLeft;