import React, { useEffect, useState } from "react";
import "./Card.css";
import axios from "axios"; // Import axios for API calls
import { Link } from 'react-router-dom';

const Card = ({ Restaurant_id, name, email, phone, total_stars, exact_address, total_ratings, cusine, onDelete, image }) => {
    const starImage = "/Images/star.png";
    const halfStar = "/Images/half_star.png";
    const noImage = "/Images/no image available.png"; // Updated noImage path
    const rating = ((total_stars / total_ratings)/2).toFixed(1);
    const [totalOrders, setTotalOrders] = useState(0); 

    // Generate an array of stars based on the rating
    const renderStars = () => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <img
                    key={`full-${i}`}
                    src={starImage}
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
                    src={halfStar}
                    alt="half star"
                    width="20px"
                    height="20px"
                    className="half-star-icon"
                />
            );
        }

        return stars;
    };

    // Handle delete button click
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/admin/deleteRestaurant/${Restaurant_id}`);
            alert(response.data.message); // Display success message
            if (onDelete) {
                onDelete(Restaurant_id); // Call onDelete prop to update the parent state
            }
        } catch (error) {
            console.error("Error deleting restaurant:", error);
            alert("Failed to delete the restaurant. Please try again.");
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/restaurant/history-orders?rid=${Restaurant_id}`);
            const data = await response.json();
            setTotalOrders(data.activeOrders.length); // Update the state with the total number of orders
        } catch (error) {
            console.error("Error fetching total orders:", error);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []); 
    return (
        <div className="resturants-detail">
            <div className="card-main">
                <div className="card-image">
                    <img 
                        src={image || noImage} 
                        alt={`${name} restaurant`} 
                        onError={(e) => e.target.src = noImage} 
                    />
                </div>
                <div className="card-content">
                    <div className="card-header">
                        <h2>{name}</h2>
                        <div className="card-header-1">
                            {renderStars()} {/* Render stars */}
                        </div>
                    </div>
                    <p>{cusine}</p>
                    <p>{exact_address}</p>
                </div>
            </div>
            <div className="stats-box">
                <div className="stat">
                    <span className="label">Email</span>
                    <span className="value">{email}</span>
                </div>
                <div className="stat">
                    <span className="label">Phone No.</span>
                    <span className="value">{phone}</span>
                </div>
                <div className="stat">
                    <span className="label">Total Orders</span>
                    <span className="value">{totalOrders}</span>
                </div>
                <div className="stat">
                    <span className="label">Overall Rating</span>
                    <span className="value">{rating}</span>
                </div>
            </div>
            <div className="container-delete-button">
                <Link to='/resturants'>
                    <button className="delete-button" onClick={handleDelete}>Delete Restaurant</button>
                </Link>
            </div>
        </div>
    );
};

export default Card;
