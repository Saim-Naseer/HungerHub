import React from 'react';
import { CartContext } from './CartContext';
import "./Cart.css";
import Session from "../../../Session";
import CartItem from "./CartItem";
import R_Session from "./Session";



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
        // Fetch data once on mount
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        // Only fetch data when context's fetchTrigger changes
        if (this.context.fetchTrigger !== prevState.fetchTrigger) {
            this.fetchDataDebounced(); // Debounced fetch call
        }
    }

    fetchData = async () => {
        try {
            let uid;
            if(R_Session.group_order === 1){
                uid = R_Session.group_leaderId;
            }
            else{
                uid = Session.user_id;
            }

            const response = await fetch( `http://localhost:5000/customer/cart?uid=${uid}&rid=${R_Session.restaurant_id}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            this.setState({ items: data });

            const orderResponse = await fetch( `http://localhost:5000/customer/activeorder?uid=${Session.user_id}&rid=${R_Session.restaurant_id}`);
            if (!orderResponse.ok) {
                throw new Error(`Error: ${orderResponse.status}`);
            }
            const orderData = await orderResponse.json();
            this.setState({ price: orderData.price });
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };
    // Add this method inside your Cart class
    removeItemLocally = (itemIdToRemove, priceToSubtract) => {
        const updatedItems = this.state.items.filter(item => item.Item_id !== itemIdToRemove);
        const updatedPrice = this.state.price - priceToSubtract;
    
        this.setState({
            items: updatedItems,
            price: updatedPrice < 0 ? 0 : updatedPrice, // safety check
        });
    };
    

    
    // Debounce fetch calls
    fetchDataDebounced = (() => {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(this.fetchData, 500); // Delay fetch by 500ms
        };
    })();

    render() {
        const content = this.state.items.map((x) => (
            
            <CartItem
            key={x.Item_id}
            itemId={x.Item_id}  // ✅ Pass this so removeFromCart can work
            name={x.itemDetails.name}
            qty={x.qty}
            price={x.price}
            removeFromUI={this.removeItemLocally}
          />
          

        ));
        if(R_Session.group_order === 1 && R_Session.group_leaderId !== Session.user_id){
        return (
            <div className="c_cart">
                <p className="c_heading">Group Cart</p>
                <p className="c_hname">Item</p>
                <p className="c_hqty">Qty</p>
                <p className="c_hprice">Price</p>
                <div className="c_items">{content}</div>
                <div className="c_bill">
                    <p className="c_htotal">Total Amount:</p>
                    <p className="c_vtotal">Rs {this.state.price}/-</p>
                    <div className="c_cartOrder" onClick={() => this.props.pagefunc('confCart')}>Done From your side</div>
                </div>
            </div>
        );
        }
        else if(R_Session.group_order === 1 && R_Session.group_leaderId === Session.user_id){
            return(
            <div className="c_cart">
                <p className="c_heading">Group Cart</p>
                <p className="c_hname">Item</p>
                <p className="c_hqty">Qty</p>
                <p className="c_hprice">Price</p>
                <div className="c_items">{content}</div>
                <div className="c_bill">
                    <p className="c_htotal">Total Amount:</p>
                    <p className="c_vtotal">Rs {this.state.price}/-</p>
                    <div className="c_cartOrder" onClick={() => this.props.pagefunc('confCart')}>Order Now</div>
                </div>
            </div>
            );
        }
        else{
            return(
                <div className="c_cart">
                    <p className="c_heading">Your Cart</p>
                    <p className="c_hname">Item</p>
                    <p className="c_hqty">Qty</p>
                    <p className="c_hprice">Price</p>
                    <div className="c_items">{content}</div>
                    <div className="c_bill">
                        <p className="c_htotal">Total Amount:</p>
                        <p className="c_vtotal">Rs {this.state.price}/-</p>
                        <div className="c_cartOrder" onClick={() => this.props.pagefunc('confCart')}>Order Now</div>
                    </div>
                </div>
                );
        }
    }
}

export default Cart;
