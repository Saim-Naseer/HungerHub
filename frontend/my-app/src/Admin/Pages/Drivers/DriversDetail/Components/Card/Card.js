import React from "react";
import "./Card.css";
import { useNavigate } from 'react-router-dom'; // React Router v6
import axios from "axios";

const Card = ({ Rider_id, name, email, phone, total_stars, total_ratings, location, image, onDelete }) => {
    const navigate = useNavigate(); // React Router v6 hook for programmatic navigation
    const starImage = "/Images/star.png";
    const halfStar = "/Images/half_star.png";
    const noImage = "/Images/no image available.png"; // Fallback image
    const rating = ((total_stars / total_ratings) / 2).toFixed(1);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/admin/deleteRider/${Rider_id}`);
            alert(response.data.message); // Display success message
            if (onDelete) {
                onDelete(Rider_id); // Call onDelete prop to update the parent state
            }
            // Navigate to the drivers page after deleting
            navigate("/drivers");
        } catch (error) {
            console.error("Error deleting rider:", error);
            alert("Failed to delete the rider. Please try again.");
        }
    };

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

    return (
        <div className="drivers-detail">
            <div className="card-main">
                <div className="card-image">
                    <img 
                        src={image || noImage} 
                        alt={`${name} rider`} 
                        onError={(e) => e.target.src = noImage} 
                    />
                </div>
                <div className="card-content">
                    <div className="card-header">
                        <h2>{name}</h2>
                        <div className="card-header-1">
                            {renderStars()} {/* Render stars dynamically */}
                        </div>
                    </div>
                    <p>{email}</p>
                    <p>{phone}</p>
                </div>
            </div>
            <div className="stats-box-driver">
                <div className="stat">
                    <span className="label">Location</span>
                    <span className="value">{location}</span>
                </div>
                <div className="stat">
                    <span className="label">Total Orders</span>
                    <span className="value">--</span> {/* Placeholder for Total Orders */}
                </div>
            </div>
            <div className="container-delete-button">
                <button className="delete-button" onClick={handleDelete}>Delete Driver</button>
            </div>
        </div>
    );
};

export default Card;
