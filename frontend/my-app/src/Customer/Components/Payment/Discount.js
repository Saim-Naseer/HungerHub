import React from "react";
import "./Discount.css";
import Session from "../../../Session"

class Discount extends React.Component{
    constructor()
    {
        super()
        this.state={
        }
    }

    executeDiscount = async (rid, did) => {
        try {
            // Parameters to send in the request
            const uid = Session.user_id; // Replace with dynamic values if needed
        
            // Construct the URL with query parameters
            const url = `http://localhost:5000/customer/applydiscount?uid=${uid}&rid=${rid}&did=${did}`;
        
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


          } catch (error) {
            console.error('Error while making the request:', error.message);
          }
    }

    render()
    {
        const { discounts, closefunc ,updatefunc } = this.props
        


        const content = discounts.map((x, index) => (
            <div className="c_discount" key={index}>
                <p className="c_discountname">{x.name}{" -  "}{x.percentage}{" % "}</p>
                <p className="c_discountcap">{"( Cap Rs "} {x.cap} {"/- )"}</p>
                <p className="c_discountres">
                    {`*This discount is only applicable on items being purchased from ${x.RestaurantDetails.name}`}
                </p>
                <div className="c_discountapply"  onClick={async () => { await this.executeDiscount(x.Restaurant_id, x.Discount_id); updatefunc(); }}> Apply </div>

            </div>
        ));

        return (
            <>
                <div className="c_Dicount">
                    <p className="c_Discounth">Discounts</p>
                    {content}
                </div>
                <div className="c_discountclose" onClick={closefunc}>
                    x
                </div>
            </>
        );
    }
}

export default Discount;
