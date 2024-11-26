import React from 'react'
import "./App.css"
import Admin from "./Admin/Containers/App"
import Customer from "./Signin/Signin"
import Rider from "./Rider/Containers/App"
import Restaurant from "./Restaurant/Containers/App"

class App extends React.Component{
    constructor()
    {
        super()
        this.state = {
            page:"home"
        }
    }

    changepage = (pagename) => {
        this.setState({page:pagename});
    }

    render(){

        let content;

        if(this.state.page==="home")
        {
            content = (
            <div className='window'>
                <div className='main-box'>
                    <div className='option' onClick={() => this.changepage("admin")}>
                        <p className='text'>Admin</p>
                    </div>
                    <div className='option' onClick={() => this.changepage("customer")}>
                        <p className='text'>Customer</p>
                    </div>
                    <div className='option' onClick={() => this.changepage("rider")}>
                        <p className='text'>Rider</p>
                    </div>
                    <div className='option' onClick={() => this.changepage("restaurant")}> 
                        <p className='text'>Restaurant</p>
                    </div>
                </div>
            </div>)
        }
        else if(this.state.page==="customer")
        {
            content=(<Customer/>)
        }
        else if(this.state.page==="restaurant")
        {
            content=(<Restaurant/>)
        }
        else if(this.state.page==="rider")
        {
            content=(<Rider/>)
        }
        else if(this.state.page==="admin")
        {
            content=(<Admin/>)
        } 


        return(
            <>
            {content}
            </>
        )            
    }
}

export default App