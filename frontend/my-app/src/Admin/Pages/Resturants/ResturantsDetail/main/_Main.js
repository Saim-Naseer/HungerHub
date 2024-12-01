import React, { Component } from "react";
import Background from "../../../Backgrounds/Background";
import CardList from "../Components/CardList.js";
import { useParams } from 'react-router-dom';

// Functional wrapper to access useParams() in a class component
const Main_Resturant_Details_Wrapper = () => {
    const { Restaurant_id } = useParams();
console.log("Restaurant_id from useParams:", Restaurant_id); // Debugging
return <Main_Resturant_Details Restaurant_id={Restaurant_id} />;

};

class Main_Resturant_Details extends Component {
    constructor(){
        super()
        this.state = {
            restaurants: [],
        }
    }
    fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/admin/restaurants");
            const data = await response.json();
            this.setState({ restaurants: data });
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };
    componentDidMount() {
        console.log("Restaurant_id on mount:", this.props.Restaurant_id);
        this.fetchData();
    }
    render() {
        const { Restaurant_id } = this.props;  // Now id is passed as a prop
        console.log(Restaurant_id);
        return (
        <div>
            <Background />
            <CardList Restaurant_id={Number(Restaurant_id)} restaurants={this.state.restaurants} />
        </div>
        );
    }
}

export default Main_Resturant_Details_Wrapper;
