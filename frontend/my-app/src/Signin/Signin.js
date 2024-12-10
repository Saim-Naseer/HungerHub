import React from "react";
import Signup from "../Signup/Signup";
import "./Signin.css";
import Session from "../Session"

import Admin from "../Admin/Containers/App"
import Customer from "../Customer/Containers/App"
import Rider from "../Rider/Containers/App"
import Restaurant from "../Restaurant/Containers/App"

class Signin extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            pwd: "",
            meal:"",
            page: "signin",
            enter:"pwd",
            borderColor: {
                email: "#F8F8F8",
                pwd: "#F8F8F8",
                meal: "#F8F8F8"
            }
        };
    }

    enterField = () => {
        const borderColor1 = { ...this.state.borderColor };

        borderColor1.email = this.state.email === "" ? "red" : "#F8F8F8";
        borderColor1.pwd = this.state.pwd === "" ? "red" : "#F8F8F8";
        borderColor1.meal = this.state.meal === "" ? "red" : "#F8F8F8";

        this.setState({ borderColor: borderColor1 });
        
    };

    findUser =async()=>{
        const data = await fetch(`http://localhost:5000/customer/signin?email=${this.state.email}&pwd=${this.state.pwd}`)
        const data2 = await data.json()

        console.log(data2)

        if(data2.msg==="User not found")
        {
            alert("User not found")
        }
        else
        {
            alert("Signed In")
            this.setState({page:data2.type})
       
            Session.name=data2.name
            Session.email=data2.email
            Session.location=data2.location
            Session.address=data2.exact_address
            Session.phone=data2.phone

            if(data2.type==="customer")
            {
                Session.user_id=data2.Customer_id
            }
            else if(data2.type==="admin")
            {
                Session.user_id=data2.Admin_id
            }
            else if(data2.type==="rider")
            {
                Session.user_id=data2.Rider_id
            }
            else if(data2.type==="restaurant")
            {
                Session.user_id=data2.Restaurant_id
            }
        }
    }

    checkInputs = async() => {
        if (this.state.email !== "" && this.state.pwd !== "") {
            await this.findUser()
        } else {
            this.enterField();
        }
    };


    findUser2 =async()=>{
        const data = await fetch(`http://localhost:5000/customer/signin2?email=${this.state.email}&meal=${this.state.meal}`)
        const data2 = await data.json()

        console.log(data2)

        if(data2.msg==="User not found")
        {
            alert("User not found")
        }
        else
        {
            alert("Signed In")
            this.setState({page:data2.type})
       
            Session.name=data2.name
            Session.email=data2.email
            Session.location=data2.location
            Session.address=data2.exact_address
            Session.phone=data2.phone
            Session.image=data2.image

            if(data2.type==="customer")
            {
                Session.user_id=data2.Customer_id
            }
            else if(data2.type==="admin")
            {
                Session.user_id=data2.Admin_id
            }
            else if(data2.type==="rider")
            {
                Session.user_id=data2.Rider_id
            }
            else if(data2.type==="restaurant")
            {
                Session.user_id=data2.Restaurant_id
            }
        }
    }

    checkInputs2 = async() => {
        if (this.state.email !== "" && this.state.meal !== "") {
            await this.findUser2()
        } else {
            this.enterField();
        }
    };

    changePage = (pageName) => {
        this.setState({ page: pageName });
    };

    changeState = (state) =>{
        this.setState({enter:state})   
    }

    render() {
        let content;

        if (this.state.page === "signin" && this.state.enter==="pwd") {
            content = (
                <div className="background3">
                    <div className="box3">
                        <div className="left3">
                            <div className="logo13"></div>
                            <p className="title6">Hunger Hub</p>
                        </div>
                        <div className="right3">
                            <h1 className="title23">Sign In</h1>
                            <form
                                style={{
                                    display: "inline-block",
                                    position: "relative",
                                    left: "50px"
                                }}
                            >
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="email3"
                                    style={{
                                        borderColor: this.state.borderColor.email
                                    }}
                                    onChange={(event) =>
                                        this.setState({
                                            email: event.target.value
                                        })
                                    }
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="pwd3"
                                    style={{
                                        borderColor: this.state.borderColor.pwd
                                    }}
                                    onChange={(event) =>
                                        this.setState({
                                            pwd: event.target.value
                                        })
                                    }
                                />
                                <div
                                    className="button3"
                                    onClick={this.checkInputs}
                                >
                                    Sign In
                                </div>
                            </form>
                            <p className="account3">
                                Don't have an account{" "}
                                <span
                                    className="signup3"
                                    onClick={() =>
                                        this.changePage("signup")
                                    }
                                >
                                    SIGN UP
                                </span>
                            </p>
                            <p className="forget_pwd" onClick={()=>this.changeState("forget")}>Forgot Password</p>
                        </div>
                    </div>
                </div>
            );
        }else if (this.state.page === "signin" && this.state.enter==="forget") {
            content = (
                <div className="background3">
                    <div className="box3">
                        <div className="left3">
                            <div className="logo13"></div>
                            <p className="title6">Hunger Hub</p>
                        </div>
                        <div className="right3">
                            <h1 className="title23">Sign In</h1>
                            <form
                                style={{
                                    display: "inline-block",
                                    position: "relative",
                                    left: "50px"
                                }}
                            >
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="email3"
                                    style={{
                                        borderColor: this.state.borderColor.email
                                    }}
                                    onChange={(event) =>
                                        this.setState({
                                            email: event.target.value
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Favourite Meal"
                                    className="pwd3"
                                    style={{
                                        borderColor: this.state.borderColor.pwd
                                    }}
                                    onChange={(event) =>
                                        this.setState({
                                            meal: event.target.value
                                        })
                                    }
                                />
                                <div
                                    className="button3"
                                    onClick={this.checkInputs2}
                                >
                                    Sign In
                                </div>
                            </form>
                            <p className="account3">
                                Don't have an account{" "}
                                <span
                                    className="signup3"
                                    onClick={() =>
                                        this.changePage("signup")
                                    }
                                >
                                    SIGN UP
                                </span>
                            </p>
                            <p className="forget_pwd" onClick={()=>this.changeState("pwd")}>Enter&nbsp; Password&nbsp;</p>
                        </div>
                    </div>
                </div>
            );
        } 
        else if (this.state.page === "signup") {
            content = (
                <>
                    <Signup />
                </>
            );
        }
        else if(this.state.page === "admin")
        {
            content = (
                <>
                  <Admin />  
                </>
            )
        }
        else if(this.state.page === "customer")
        {
            content = (
                <>
                    <Customer />  
                </>
            )
        }
        else if(this.state.page === "rider")
        {
            content = (
                <>
                    <Rider />  
                </>
            )
        }
        else if(this.state.page === "restaurant")
        {
            content = (
                <>
                    <Restaurant />  
                </>
            )
        }

        return <>{content}</>;
    }
}

export default Signin;
