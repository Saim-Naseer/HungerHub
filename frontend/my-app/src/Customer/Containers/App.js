import React from 'react'
import Home from "./Home"
import NavbarTop from "../Components/NavbarTop/NavbarTop"
import Profile from "../Components/NavbarTop/Profile"

class App extends React.Component{
    constructor()
    {
        super()
        this.state={
            page:"default"
        }
    }

    changePage = (pageName) => {
        console.log("ChangePage called with:", pageName); // Debugging
        this.setState({ page: pageName });
    }

    render(){
        let content

        if(this.state.page==="default")
        {
            content=(
                <>
                    <NavbarTop pagefunc={(pageName) => {this.changePage(pageName)}}/>
                    <Home />
                </>
            )
        }
        else if(this.state.page==="profile")
        {
            content=(
                <>
                    <NavbarTop pagefunc={(pageName) => {this.changePage(pageName)}}/>
                    <Profile />
                </>
            )
        }
        else if(this.state.page==="home")
        {
            content=(
                <>
                    <NavbarTop pagefunc={(pageName) => {this.changePage(pageName)}}/>
                    <Home />
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

export default App