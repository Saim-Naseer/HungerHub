import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import riderProfile from '../Assets/Rider_img.png'; 
import '../Styles/Profile.css'; // Add your CSS file for styling
import Session from '../../Session';

const ProfilePage = () => {
  const navigate = useNavigate();

  // State for user data
  const [userData, setUserData] = useState(null); // Start with null to indicate loading
  const [isLoading, setIsLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(null); // Error state for API call

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Temporary data for editing
  const [tempData, setTempData] = useState({});

  // Fetch rider information
  useEffect(() => {
    const fetchRiderInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/rider/get-rider-info/${Session.user_id}`); // Adjust the endpoint as needed
        if (!response.ok) {
          throw new Error('Failed to fetch rider information');
        }

        const data = await response.json(); // Get the response as JSON
        
        if (data.success && data.data.length > 0) {
          // Extract the first item from the data array
          const riderInfo = data.data[0];
          
          setUserData(riderInfo); // Set the fetched rider data
          setTempData(riderInfo); // Set the temporary data for the modal
        } else {
          throw new Error('No rider data found');
        }

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchRiderInfo();
  }, []);

  // Handle input change in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  // Save updated data
  const handleUpdate = () => {
    setUserData({ ...tempData });
    setIsModalOpen(false); // Close the modal after updating
  };

  // Loading and error handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      {/* Display User Info */}
      <div className="user-info">
        <div className="user-img">
          <img src={riderProfile} alt="Rider Profile" className="profile-image" />
        </div>
        <div className="data">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Contact No:</strong> {userData.phone}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Password:</strong> {userData.pwd}</p>
          <p><strong>Location:</strong> {userData.location}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button className="edit-button" onClick={() => setIsModalOpen(true)}>
          Edit Personal Info
        </button>
        <button className="reports-button" onClick={() => navigate(`/Reports/${Session.user_id}`)}>
          Check Reports
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
                onChange={handleInputChange}
              />
            </label>
            <label>
              Contact No:
              <input
                type="text"
                name="phone"
                value={tempData.phone}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={tempData.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                name="pwd"
                value={tempData.pwd}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={tempData.location}
                onChange={handleInputChange}
              />
            </label>

            <div className="modal-actions">
              <button className="close-button" onClick={() => setIsModalOpen(false)}>
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

export default ProfilePage;
