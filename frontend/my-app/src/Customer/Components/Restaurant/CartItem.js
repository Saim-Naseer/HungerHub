import React from "react"
import "./CartItem.css"

const Item = ({name,price,qty}) =>{
    return(
        <>
            <div className="c_cartitem">
                <p className="c_cartitem_name">{name}</p>
                <p className="c_cartitem_price">{price}</p>
                <p className="c_cartitem_qty">{qty}</p>
            </div>
        </>
    )
}

export default Item 