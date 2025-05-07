import React from "react";
import R_Session from "./Session";
import Item from "./Item";
import "./Popular.css";

class Popular extends React.Component {
    constructor() {
        super();
        this.state = {
            pop_items: [],
        };
    }

    // Fetch data and update state safely
    fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/customer/popularitems?rid=${R_Session.restaurant_id}`);
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }

            const data = await response.json();
            this.setState({ pop_items: data });
        } catch (error) {
            console.error("Error fetching popular items:", error);
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    renderContent = () => {
        const { pop_items } = this.state;

        if (pop_items.length === 0) {
            return null; // No popular items to show
        }

        return (
            <div className="c_popitems">
                <h2 className="c_popheading">Popular Items🔥</h2>
                {pop_items.map((x) => (
                    <Item key={x.Item_id} name={x.name} price={x.price} Item_id={x.Item_id} />
                ))}
            </div>
        );
    };

    render() {
        return <>{this.renderContent()}</>;
    }
}

export default Popular;
