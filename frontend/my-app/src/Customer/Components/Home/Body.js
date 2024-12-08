import React from 'react'
import Card from "./Card"
import Session from "../../../Session"
import "./Body.css"
import R_Session from "../Restaurant/Session"
import Restaurant from "../../Containers/Restaurant"

class Body extends React.Component{

    constructor()
    {
        super()
        this.state={
            restaurants:[],
            pastOrders:[],
            search:"",
            page:"home"
        }
    }

    fetchData = async() => {
        const restaurants = await fetch("http://localhost:5000/customer/restaurants?uid="+Session.user_id)
        const data = await restaurants.json()
        this.setState({restaurants:data})
    }

    componentDidMount()
    {
        this.fetchData()
    }

    changePage = (pageName) => {
        this.setState({page:pageName})
    }

    render()
    {
        const restaurants = this.state.restaurants

        const content1 = restaurants.filter((x)=>{
            return (
                x.name.toLowerCase().includes(this.state.search.toLowerCase()) ||  x.cusine.toLowerCase().includes(this.state.search.toLowerCase())
            )
        })

        const content2 = content1.map((x) => {
            return <Card key={x.Restaurant_id} name={x.name} cusine={x.cusine} image={x.image} onClick={()=>{R_Session.restaurant_id=x.Restaurant_id;  R_Session.name=x.name; R_Session.location=x.location; R_Session.image=x.image; R_Session.cusine=x.cusine; R_Session.exact_address=x.exact_address; this.changePage("restaurant")}}/>
        })


        let content

        if(this.state.page==="home")
        {
            content = (
                <>
                    <input type="text" className='c_searchbox' placeholder='Search' onChange={(event)=>{this.setState({search:event.target.value})}}/>
                    <div className='body_container'>
                        <div className='body1'>
                            {content2}
                        </div>
                    </div>
                </>
            )
        }
        else if(this.state.page==="restaurant")
        {
            content = (
                <Restaurant />
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