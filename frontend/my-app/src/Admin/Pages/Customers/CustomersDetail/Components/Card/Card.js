import React from "react";
import "./Card.css";

const images = require.context("../../../images", false, /\.(png|jpe?g|svg)$/);

const Card = ({  name, email, number, reviews, location, orders }) => {
    const imageName = `${name.toLowerCase()}.png`;
    const noImage = "no image available.png";

    try {
        const image = images(`./${imageName}`); // Dynamically load image

        return (
            <div className = "customers-detail">
                <div className="card-main">
                    <div className="card-image">
                        <img src={image} alt={`${name}`} />
                    </div>
                    <div className="card-content">
                        <h2>{name}</h2>
                        <p>{email}</p>
                        <p>{number}</p>
                    </div>
                </div>
                <div className="stats-box-customer">
                    <div className="stat">
                        <span className="label">House No.</span>
                        <span className="value">{location}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Total Orders</span>
                        <span className="value">{orders}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Reviews</span>
                        <span className="value">{reviews}</span>
                    </div>
                </div>
                <div className="container-delete-button">
                    <button className="delete-button" >Delete Customer</button>
                </div>
            </div>     
        );
    } catch (error) {
        return (
            <div className = "customers-detail">
                <div className="card-main">
                    <div className="card-image">
                        <img src={noImage} alt={`${name}`} />
                    </div>
                    <div className="card-content">
                        <h2>{name}</h2>
                        <p>{email}</p>
                        <p>{number}</p>
                    </div>
                </div>
                <div className="stats-box-customer">
                    <div className="stat">
                        <span className="label">House No.</span>
                        <span className="value">{location}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Total Orders</span>
                        <span className="value">{orders}</span>
                    </div>
                    <div className="stat">
                        <span className="label">Reviews</span>
                        <span className="value">{reviews}</span>
                    </div>
                </div>
                <div className="container-delete-button">
                    <button className="delete-button" >Delete Customer</button>
                </div>
            </div>     
        );
    }
};

export default Card;
