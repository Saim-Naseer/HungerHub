import React from "react";
import "./Card.css";

const images = require.context("../../../images", false, /\.(png|jpe?g|svg)$/);

const Card = ({ name, email, number, rating, location, orders }) => {
    const imageName = `${name.toLowerCase()}.png`;
    const starImage = "star.png";
    const halfStar = "half_star.png";
    const noImage = "no image available.png";

    // Generate an array of stars based on the rating
    const renderStars = () => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <img
                    key={`full-${i}`}
                    src={images(`./${starImage}`)}
                    alt="star"
                    width="20px"
                    height="20px"
                    className="star-icon"
                />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <img
                    key="half-star"
                    src={images(`./${halfStar}`)} 
                    alt="half star"
                    width="20px"
                    height="20px"
                    className="half-star-icon"
                />
            );
        }

        return stars;
    };

    try {
        const image = images(`./${imageName}`); // Dynamically load image

        return (
            <div className = "drivers-detail">
                <div className="card-main">
                    <div className="card-image">
                        <img src={image} alt={`${name}`} />
                    </div>
                    <div className="card-content">
                        <div className="card-header">
                            <h2>{name}</h2>
                            <div className="card-header-1">
                                {renderStars()} 
                            </div>
                        </div>
                        <p>{email}</p>
                        <p>{number}</p>
                    </div>
                </div>
                <div className="stats-box-driver">
                    <div className="stat">
                        <span className="label">Location</span>
                        <span className="value">{location}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Orders</span>
                        <span className="value">{orders}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Overall Rating</span>
                        <span className="value">{rating}</span>
                    </div>
                </div>
                <div className="container-delete-button">
                    <button className="delete-button" >Delete Driver</button>
                </div>
            </div>     
        );
    } catch (error) {
        return (
            <div className = "drivers-detail">
                <div className="card-main">
                    <div className="card-image">
                        <img src={noImage} alt={`  ${name}`} />
                    </div>
                    <div className="card-content">
                        <div className="card-header">
                            <h2>{name}</h2>
                            <div className="card-header-1">
                                {renderStars()} 
                            </div>
                        </div>
                        <p>{email}</p>
                        <p>{number}</p>
                    </div>
                </div>
                <div className="stats-box-driver">
                    <div className="stat">
                        <span className="label">Location</span>
                        <span className="value">{location}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Orders</span>
                        <span className="value">{orders}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Overall Rating</span>
                        <span className="value">{rating}</span>
                    </div>
                </div>
                <div className="container-delete-button">
                    <button className="delete-button" >Delete Driver</button>
                </div>
            </div>
        );
    }
};

export default Card;
