import React from "react";
import "./Card.css";

const images = require.context("../../../images", false, /\.(png|jpe?g|svg)$/);

const Card = ({ name, type, location, rating, total_orders, reviews }) => {
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
            <div className = "resturants-detail">
                <div className="card-main">
                    <div className="card-image">
                        <img src={image} alt={`${name} restaurant`} />
                    </div>
                    <div className="card-content">
                        <div className="card-header">
                            <h2>{name}</h2>
                            <div className="card-header-1">
                                {renderStars()} {/* Render stars */}
                            </div>
                        </div>
                        <p>{location}</p>
                        <p>{type.join(" / ")}</p>
                    </div>
                </div>
                <div className="stats-box">
                    <div className="stat">
                        <span className="label">Total Orders</span>
                        <span className="value">{total_orders}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Customer Reviews</span>
                        <span className="value">{reviews}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Overall Rating</span>
                        <span className="value">{rating}</span>
                    </div>
                </div>
                <div className="container-delete-button">
                    <button className="delete-button" >Delete Resturant</button>
                </div>
            </div>     
        );
    } catch (error) {

        return (
            <div className = "resturants-detail">
                <div className="card-main">
                    <div className="card-image">
                        <img src={noImage} alt={`${name}`} />
                    </div>
                    <div className="card-content">
                        <div className="card-header">
                            <h2>{name}</h2>
                            <div className="card-header-1">
                                {renderStars()} {/* Render stars */}
                            </div>
                        </div>
                        <p>{location}</p>
                        <p>{type.join(" / ")}</p>
                    </div>
                </div>
                <div className="stats-box">
                    <div className="stat">
                        <span className="label">Total Orders</span>
                        <span className="value">{total_orders}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Customer Reviews</span>
                        <span className="value">{reviews}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Overall Rating</span>
                        <span className="value">{rating}</span>
                    </div>
                </div>
                <div className="container-delete-button">
                    <button className="delete-button" >Delete Resturant</button>
                </div>
            </div>     
        );
    }
};

export default Card;
