import React, { Component } from "react";
import Background from "../../../Backgrounds/Background";
import CardList from "../Components/CardList.js";
import { useParams } from 'react-router-dom';

// Functional wrapper to access useParams() in a class component
const Main_Customer_Details_Wrapper = () => {
    const { Customer_id } = useParams();
return <Main_Customer_Details Customer_id={Customer_id} />;

};

class Main_Customer_Details extends Component {
    constructor(){
        super()
        this.state = {
            customers: [],
        }
    }
    fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/admin/customers");
            const data = await response.json();
            this.setState({ customers: data });
        } catch (error) {
            console.error("Error fetching Customer:", error);
        }
    };
    componentDidMount() {
        this.fetchData();
    }
    render() {
        const { Customer_id } = this.props;  // Now id is passed as a prop
        return (
        <div>
            <Background />
            <CardList Customer_id={Number(Customer_id)} customers={this.state.customers} />
        </div>
        );
    }
}

export default Main_Customer_Details_Wrapper;
