import React, { useState, useEffect } from "react";
import "./Res_Profile.css";
import Session from "../../../Session"; // Assuming Session stores user data

const Res_Profile = () => {
  // State for restaurant data
  const [restaurantData, setRestaurantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Temporary data for editing
  const [tempData, setTempData] = useState({});

  // Simulate fetching restaurant information
  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const Restaurant_id = Session.user_id;

        // Fetch restaurant data
        const restaurantDataResponse = {
          name: `${Session.name}`,
          contactNo: `${Session.phone}`,
          email: `${Session.email}`,
        };

        // Fetch ratings
        const ratingsResponse = await fetch(`http://localhost:5000/restaurant/ratings?Restaurant_id=${Restaurant_id}`);
        const ratings = await ratingsResponse.json();

        // Fetch password securely
        const passwordResponse = await fetch(`http://localhost:5000/restaurant/password?Restaurant_id=${Restaurant_id}`);
        const passwords = await passwordResponse.json();

        // Combine all fetched data
        const data = {
          ...restaurantDataResponse,
          rating: ratings.ratings ? ratings.ratings.totalStars : null,
          password: passwords.password, // Use password securely
        };

        setRestaurantData(data);
        setTempData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchRestaurantInfo();
  }, []);

  // API call to update restaurant information
  const handleUpdate = async () => {
    try {
      const restaurantId = Session.user_id; // Assuming restaurantId is stored in session
      const updatedData = {
        name: tempData.name,
        phone: tempData.contactNo,
        email: tempData.email,
        pwd: tempData.password,
      };

      // Sending a PUT request to the backend to update the restaurant information
      const response = await fetch(
        `http://localhost:5000/restaurant/update?Restaurant_id=${restaurantId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        // If the response is successful, update the local state
        setRestaurantData({ ...tempData });
        setIsModalOpen(false);
        alert("Profile updated successfully.");
      } else {
        // Handle any errors
        const errorData = await response.json();
        setError(errorData.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile.");
    }
  };

  // Loading and error handling
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-page">
      <h1>Restaurant Profile</h1>

      {/* Display Restaurant Info */}
      <div className="user-info">
        <div className="data">
          <p>
            <strong>Name:</strong> {restaurantData.name}
          </p>
          <p>
            <strong>Rating:</strong> {restaurantData.rating}
          </p>
          <p>
            <strong>Contact No:</strong> {restaurantData.contactNo}
          </p>
          <p>
            <strong>Email:</strong> {restaurantData.email}
          </p>
          <p>
            <strong>Password:</strong> {restaurantData.password}
          </p>
        </div>
        <div className="logut-div" onClick={() => window.location.reload()}>
          <button className="logout-btn">Logout</button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="Rider-actions">
        <button className="edit-button" onClick={() => setIsModalOpen(true)}>
          Edit Personal Info
        </button>
      </div>

      {/* Edit Info Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Personal Information</h2>

            <label>
              Name:
              <input
                type="text"
                name="name"
                value={tempData.name}
                onChange={(e) =>
                  setTempData({ ...tempData, name: e.target.value })
                }
              />
            </label>
            <label>
              Contact No:
              <input
                type="text"
                name="contactNo"
                value={tempData.contactNo}
                onChange={(e) =>
                  setTempData({ ...tempData, contactNo: e.target.value })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={tempData.email}
                onChange={(e) =>
                  setTempData({ ...tempData, email: e.target.value })
                }
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                name="password"
                value={tempData.password}
                onChange={(e) =>
                  setTempData({ ...tempData, password: e.target.value })
                }
              />
            </label>

            <div className="modal-actions">
              <button
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="update-button" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Res_Profile;
