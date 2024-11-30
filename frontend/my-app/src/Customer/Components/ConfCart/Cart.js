import React from 'react';
import "./Cart.css"
import Session from "../../../Session"
import CartItem from "../Restaurant/CartItem"




class Cart extends React.Component{
    constructor()
    {
        super()
        this.state={
            items:[],
            price:0,
            
        }
    }


    
    fetchData = async() =>{
        const data2 = await fetch("http://localhost:5000/customer/cart?uid="+Session.user_id)
        const data = await data2.json()
        this.setState({items:data})

        const data3 = await fetch("http://localhost:5000/customer/activeorder?uid="+Session.user_id)
        const data4 = await data3.json()
        this.setState({price:data4.price})
    }



    componentDidMount()
    {
        this.fetchData()
    }

    render()
    {
       // this.fetchData()


        let content=(<></>)

        if(this.state.items)
        {
            content = this.state.items.map((x)=>{
                return <CartItem name={x.itemDetails.name} price={x.price} qty={x.qty} />
            })
        }
        

        return(
            <>
                <div className="c_cart1">
                    <p className="c_heading1">Your Cart</p>
                    <p className="c_hname1">Name</p>
                    <p className="c_hprice1">Price</p>
                    <p className="c_hqty1">Qty</p>
                    <div className="c_items1">
                        {content}
                    </div>
                    <p className="c_htotal1">Total</p>
                    <p className="c_vtotal1">Rs {this.state.price}/-</p>
                    <div className='c_cartOrder1' onClick={()=>this.props.pagefunc("home")} >Add More Items</div>
                </div>
            </>
        )
    }
}


export default Cart