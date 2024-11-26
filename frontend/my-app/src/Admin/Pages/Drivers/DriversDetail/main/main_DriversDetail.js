import React from "react";
import Background from "../../../Backgrounds/Background";
import { drivers } from "../../Components/DriversList.js";
import CardList from "../Components/CardList.js";
import { useParams } from 'react-router-dom';

const Main_DriversDetail = () => {
   
    const { id } = useParams();
    return(
        <div>           
        <Background />
        <CardList id = {Number(id)} drivers = {drivers}/>
        </div>
    );
}
export default Main_DriversDetail