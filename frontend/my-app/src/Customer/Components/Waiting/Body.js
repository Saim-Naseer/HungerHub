import React from "react"
import StatusBar from "./StatusBar4"
import Session from "../../../Session"
import Completed from "../../Containers/Completed"
import Preparing from "./Preparing"
import Delivering from "./Delivering"
import R_Session from "../Restaurant/Session"

class Body extends React.Component{
    constructor()
    {
        super()
        this.state={
            isReady:false,
            completed:false,
            page:"waiting"
        }
    }

    fetchData=async()=>{
        const data3 = await fetch(`http://localhost:5000/customer/activeorder?uid=${Session.user_id}&rid=${R_Session.restaurant_id}`)
        const data4 = await data3.json()
        this.setState({isReadt:data4.isReady})
        this.setState({completed:data4.completed})

    }

    changePage=(pageName)=>{
        this.setState({page:pageName})
    }
    
    componentDidMount() 
    {
        this.fetchData();

        this.interval = setInterval(this.fetchData, 3000);
    }
    
    componentWillUnmount() 
    {
        clearInterval(this.interval);
    }

    render()
    {
          let content

          if(this.state.isReady===false)
          {
            content = (
                <>
                    <StatusBar/>
                    <Preparing/>
                </>
            )
          }
          else if(this.state.isReady===true & this.state.completed===false)
          {
            content = (
                <>
                    <StatusBar/>
                    <Delivering/>
                </>
            )
          }
          else{
                content = (
                    <>
                        <Completed/>
                    </>
                )
          }

        return (
            <>
                {content}
            </>
        )
    }
}

export default Body