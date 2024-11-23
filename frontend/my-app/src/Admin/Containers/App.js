import React from 'react'
import NavbarTop from '../Components/NavbarTop/NavbarTop'
import NavbarLeft from '../Components/Home/NavbarLeft'
import Body from "../Components/Home/Body"


class App extends React.Component{
    render(){
        return(
            <div>
                <NavbarTop/>
                <Body/>
                <NavbarLeft/>
            </div>
        )
    }
}

export default App