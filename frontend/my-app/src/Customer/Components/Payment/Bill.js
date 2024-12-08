import React from "react";
import "./Bill.css";
import Session from "../../../Session";
import Discount from "./Discount";
import R_Session from "../Restaurant/Session"

class Bill extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            discounts: [],
            discount_prompt: false,
            order:{},
            subtotal:0,
            delivery:100,
            platform:50,
            discount:0,
            total:0
        };
    }

    fetchData = async () => {
        const data2 = await fetch(`http://localhost:5000/customer/cart?uid=${Session.user_id}&rid=${R_Session.restaurant_id}`);
        const data3 = await data2.json();
        this.setState({ data: data3 });

        const data4 = await fetch(`http://localhost:5000/customer/discounts?uid=${Session.user_id}&rid=${R_Session.restaurant_id}`);
        const data5 = await data4.json();
        this.setState({ discounts: data5 });

        const data6 = await fetch(`http://localhost:5000/customer/activeorder?uid=${Session.user_id}&rid=${R_Session.restaurant_id}`);
        const data7 = await data6.json();
        this.setState({ order: data7 });

        const {order,delivery,platform,discount} = this.state

        this.setState({subtotal:order.price})

        const num = order.price + delivery + platform + discount
        this.setState({total: num})


    };

    componentDidMount() 
    {
        this.fetchData();

        this.interval = setInterval(this.fetchData, 3000);
    }
    
    componentWillUnmount() 
    {
        clearInterval(this.interval);
    }

    showDiscounts = () => {
        this.setState({ discount_prompt: true });
    };

    closeDiscounts = () => {
        this.setState({ discount_prompt: false });
    };

    render() {
        

        const content = this.state.data.map((x, index) => (
            <p key={index} style={{ marginLeft: "20px" }}>
                {x.itemDetails.name} x {x.qty}
            </p>
        ));

        let content1;

        if (!this.state.discount_prompt) {
            content1 = (
                <>
                    <div className="c_finalbill">
                        <p className="c_finalbillname">Bill</p>
                        <div className="c_billitems">{content}</div>
                        <div className="c_billtotal">
                            <p className="c_billh">SubTotal {this.state.subtotal}</p>
                            <p className="c_billh">Delivery Fee   Rs {this.state.delivery}/-</p>
                            <p className="c_billh">Platform Fee   Rs {this.state.platform}/-</p>
                            <p className="c_billh">Discount       Rs {this.state.discount}/-</p>
                            <div className="c_tokenButton" onClick={this.showDiscounts}>
                                Apply Tokens
                            </div>
                            <p className="c_billh">Total Rs {this.state.total}/-</p>
                        </div>
                    </div>
                </>
            );
        } else {
            content1 = (
                <>
                    <div className="c_finalbill">
                        <p className="c_finalbillname">Bill</p>
                        <div className="c_billitems">{content}</div>
                        <div className="c_billtotal">
                            <p className="c_billh">SubTotal {this.state.order.price}</p>
                            <p className="c_billh">Delivery Fee   Rs 100/-</p>
                            <p className="c_billh">Platform Fee   Rs 50/-</p>
                            <p className="c_billh">Discount       Rs 0/-</p>
                            <div className="c_tokenButton">Apply Tokens</div>
                            <p className="c_billh">Total</p>
                        </div>
                    </div>
                    {/* Pass the closeDiscounts function as a prop */}
                    <Discount discounts={this.state.discounts} closefunc={this.closeDiscounts} updatefunc={this.fetchData}/>
                </>
            );
        }

        return <>{content1}</>;
    }
}

export default Bill;
