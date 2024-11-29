import React from "react"
import Cart from "./Cart"
import Info from "./Info"
import Popular from "./Popular"

class Body extends React.Component{
    render()
    {

        return(
            <>
                <Info />
                <Popular/>
                <Cart/>
            </>
        )
    }
}


export default Body