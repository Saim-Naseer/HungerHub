import React from "react"
import NavbarTop from "../Components/NavbarTop/NavbarTop"
import Body from "../Components/Restaurant/Body"

class Restaurant extends React.Component{
    render()
    {
        return(
            <>
                <NavbarTop/>
                <Body/>
            </>
        )
    }
}


export default Restaurant