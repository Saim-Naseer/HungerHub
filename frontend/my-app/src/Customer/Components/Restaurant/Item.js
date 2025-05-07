import React from "react";
import { CartContext } from "./CartContext";
import "./Item.css";
import R_Session from "./Session";
import Session from "../../../Session";

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Item_id: this.props.Item_id || "", // Initialize Item_id from props
        };
    }

    static contextType = CartContext;

    addToCart = async () => {
        try {
            let uid;
            // Parameters to send in the request
            if(R_Session.group_order === 1){
                uid = R_Session.group_leaderId;  // for group order it will add items to group leader cart
            } else {
                uid = Session.user_id; // for single order
            }
            
            const rid = R_Session.restaurant_id;
            const iid = this.state.Item_id;

            // Construct the URL with query parameters
            const url = `http://localhost:5000/customer/addtocart?uid=${uid}&rid=${rid}&iid=${iid}`;

            // Make the POST request
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Optional if there's no body
                },
            });

            // Check if the response was successful
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }

            // const responseText = await response.text(); // Parse the response as plain text
            // console.log("Server response:", responseText);

            // Trigger context update
            this.context.triggerFetch();
        } catch (error) {
            console.error("Error while making the request:", error.message);
        }
    };

    componentDidUpdate(prevProps) {
        // Update state if props.Item_id changes
        if (prevProps.Item_id !== this.props.Item_id) {
            this.setState({ Item_id: this.props.Item_id });
        }
    }

    render() {
        const { name, price } = this.props;

        return (
            <>
                <div className="c_item">
                    <p className="c_item_name">&bull; {name}</p>
                    <p className="c_item_price">Rs. {price}/-</p>
                    <p className="c_item_add" onClick={this.addToCart}>
                        +
                    </p>
                </div>
            </>
        );
    }
}

export default Item;
