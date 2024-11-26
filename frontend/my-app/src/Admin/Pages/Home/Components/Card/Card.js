import React from "react";
import { Link } from 'react-router-dom';
import "./Card.css";
const images = require.context("../../images", false, /\.(png|jpe?g|svg)$/); 

const Card = ({ name }) => {
    
    const imageName = `${name.toLowerCase()}.png`; 
    const image = images(`./${imageName}`);

    return (
        <div className="card-home">
            <Link to={`/${name}`}>
            <img src={image} alt={`${name}`} />
            <div>
                <h2>Manage {name}</h2>
            </div>
            </Link>
        </div>
    );
}    

export default Card;
