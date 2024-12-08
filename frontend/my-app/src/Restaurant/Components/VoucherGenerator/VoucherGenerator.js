import React, { useState } from "react";
import "./VoucherGenerator.css";

const VoucherGenerator = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [cap, setCap] = useState("");

  const handleGenerate = () => {
    alert(`Voucher Code: ${code}\nDiscount: ${discount}%`);
  };

  return (
    <div className="voucher-generator-wrapper">
      <h2 className="voucher-generator-header">Generate Vouchers</h2>
      <form className="voucher-generator-form">
        <div className="voucher-form-group">
          <label htmlFor="code" className="voucher-form-label">
            Voucher Name:
          </label>
          <input
            type="text"
            id="code"
            className="voucher-form-input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
            id="capital"
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
    </div>
  );
};

export default VoucherGenerator;