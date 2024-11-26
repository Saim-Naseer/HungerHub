import React from 'react'
import NavbarTop from '../Components/NavbarTop/NavbarTop'
import Body from "../Components/Home/Body"


class App extends React.Component{
    render(){
        return(
            <div>
                <NavbarTop/>
                <Body/>
            </div>
        )
    }
}

export default App