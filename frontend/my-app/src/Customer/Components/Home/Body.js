import React from 'react'
import Card from "./Card"
import Session from "../../../Session"
import "./Body.css"

class Body extends React.Component{

    constructor()
    {
        super()
        this.state={
            restaurants:[],
            pastOrders:[],
            search:""
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

        const content1 = restaurants.filter((x)=>{
            return (
                x.name.toLowerCase().includes(this.state.search.toLowerCase()) ||  x.cusine.toLowerCase().includes(this.state.search.toLowerCase())
            )
        })

        const content = content1.map((x) => {
            return <Card key={x.id_} name={x.name} cusine={x.cusine} image={x.image}/>
        })

        return(
            <>
                <input type="text" className='c_searchbox' placeholder='Search' onChange={(event)=>this.setState({search:event.target.value})}/>
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