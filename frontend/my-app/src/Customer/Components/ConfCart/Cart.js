import React from 'react';
import "./Cart.css"
import Session from "../../../Session"
import CartItem from "../Restaurant/CartItem"
import R_Session from "../Restaurant/Session"



class Cart extends React.Component{
    constructor()
    {
        super()
        this.state={
            items:[],
            price:0,
            
        }
    }


    
    fetchData = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/customer/cart?uid=${Session.user_id}&rid=${R_Session.restaurant_id}`
            );
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            this.setState({ items: data });

            const orderResponse = await fetch(
                `http://localhost:5000/customer/activeorder?uid=${Session.user_id}&rid=${R_Session.restaurant_id}`
            );
            if (!orderResponse.ok) {
                throw new Error(`Error: ${orderResponse.status}`);
            }
            const orderData = await orderResponse.json();
            this.setState({ price: orderData.price });
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };



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
                    <p className="c_htotal1">Total:</p>
                    <p className="c_vtotal1">Rs {this.state.price}/-</p>
                    <div className='c_cartOrder1' onClick={()=>this.props.pagefunc("home")} >Add More Items</div>
                </div>
            </>
        )
    }
}


export default Cart