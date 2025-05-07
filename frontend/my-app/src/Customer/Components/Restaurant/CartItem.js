import React from "react";
import "./CartItem.css";
import Session from "./Session";

const Item = ({ itemId, name, qty, price, onRemove }) => {
    const removeFromCart = async () => {
        try {
            const rid = Session.restaurant_id;
            const iid = itemId;

            const url = `http://localhost:5000/customer/removefromcart?rid=${rid}&iid=${iid}`;

            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error! Status: ${response.status}. Message: ${errorText}`);
            }

            // Remove from UI and update price
            if (onRemove) {
                onRemove(itemId, price * qty);
            }

        } catch (error) {
            console.error("Error while removing item from cart:", error.message);
        }
    };

    return (
        <div className="c_cartitem">
            <p className="c_cartitem_name">{name}</p>
            <p className="c_cartitem_qty">{qty}</p>
            <p className="c_cartitem_price">{price}</p>
            <button className="Deletebtn" onClick={removeFromCart}>🗑</button>
        </div>
    );
};

export default Item;
