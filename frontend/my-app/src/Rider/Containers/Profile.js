import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import riderProfile from '../Assets/Rider_img.png'; 
import '../Styles/Profile.css'; // Add your CSS file for styling

const ProfilePage = () => {
  const navigate = useNavigate();

  // Initial user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    contact: '123-456-7890',
    email: 'johndoe@example.com',
    password: 'password123',
    location: '123 Main Street, Lahore',
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Temporary data for editing
  const [tempData, setTempData] = useState({ ...userData });

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

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      {/* Display User Info */}
      <div className="user-info">
        <div className='user-img'>
            <img src={riderProfile} alt="Rider Profile" className="profile-image" />
        </div>
        <div className='data'>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Contact No:</strong> {userData.contact}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Password:</strong> {userData.password}</p>
            <p><strong>Location:</strong> {userData.location}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="actions">
        <button className="edit-button" onClick={() => setIsModalOpen(true)}>
          Edit Personal Info
        </button>
        <button className="reports-button" onClick={() => navigate('/Reports')}>
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
                name="contact"
                value={tempData.contact}
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
                name="password"
                value={tempData.password}
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
