import React from "react";
import CartItem from "../Restaurant/CartItem";
import Session from "../../../Session";
import "./Order.css"

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      restaurant:{}
    };
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/customer/cartitems?uid=${Session.user_id}&oid=${this.props.Order_id}`
      );
      const items = await response.json();
      this.setState({ items });

      const response2 = await fetch(
        `http://localhost:5000/customer/getrestaurant?uid=${Session.user_id}&oid=${this.props.Order_id}`
      );
      const restaurant = await response2.json();
      this.setState({ restaurant });
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  componentDidMount() {
    this.fetchData();
    
  }

  render() {
    const { items } = this.state;


    return (
      <div className="order-card5">
    
        <div className="order-img5" style={{backgroundImage:`url(${this.state.restaurant.image})`,backgroundSize:"cover"}}></div>
        <p style={{paddingLeft:"20px"}} className="order_p">{this.state.restaurant.name}</p>

        <div className="order-items5">
            {items.length > 0 ? (
            items.map((item, index) => (
                <div>
                    <p className="order_p">{item.itemDetails.name} x {item.qty} &nbsp; &nbsp; &nbsp; Rs {item.itemDetails.price}/-</p>
                </div>
            ))
            ) : (
            <p style={{display:"inline"}}>No items found for this order.</p>
            )}
        </div>

        <p style={{position:"relative",left:"400px"}} className="order_p"><b>Total &nbsp;</b> Rs {this.props.Price}/-</p>
      </div>
    );
  }
}

export default Order;