import React from "react"
import NavbarLeft from "./NavbarLeft"
import Session from "../../../Session"
import "./Profile.css"

class Profile extends React.Component{
    constructor()
    {
        super()
        this.state={
            past:[],
            waiting:[]
        }
    }

    fetchData=async()=>{
        const data1 = await fetch(`http://localhost:5000/customer/pastorders?uid=${Session.user_id}`)
        const data2 = await data1.json()
        this.setState({past:data2})

        const data5 = await fetch(`http://localhost:5000/customer/waitingorder?uid=${Session.user_id}`)
        const data6 = await data5.json()
        this.setState({waiting:data6})
    }

    componentDidMount=async()=>{
        await this.fetchData()
    }

    render()
    {
        return(
            <>
                <NavbarLeft/>
            </>
        )
    }
}

export default Profile