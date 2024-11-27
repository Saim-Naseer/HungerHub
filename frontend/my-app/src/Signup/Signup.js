import React from "react"
import Signin from "../Signin/Signin"
import Home from "../Customer/Containers/App"
import "./Signup.css"

class Signup extends React.Component{
    constructor()
    {
        super()
        this.state={
            name:"",
            email:"",
            role:"-",
            region:"-",
            pwd:"",
            cpwd:"",
            page:"signup",
            borderColor:{
                name:"#F8F8F8",
                email:"#F8F8F8",
                role:"#F8F8F8",
                region:"#F8F8F8",
                pwd:"#F8F8F8",
                cpwd:"#F8F8F8"
            },
            match:true
        }
    }


    enterField = () => {
        
        const borderColor1 = {...this.state.borderColor}

        borderColor1.name = (this.state.name==="") ? "red" : "#F8F8F8";
        borderColor1.email = (this.state.email==="") ? "red" : "#F8F8F8";
        borderColor1.role = (this.state.role==="-") ? "red" : "#F8F8F8";
        borderColor1.region = (this.state.region==="-") ? "red" : "#F8F8F8";
        borderColor1.pwd = (this.state.pwd==="") ? "red" : "#F8F8F8";
        borderColor1.cpwd = (this.state.cpwd==="") ? "red" : "#F8F8F8";

        this.setState({borderColor:borderColor1})
    }

    checkInputs = () => {
        if(this.state.name!=="" & this.state.email!=="" & this.state.role!=="-" & this.state.region!=="-" & this.state.pwd!=="" & this.state.cpwd!=="")
        {
            if(this.state.pwd===this.state.cpwd)
            {
                this.setState({page:"home"})

                //api post(user)
            }
            else{
                this.setState({match:false})
            }
        }
        else if(this.state.pwd===this.state.cpwd)
        {
            this.enterField()
        }
        else{
            this.setState({match:false})
            this.enterField()
        }
    }

    changePage = (pageName) => {
        this.setState({page:pageName})
    }


    render()
    {

        let content;

        let content1 = (
            <div className="signup_background">
                <div className="menu">
                    <input type="text" placeholder="Name"  className="name1" style={{borderColor:this.state.borderColor.name}} onChange={(event)=>this.setState({name:event.target.value})}/>
                    <input type="email" placeholder="Email"  className="email1" style={{borderColor:this.state.borderColor.email}} onChange={(event)=>this.setState({email:event.target.value})}/>
                    <select className="role" style={{borderColor:this.state.borderColor.role}} onChange={(event)=>this.setState({role:event.target.value})}>
                        <option>-</option>
                        <option>Customer</option>
                        <option>Restaurant</option>
                        <option>Rider</option>
                    </select>
                    <select className="region" style={{borderColor:this.state.borderColor.region}} onChange={(event)=>this.setState({region:event.target.value})}>
                        <option>-</option>
                        <option>Shahdara, Badami Bagh, Ravi Town</option>
                        <option>Inner Lahore, Anarkali, Data Darbar, Circular Road</option>
                        <option>Liberty Market, MM Alam Road, Ghalib Market, Main Boulevard</option>
                        <option>Model Town, Garden Town, Faisal Town, Township</option>
                        <option>DHA Phases 1-8, Lahore Cantt, Walton</option>
                        <option>Johar Town, Wapda Town, Valencia Town</option>
                        <option>Allama Iqbal Town, Sabzazar, Samanabad</option>
                        <option>Bahria Town, NFC Society, Canal Road extensions</option>
                    </select>
                    <input type="password" placeholder="Password" className="pwd1" style={{borderColor:this.state.borderColor.pwd}} onChange={(event)=>this.setState({pwd:event.target.value})}/>
                    <input type="password" placeholder="Confirm Password" className="pwd2" style={{borderColor:this.state.borderColor.cpwd}} onChange={(event)=>this.setState({cpwd:event.target.value})}/>
                    <h1 className="title3">SIGN UP</h1>
                    <div className="button1" onClick={()=>this.checkInputs()}>Sign Up</div>
                    <p className="account1">Already have an account <p className="signup" onClick={()=> this.changePage("signin")}>SIGN IN</p></p>
                </div>
            </div>
        )

        if (this.state.page==="signup" & this.state.match===true)
        {
            content = (
                <>
                    {content1}
                </>
            )
        }
        else if(this.state.page==="signup" & this.state.match===false)
        {
            content = (
                <>
                    {content1}
                    <p style={{color:"red",position:"relative",bottom:"173px",left:"500px"}}>Your passwords don't match</p>
                </>
            )
        }
        else if(this.state.page==="signin")
        {
            content = (
                <Signin />
            )
        }
        else if(this.state.page==="home")
        {
            content = (
                <Home />
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
