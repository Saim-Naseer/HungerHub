import React, { useState } from "react";
import "./VoucherGenerator.css";
import Session from "../../../Session";

const VoucherGenerator = () => {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [cap, setCap] = useState("");
  const [message, setMessage] = useState(""); // To display success/error messages

  const handleGenerate = async () => {
    try {
      const restaurantId = Session.user_id;
      const response = await fetch(
        `http://localhost:5000/restaurant/createDiscount?rid=${restaurantId}&name=${encodeURIComponent(name)}&cap=${cap}&percentage=${discount}`,
        { method: "POST" }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Discount voucher created successfully!");
      } else {
        setMessage(data.message || "An error occurred while creating the discount.");
      }
    } catch (error) {
      console.error("Error creating discount voucher:", error);
      setMessage("Failed to create discount voucher. Please try again later.");
    }
  };

  return (
    <div className="voucher-generator-wrapper">
      <h2 className="voucher-generator-header">Generate Vouchers</h2>
      <form className="voucher-generator-form">
        <div className="voucher-form-group">
          <label htmlFor="name" className="voucher-form-label">
            Voucher Name:
          </label>
          <input
            type="text"
            id="name"
            className="voucher-form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="voucher-form-group">
          <label htmlFor="discount" className="voucher-form-label">
            Discount %:
          </label>
          <input
            type="number"
            id="discount"
            className="voucher-form-input"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div className="voucher-form-group">
          <label htmlFor="cap" className="voucher-form-label">
            Capital:
          </label>
          <input
            type="number"
            id="cap"
            className="voucher-form-input"
            value={cap}
            onChange={(e) => setCap(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="voucher-generate-button"
          onClick={handleGenerate}
        >
          Generate
        </button>
      </form>
      {message && <p className="voucher-message">{message}</p>}
    </div>
  );
};

export default VoucherGenerator;
