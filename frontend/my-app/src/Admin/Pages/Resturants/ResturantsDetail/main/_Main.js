import React from "react";
import Background from "../../../Backgrounds/Background";
import { resturants } from "../../Components/ResturantsList.js";
import CardList from "../Components/CardList.js";
import { useParams } from 'react-router-dom';

const Main_Resturant_Details = () => {
    
    const { id } = useParams();
    return(
        <div>           
        <Background />
        <CardList id = {Number(id)} resturants = {resturants}/>
        </div>
    );
}
export default Main_Resturant_Details