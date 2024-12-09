import React from "react";
import Cart from "./Cart";
import Info from "./Info";
import Popular from "./Popular";
import Menu from "./Menu";
import { CartProvider } from "./CartContext";
import ConfCart from "../../Containers/ConfCart";
import Re from "./Re"

class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            page: "restaurant",
            report:false
        };
    }

    closeReport = () => {
        this.setState({report:false})
    }

    openReport = () => {
        this.setState({report:true})
    }

    pageChange = (pageName) => {
        this.setState({ page: pageName });
    };

    renderContent = () => {
        const { page , report } = this.state;

        if (page === "restaurant" & report ===false) {
            return (
                <>
                    <Info />
                    <Popular />
                    <Menu />
                    <Cart pagefunc={this.pageChange} />
                    <div style={{
                        backgroundColor:"red",
                        color:"white",
                        display:"inline-flex",
                        width:"120px",
                        height:"30px",
                        justifyContent:"center",
                        alignItems:"center",
                        fontSize:"22px",
                        position:"absolute",
                        left:"950px",
                        bottom:"500px",
                        borderRadius:"10px",
                        cursor:"pointer"
                        }}  onClick={this.openReport}>Report</div>
                </>
            );
        } else if (page === "restaurant" & report ===true) {
            return (
                <>
                    <Info />
                    <Popular />
                    <Menu />
                    <Cart pagefunc={this.pageChange} />
                    <Re CloseReport = {this.closeReport}/>
                </>
            );
        } else if (page === "confCart") {
            return <ConfCart />;
        }

        return null; // Fallback for unexpected page values
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
