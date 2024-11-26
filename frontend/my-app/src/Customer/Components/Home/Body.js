import React from 'react'
import Card from "./Card"
import Session from "../../../Session"
import "./Body.css"

class Body extends React.Component{

    constructor()
    {
        super()
        this.state={
            restaurants:[]
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

    render()
    {
        const restaurants = this.state.restaurants

        const content = restaurants.map((x) => {
            return <Card key={x.id_} name={x.name} cusine={x.cusine} />
        })


        return(
            <>
                <div className='body_container'>
                    <div className='body1'>
                        {content}
                    </div>
                </div>
            </>
        )
    }
}

export default Body