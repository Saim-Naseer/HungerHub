import React from "react"
import Signup from "../Signup/Signup"
import "./Signin.css"

class Signin extends React.Component {
    constructor()
    {
        super()
        this.state={
            email:"",
            pwd:"",
            page:"signin"
        }
    }

    checkInputs = () =>{

    }


    changePage = (pageName) =>{
        this.setState({page:pageName})
    }

    render(){

        let content;

        if(this.state.page==="signin")
        {
            content = (
                <div className="background">
                    <div className="box">
                        <div className="left">
                            <div className="logo1"></div>
                            <p className="title">Hunger Hub</p>
                        </div>
                        <div className="right">
                            <h1 className="title2">Sign In</h1>
                            <form style={{display:'inline-block',position:'relative',left:'50px'}}>
                                <input type="email" placeholder="Email" className="email" onChange={(event) => this.setState({email:event})}/>
                                <input type="password" placeholder="Password" className="pwd" onChange={(event) => this.setState({pwd:event})}/>
                                <div className="button" onClick={this.checkInputs}>Sign In</div>
                            </form>
                            <p className="account">Don't have a account <p className="signup" onClick={() => this.changePage("signup")}>SIGN UP</p></p>
                        </div>
                        
                    </div>
                </div>
            )
        }
        else if(this.state.page==="signup")
        {
            content = (
                <>
                    <Signup />
                </>
            )
        }

        return(
            <>
                {content}
            </>
        )
    }
}

export default Signin