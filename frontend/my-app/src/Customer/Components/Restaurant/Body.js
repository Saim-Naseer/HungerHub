import React from "react";
import Cart from "./Cart";
import Info from "./Info";
import Popular from "./Popular";
import Menu from "./Menu";
import { CartProvider } from "./CartContext";
import ConfCart from "../../Containers/ConfCart";

class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            page: "restaurant",
        };
    }

    pageChange = (pageName) => {
        this.setState({ page: pageName });
    };

    renderContent = () => {
        const { page } = this.state;

        if (page === "restaurant") {
            return (
                <>
                    <Info />
                    <Popular />
                    <Menu />
                    <Cart pagefunc={this.pageChange} />
                </>
            );
        } else if (page === "confCart") {
            return <ConfCart />;
        }

        return null; // Fallback for unexpected `page` values
    };

    render() {
        return (
            <CartProvider>
                {this.renderContent()}
            </CartProvider>
        );
    }
}

export default Body;
