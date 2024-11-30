import React from "react"
import Cart from "./Cart"
import Info from "./Info"
import Popular from "./Popular"
import Menu from "./Menu"
import { CartProvider } from "./CartContext"
import ConfCart from "../../Containers/ConfCart"

class Body extends React.Component{
    constructor()
    {
        super()
        this.state={
            page:"restaurant"
        }
    }

    pageChange = (pageName) =>{
        this.setState({page:pageName})
    }

    render()
    {
        let content
        if(this.state.page==="restaurant")
        {
            content = (
                <CartProvider>
                    <>
                        <Info />
                        <Popular/>
                        <Menu />
                        <Cart pagefunc={this.pageChange}/>
                    </>
                </CartProvider>
            )
        }
        else if(this.state.page==="confCart")
        {
            content = (
                <>
                    <ConfCart />
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


export default Body