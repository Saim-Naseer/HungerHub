import React from "react";
import "./Card.css";
import { Link } from 'react-router-dom'; 

const Card = ({ Restaurant_id, name, cusine, total_ratings, image, total_stars, description }) => {

    const star = "/Images/star.png";
    const noImage = "/Images/no image available.png";
    const rating = ((total_stars / total_ratings)/2).toFixed(1);

    return (
        <div className="card">
            <Link to={`/resturant/${Restaurant_id}`}>
                <img 
                    src={image || noImage} 
                    alt={`${name} restaurant`} 
                    onError={(e) => e.target.src = noImage} 
                />
                <div>
                    <div className="card1">
                        <h2 className="name">{name}</h2>
                        <div className="rating-container">
                            <p className="rating">{rating}</p>
                            <img src={star} alt="rating" width="20px" height="20px" />
                        </div>
                    </div>
                    <p>{cusine}</p>
                    <p>{description}</p>
                </div>
            </Link>
        </div>
    );
};

export default Card;
