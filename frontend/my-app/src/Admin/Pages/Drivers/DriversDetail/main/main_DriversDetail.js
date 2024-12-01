import React, { Component } from "react";
import Background from "../../../Backgrounds/Background";
import CardList from "../Components/CardList.js";
import { useParams } from 'react-router-dom';

// Functional wrapper to access useParams() in a class component
const Main_Driver_Details_Wrapper = () => {
    const { Rider_id } = useParams();
return <Main_Driver_Details Rider_id={Rider_id} />;

};

class Main_Driver_Details extends Component {
    constructor(){
        super()
        this.state = {
            drivers: [],
        }
    }
    fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/admin/riders");
            const data = await response.json();
            this.setState({ drivers: data });
        } catch (error) {
            console.error("Error fetching Rider:", error);
        }
    };
    componentDidMount() {
        this.fetchData();
    }
    render() {
       
        const { Rider_id } = this.props;  // Now id is passed as a prop
        return (
        <div>
            <Background />
            
            <CardList Rider_id={Number(Rider_id)} drivers={this.state.drivers} />
        </div>
        );
    }
}

export default Main_Driver_Details_Wrapper;
