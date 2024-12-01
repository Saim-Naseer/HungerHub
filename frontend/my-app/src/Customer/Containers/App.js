import React from 'react'
import Home from "./Home"
import NavbarTop from "../Components/NavbarTop/NavbarTop"
//import U_Session from "../../Session"
//import Session from "../Session"

class App extends React.Component{
    // CreateSession= async()=>{
    //     const data2 = await fetch("http://localhost:5000/customer/StartOrder?uid="+U_Session.user_id)
    //     const data = data2.json

    //     Session.Order_id=data.Order_id
    //     Session.Cart_id=data.Cart_id
    // }

    // componentDidMount()
    // {
    //     this.CreateSession()
    // }

    render(){
        return(
            <>
                <NavbarTop/>
                <Home />
            </>
        )
    }
}

export default App