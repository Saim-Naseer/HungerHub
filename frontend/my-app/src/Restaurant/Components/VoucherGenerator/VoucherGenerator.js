import React, { useState } from "react";
import "./VoucherGenerator.css";

const VoucherGenerator = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");

  const handleGenerate = () => {
    alert(`Voucher Code: ${code}\nDiscount: ${discount}%`);
  };

  return (
    <div className="voucher-generator">
      <h2 className="header">Generate Vouchers</h2>
      <form>
        <div className="form-group">
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="discount">Discount %:</label>
          <input
            type="number"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleGenerate}>
          Generate
        </button>
      </form>
    </div>
  );
};

export default VoucherGenerator;
