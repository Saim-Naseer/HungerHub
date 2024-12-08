// EditInfoPopup.js
import React, { useState } from "react";
import "./EditInfoPopup.css";
import Session from "../../../Session";

const EditInfoPopup = ({ closePopup, update }) => {
  const [formData, setFormData] = useState({
    name: Session.name,
    email: Session.email,
    phone: Session.phone,
    address: Session.address,
    location: Session.location,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  update = async () => {
    const data = await fetch(
      `http://localhost:5000/customer/update?uid=${Session.user_id}&name=${Session.name}&email=${Session.email}&phone=${Session.phone}&address=${Session.address}&region=${Session.location}`
    );
    const data2 = await data.json();
    if(data2.msg==="done")
    {
        alert("Profile Info Updated");
    }
    else
    {
        console.log(data2.msg)
    }
    
  };

  const handleUpdate = () => {
    // Update Session values
    Session.name = formData.name;
    Session.email = formData.email;
    Session.phone = formData.phone;
    Session.address = formData.address;
    Session.location = formData.location;

    // Call external update function
    update();
    closePopup();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Edit Info</h2>

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <label>Region:</label>
        <select
          className="region2"
          name="location"
          value={formData.location}
          onChange={handleChange}
        >
          <option value="-">-</option>
          <option>Shahdara, Badami Bagh, Ravi Town</option>
          <option>Inner Lahore, Anarkali, Data Darbar, Circular Road</option>
          <option>
            Liberty Market, MM Alam Road, Ghalib Market, Main Boulevard
          </option>
          <option>Model Town, Garden Town, Faisal Town, Township</option>
          <option>DHA Phases 1-8, Lahore Cantt, Walton</option>
          <option>Johar Town, Wapda Town, Valencia Town</option>
          <option>Allama Iqbal Town, Sabzazar, Samanabad</option>
          <option>Bahria Town, NFC Society, Canal Road extensions</option>
        </select>

        <div className="popup-buttons">
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
          <button className="close-btn" onClick={closePopup}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInfoPopup;
