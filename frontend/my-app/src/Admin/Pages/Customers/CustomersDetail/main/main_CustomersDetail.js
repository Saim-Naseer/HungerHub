import React from "react";
import Background from "../../../Backgrounds/Background";
import { customers } from "../../Components/CustomersList.js";
import CardList from "../Components/CardList.js";
import { useParams } from 'react-router-dom';

const Main_CustomersDetail = () =>{
    
    const { id } = useParams();
    return(
        <div>           
        <Background />
        <CardList id = {Number(id)} customers = {customers}/>
        </div>
    );
}
export default Main_CustomersDetail