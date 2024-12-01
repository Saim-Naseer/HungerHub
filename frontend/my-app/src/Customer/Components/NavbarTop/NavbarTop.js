import React from "react"
import "./NavbarTop.css"
import "./HH_logo.png"
import R_Session from "../Restaurant/Session"

class NavbarTop extends React.Component{
    constructor(props)
    {
        super(props)
        const { pagefunc } = props;
        this.state={
            page:"",
            val:1,
            curentPageFunc:pagefunc
        }
    }

    resetRestaurantSession = () => {
        R_Session.restaurant_id=0
        R_Session.name=""
        R_Session.location=""
    }

    render()
    {

        if(this.state.val===1)
        {
            console.log(this.state.curentPageFunc)
            this.setState({val:2})
        }

        return(
            <>
                <div className="Navbar4">
                    <div className="logo4" onClick={()=>this.state.curentPageFunc("home")}></div>
                    <p className="title4" >Hunger Hub</p>
                    <div className="profile4" onClick={()=>this.state.curentPageFunc("profile")}></div>
                </div>
            </>
        )
    }
}



export default NavbarTop;