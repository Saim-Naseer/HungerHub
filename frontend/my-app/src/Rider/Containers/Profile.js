import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import riderProfileAlter from '../Assets/Rider_img.png'; 
import '../Styles/Profile.css';
import Session from '../../Session';

const ProfilePage = () => {
  const navigate = useNavigate();

  // State for user data
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  let riderProfile = Session.image;
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Temporary data for editing
  const [tempData, setTempData] = useState({});
  
  // Fetch rider information
  useEffect(() => {
    const fetchRiderInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/rider/get-rider-info/${Session.user_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch rider information');
        }

        const data = await response.json();
        if (data.success && data.data.length > 0) {
          const riderInfo = data.data[0];
          setUserData(riderInfo);
          setTempData(riderInfo);
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

  // Save updated data
  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:5000/rider/updateRiderInfo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Rider_id: Session.user_id,
          name: tempData.name,
          contactno: tempData.phone,
          email: tempData.email,
          pwd: tempData.pwd,
          location: tempData.location,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setUserData({ ...tempData });
        setIsModalOpen(false);

        // Update session data
        Session.name = tempData.name;
        Session.contactno = tempData.phone;
        Session.email = tempData.email;
        Session.pwd = tempData.pwd;
        Session.location = tempData.location;

        alert('Profile updated successfully.');
      } else {
        throw new Error(result.message || 'Failed to update profile.');
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Loading and error handling
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if(riderProfile === ''){
    riderProfile = riderProfileAlter;
  }
  return (
    <div className="profile-page">
      <h1>Profile</h1>

      {/* Display User Info */}
      <div className="user-info-1">
        <div className="user-img">
          <img src={riderProfile} alt={"Rider Profile"} className="profile-image" />
        </div>
        <div className="data">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Rating:</strong> {userData.total}</p>
          <p><strong>Contact No:</strong> {userData.phone}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Password:</strong> {userData.pwd}</p>
          <p><strong>Location:</strong> {userData.location}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="Rider-actions">
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
                onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
              />
            </label>
            <label>
              Contact No:
              <input
                type="text"
                name="phone"
                value={tempData.phone}
                onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={tempData.email}
                onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                name="pwd"
                value={tempData.pwd}
                onChange={(e) => setTempData({ ...tempData, pwd: e.target.value })}
              />
            </label>
            <label>
              Location:
              <select
                name="location"
                value={tempData.location}
                onChange={(e) => setTempData({ ...tempData, location: e.target.value })}
              >
                <option value="Shahdara, Badami Bagh, Ravi Town">Shahdara, Badami Bagh, Ravi Town</option>
                <option value="Inner Lahore, Anarkali, Data Darbar, Circular Road">Inner Lahore, Anarkali, Data Darbar, Circular Road</option>
                <option value="Liberty Market, MM Alam Road, Ghalib Market, Main Boulevard">Liberty Market, MM Alam Road, Ghalib Market, Main Boulevard</option>
                <option value="Model Town, Garden Town, Faisal Town, Township">Model Town, Garden Town, Faisal Town, Township</option>
                <option value="DHA Phases 1-8, Lahore Cantt, Walton">DHA Phases 1-8, Lahore Cantt, Walton</option>
                <option value="Johar Town, Wapda Town, Valencia Town">Johar Town, Wapda Town, Valencia Town</option>
                <option value="Allama Iqbal Town, Sabzazar, Samanabad">Allama Iqbal Town, Sabzazar, Samanabad</option>
                <option value="Bahria Town, NFC Society, Canal Road extensions">Bahria Town, NFC Society, Canal Road extensions</option>
              </select>
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
