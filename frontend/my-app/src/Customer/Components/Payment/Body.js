import React from "react"
import StatusBar from "./StatusBar3"
import Bill from "./Bill"
import "./Body.css"
import Waiting from "../../Containers/Waiting"
import Home from "../../Containers/Home"
import ConfCart from "../../Containers/ConfCart"

class Body extends React.Component{
    constructor()
    {
        super()
        this.state={
            page:"payment" 
        }
    }

    changePage=(pageName)=>{
        this.setState({page:pageName})
    }

    render()
    {
        let content

        if(this.state.page==="payment")
        {
            content=(
                <>
                    <StatusBar pagefunc={this.changePage}/>
                    <Bill/>
                    <div className="c_COD" onClick={()=>this.changePage("waiting")}></div>
                    <div className="c_Online" onClick={()=>this.changePage("waiting")}></div>
                </>
            )
        }
        else if(this.state.page==="waiting")
        {
            content=(
                <Waiting/>
            )
        }
        else if(this.state.page==="home")
        {
            content=(
                <Home/>
            )
        }
        else if(this.state.page==="confcart")
        {
            content=(
                <ConfCart/>
            )
        }


        return(
            <>
                {content}
            </>
        )
    }
}

export default Body