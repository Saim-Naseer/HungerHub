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
            page: "signin",
            borderColor: {
                email: "#F8F8F8",
                pwd: "#F8F8F8"
            }
        };
    }

    enterField = () => {
        const borderColor1 = { ...this.state.borderColor };

        borderColor1.email = this.state.email === "" ? "red" : "#F8F8F8";
        borderColor1.pwd = this.state.pwd === "" ? "red" : "#F8F8F8";

        this.setState({ borderColor: borderColor1 });
        
    };

    findUser =async()=>{
        const data = await fetch(`http://localhost:5000/customer/signin?email=${this.state.email}&pwd=${this.state.pwd}`)
        const data2 = await data.json()
        this.setState({page:data2.type})

        Session.name=data2.name
        Session.email=data2.email
        Session.location=data2.location

        if(this.state.type==="customer")
        {
            Session.user_id=data2.Customer_id
        }
        else if(this.state.type==="admin")
        {
            Session.user_id=data2.Admin_id
        }
        else if(this.state.type==="rider")
        {
            Session.user_id=data2.Rider_id
        }
        else if(this.state.type==="restaurant")
        {
            Session.user_id=data2.Restaurant_id
        }

    }

    checkInputs = async() => {
        if (this.state.email !== "" && this.state.pwd !== "") {
            await this.findUser()
        } else {
            this.enterField();
        }
    };

    changePage = (pageName) => {
        this.setState({ page: pageName });
    };

    render() {
        let content;

        if (this.state.page === "signin") {
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
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.page === "signup") {
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
