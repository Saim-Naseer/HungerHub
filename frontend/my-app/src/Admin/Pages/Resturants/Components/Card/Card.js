import React from "react";
import "./Card.css";
import { Link } from 'react-router-dom';
const images = require.context("../../images", false, /\.(png|jpe?g|svg)$/); 

const Card = ({id, name, type, time, rating }) => {
    const imageName = `${name.toLowerCase()}.png`; 
    const starImage = "star.png";
    const noImage = "no image available.png";
    const star = images(`./${starImage}`);
    
    try {
        const image = images(`./${imageName}`);

        return (
            <div className="card">
                <Link to={`/resturant/${id}`}>
                <img src={image} alt={`${name} resturant`} />
                <div>
                    <div className="card1">
                        <h2 className="name">{name}</h2>
                        
                        <div className="rating-container">
                            <p className="rating">{rating}</p>
                            <img src={star} alt="rating" width="20px" height="20px" />
                        </div>
                    </div>
                    <p>{type.join("/")}</p>
                    <p>Delivery Time {time} mins</p>
                </div>
                </Link>
            </div>
        );
    } catch (error) {
       
        return (
            <div className="card">
                <img src={noImage} alt={`${name} restaurant`} />
                <div>
                    <div className="card1">
                        <h2 className="name">{name}</h2>
                        
                        <div className="rating-container">
                            <p className="rating">{rating}</p>
                            <img src={star} alt="rating" width="20px" height="20px" />
                        </div>
                    </div>
                    <p>{type.join("/")}</p>
                    <p>Delivery Time {time} mins</p>
                </div>
            </div>
        ); 
    }
};

export default Card;
