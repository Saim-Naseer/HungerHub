import React from 'react';
import { CartContext } from './CartContext';
import "./Cart.css"
import Session from "../../../Session"
import CartItem from "./CartItem"




class Cart extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            price: 0,
        };
    }

    static contextType = CartContext;

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.context.fetchTrigger !== prevState.fetchTrigger) {
            this.fetchData();
        }
    }

    fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/customer/cart?uid=${Session.user_id}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            this.setState({ items: data });

            const orderResponse = await fetch(`http://localhost:5000/customer/activeorder?uid=${Session.user_id}`);
            if (!orderResponse.ok) {
                throw new Error(`Error: ${orderResponse.status}`);
            }
            const orderData = await orderResponse.json();
            this.setState({ price: orderData.price });
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };

    render() {
        const content = this.state.items.map((x) => (
            <CartItem name={x.itemDetails.name} price={x.price} qty={x.qty} />
        ));

        return (
            <div className="c_cart">
                <p className="c_heading">Your Cart</p>
                <p className="c_hname">Name</p>
                <p className="c_hprice">Price</p>
                <p className="c_hqty">Qty</p>
                <div className="c_items">{content}</div>
                <div className="c_bill">
                    <p className="c_htotal">Total</p>
                    <p className="c_vtotal">Rs {this.state.price}/-</p>
                    <div className="c_cartOrder" onClick={() => this.props.pagefunc('confCart')}>Order Now</div>
                </div>
            </div>
        );
    }
}


export default Cart