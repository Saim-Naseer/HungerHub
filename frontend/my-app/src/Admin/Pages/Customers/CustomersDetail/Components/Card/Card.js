import React, { useEffect, useState } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom"; // React Router v6
import axios from "axios";

const Card = ({ Customer_id, name, email, phone, exact_address, onDelete, image }) => {
    const navigate = useNavigate(); // React Router v6 hook for programmatic navigation
    const noImage = "/Images/no image available.png"; // Updated noImage path
    const [totalOrders, setTotalOrders] = useState(0); // State to store total orders

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/admin/deleteCustomer/${Customer_id}`);
            alert(response.data.message); // Display success message
            if (onDelete) {
                onDelete(Customer_id); // Call onDelete prop to update the parent state
            }
            navigate("/customers"); // Navigate to the customers page after deleting
        } catch (error) {
            console.error("Error deleting customer:", error);
            alert("Failed to delete the customer. Please try again.");
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/customer/pastorders?uid=${Customer_id}`);
            const data = await response.json();
            setTotalOrders(data.length); // Update the state with the total number of orders
        } catch (error) {
            console.error("Error fetching total orders:", error);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div className="customers-detail">
            <div className="card-main">
                <div className="card-image">
                    <img
                        src={image || noImage}
                        alt={`${name} customer`}
                        onError={(e) => (e.target.src = noImage)}
                    />
                </div>
                <div className="card-content">
                    <h2>{name}</h2>
                    <p>{email}</p>
                    <p>{phone}</p>
                </div>
            </div>
            <div className="stats-box-customer">
                <div className="stat">
                    <span className="label">Address</span>
                    <span className="value">{exact_address}</span>
                </div>
                <div className="stat">
                    <span className="label">Total Orders</span>
                    <span className="value">{totalOrders}</span> {/* Show total orders */}
                </div>
            </div>
            <div className="container-delete-button">
                <button className="delete-button" onClick={handleDelete}>
                    Delete Customer
                </button>
            </div>
        </div>
    );
};

export default Card;
