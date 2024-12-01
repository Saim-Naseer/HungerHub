import React from "react"
import "./NavbarLeft.css"
import Session from "../../../Session"

class NavbarLeft extends React.Component{

    render()
    {
        return(
            <div className="navbar1">
                <p>Name : {Session.name} </p>
                <p>Email : {Session.email}</p>
                <p>Phone : </p>
                <p>Address : </p>
            </div>
        )
    }
}

export default NavbarLeft;