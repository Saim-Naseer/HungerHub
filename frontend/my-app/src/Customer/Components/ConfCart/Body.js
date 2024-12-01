import React from "react"
import StatusBar from "./StatusBar2"
import Cart from "./Cart"
import Home from "../../Containers/Home"
import "./Body.css"
import Payment from "../../Containers/Payment"

class Body extends React.Component{
    constructor()
    {
        super()
        this.state={
            page:"confCart"
        }
    }

    changePage=(pageName)=>{
        this.setState({page:pageName})
    }

    render()
    {
        let content

        if(this.state.page==="confCart")
        {
            content=(
                <>
                    <StatusBar pagefunc={this.changePage}/>
                    <Cart pagefunc={this.changePage}/>
                    <div className="c_confirmOrder"  onClick={()=>this.changePage("payment")}>Confirm Order</div>
                </>
            )
        }
        else if(this.state.page==="home")
        {
            content=(
                <Home />
            )
        }
        else if(this.state.page==="payment")
        {
            content=(
                <Payment />
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