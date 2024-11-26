import React from "react"
import Signin from "../Signin/Signin"
import "./Signup.css"

class Signup extends React.Component{
    constructor()
    {
        super()
        this.state={
            email:"",
            pwd:"",
            page:"signup"
        }
    }

    changePage = (pageName) => {
        this.setState({page:pageName})
    }


    render()
    {

        let content;

        if (this.state.page==="signup")
        {
            content = (
                <div className="signup_background">
                        <div className="menu">
                        <input type="text" placeholder="Name"  className="name1"/>
                        <input type="email" placeholder="Email"  className="email1"/>
                        <select className="role">
                            <option>Customer</option>
                            <option>Restaurant</option>
                            <option>Rider</option>
                        </select>
                        <select className="region">
                            <option>1) Shahdara, Badami Bagh, Ravi Town</option>
                            <option>2) Inner Lahore, Anarkali, Data Darbar, Circular Road</option>
                            <option>3) Liberty Market, MM Alam Road, Ghalib Market, Main Boulevard</option>
                            <option>4) Model Town, Garden Town, Faisal Town, Township</option>
                            <option>5) DHA Phases 1-8, Lahore Cantt, Walton</option>
                            <option>6) Johar Town, Wapda Town, Valencia Town</option>
                            <option>7) Allama Iqbal Town, Sabzazar, Samanabad</option>
                            <option>8) Bahria Town, NFC Society, Canal Road extensions</option>
                        </select>
                        <input type="password" placeholder="Password" className="pwd1"/>
                        <input type="password" placeholder="Confirm Password" className="pwd2"/>
                        <h1 className="title3">SIGN UP</h1>
                        <div className="button1">Sign Up</div>
                        <p className="account1">Already have an account <p className="signup" onClick={()=> this.changePage("signin")}>SIGN IN</p></p>
                    </div>
                </div>
            )
        }
        else if(this.state.page==="signin")
        {
            content = (
                <Signin />
            )
        }

        return(
            <>
                {content}
            </>
        )
    }
}

export default Signup
