import React from 'react';
import { CartContext } from './CartContext';
import "./Item.css"
//import R_Session from "./Session"
//import Session from "../../../Session"


class Item extends React.Component{
    constructor()
    {
        super()
        this.state={
            Item_id:""
        }
    }

    static contextType = CartContext; 

    addToCart = async () => {
        try {
          // Parameters to send in the request
          const uid = 1; // Replace with dynamic values if needed
          const rid = 1;
          const iid = 1;
      
          // Construct the URL with query parameters
          const url = `http://localhost:5000/customer/addtocart?uid=${uid}&rid=${rid}&iid=${iid}`;
      
          // Make the POST request
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Optional if there's no body
            },
          });
      
          // Check if the response was successful
          if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
          }
      
          const responseText = await response.text(); // Parse the response as plain text
          console.log('Server response:', responseText);

          this.context.triggerFetch()

        } catch (error) {
          console.error('Error while making the request:', error.message);
        }

      };
      

    render()
    {
        const {name,price,Item_id} = this.props;

        this.setState({Item_id:Item_id})

        return(
            <>
                <div className="c_item">
                    <p className="c_item_name">&bull; {name}</p>
                    <p className="c_item_price">Rs. {price}/-</p>
                    <p className="c_item_add" onClick={()=>this.addToCart()}>+</p>
                </div>
            </>
        )
    }
}


export default Item