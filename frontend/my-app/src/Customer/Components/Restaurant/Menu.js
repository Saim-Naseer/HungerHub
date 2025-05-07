import React from  "react"
import R_Session from "./Session"
import Item from "./Item"
import "./Popular.css"

class Menu extends React.Component{
    constructor()
    {
        super()
        this.state={
            items:[]
        }
    }

    fetchData = async() => {
        const arr = await fetch("http://localhost:5000/customer/items?rid="+R_Session.restaurant_id)
        const data = await arr.json()
        this.setState({items:data})
    }

    componentDidMount(){
        this.fetchData()
    }


    render()
    {
        const content = this.state.items.map((x)=>{
            return <Item key={x.Item_id} name={x.name} price={x.price} Item_id={x.Item_id}/>
        })

        let content1

        if(this.state.items.length=== 0)
        {
            content1 = (<></>)
        }
        else
        {
            content1 = (
                <>
                    <div className="c_popitems">
                        <h2 className="c_menuheading">Regular Items</h2>
                        {content}
                    </div>
                </>
            )
        }

        return(
            <>
                {content1}
            </>
        )
    }
}

export default Menu