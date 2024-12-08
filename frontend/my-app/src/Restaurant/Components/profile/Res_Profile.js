import React, { useState, useEffect } from "react";
import "./Res_Profile.css";
import Session from "../../../Session";


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
    const fetchRestaurantInfo = () => {
      try {
        // Sample restaurant data
        const data = {
          name: `${Session.name}`,
          rating: 4.5,
          contactNo: `${Session.contactNo}`,
          email: `${Session.email}`,
          password: "restaurant123",
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

  // Save updated data
  const handleUpdate = () => {
    setRestaurantData({ ...tempData });
    setIsModalOpen(false);
    alert("Profile updated successfully.");
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
        <div className="logut-div"onClick={() => window.location.reload()}>
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
