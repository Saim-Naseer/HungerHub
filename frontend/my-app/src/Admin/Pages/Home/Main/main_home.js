import React from "react";
import Background from "../../Backgrounds/Background";
import Card from "../Components/Card/Card.js"
import './main_home.css'

class Main_Home extends React.Component {
    render(){
        return(
            <div>           
                <Background />
                <div className="home">
                    <div className="header">
                        <h2>Welcome to Hunger Hub</h2>
                    </div>
                    <div className="cards">
                        <Card name={"Resturants"}/>
                        <Card name={"Customers"}/>
                        <Card name={"Drivers"}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default Main_Home