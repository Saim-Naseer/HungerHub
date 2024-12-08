import React from "react";
import "./Discount.css";
import Session from "../../../Session";

class Discount extends React.Component {
  constructor() {
    super();
    this.state = {
      usedDiscounts: new Set(), // Track used discounts
    };
  }

  executeDiscount = async (rid, did) => {
    try {
      const uid = Session.user_id;
      const url = `http://localhost:5000/customer/applydiscount?uid=${uid}&rid=${rid}&did=${did}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }

      const responseText = await response.text(); 
      console.log("Server response:", responseText);

      // Add discount to the used list
      this.setState((prevState) => ({
        usedDiscounts: new Set(prevState.usedDiscounts).add(did),
      }));

      this.props.updatefunc(); // Update parent component if needed
    } catch (error) {
      console.error("Error while making the request:", error.message);
    }
  };

  render() {
    const { discounts, closefunc } = this.props;
    const { usedDiscounts } = this.state;

    const content = discounts
      .filter((x) => !usedDiscounts.has(x.Discount_id)) // Exclude used discounts
      .map((x, index) => (
        <div className="c_discount" key={index}>
          <p className="c_discountname">
            {x.name}{" -  "}{x.percentage}{" % "}
          </p>
          <p className="c_discountcap">
            {"( Cap Rs "} {x.cap} {"/- )"}
          </p>
          <p className="c_discountres">
            {`*This discount is only applicable on items being purchased from ${x.RestaurantDetails.name}`}
          </p>
          <div
            className="c_discountapply"
            onClick={async () => {
              await this.executeDiscount(x.Restaurant_id, x.Discount_id);
            }}
          >
            Apply
          </div>
        </div>
      ));

    return (
      <>
        <div className="c_Dicount">
          <p className="c_Discounth">Discounts</p>
          {content.length > 0 ? (
            content
          ) : (
            <></>
          )}
        </div>
        <div className="c_discountclose" onClick={closefunc}>
          x
        </div>
      </>
    );
  }
}

export default Discount;
