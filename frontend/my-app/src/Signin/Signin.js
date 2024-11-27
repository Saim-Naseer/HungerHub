import React from "react";
import Signup from "../Signup/Signup";
import Home from "../Customer/Containers/App"
import "./Signin.css";

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

    checkInputs = () => {
        if (this.state.email !== "" && this.state.pwd !== "") {
            this.setState({ page: "home" });
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
                <div className="background">
                    <div className="box">
                        <div className="left">
                            <div className="logo1"></div>
                            <p className="title">Hunger Hub</p>
                        </div>
                        <div className="right">
                            <h1 className="title2">Sign In</h1>
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
                                    className="email"
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
                                    className="pwd"
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
                                    className="button"
                                    onClick={this.checkInputs}
                                >
                                    Sign In
                                </div>
                            </form>
                            <p className="account">
                                Don't have an account{" "}
                                <span
                                    className="signup"
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
        else if(this.state.page === "home")
        {
            content = (
                <>
                  <Home />  
                </>
            )
        }

        return <>{content}</>;
    }
}

export default Signin;
