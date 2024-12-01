import React, { useState } from 'react';
import './Reports.css'; // Add your CSS file for styling
import { useParams, useNavigate } from 'react-router-dom'; 

const Reports = () => {
  // Sample report data
  const [reports, setReports] = useState([
    {
      id: 1,
      date: '25/11/2024',
      complaint: 'The rider was late by 30 minutes and was rude.',
      msg:'This is your last warning, other wise your accout would be onhold',     
    },
    {
      id: 2,
      date: '20/11/2024',
      complaint: 'Order was delivered cold and unsealed.',
      msg:'This is not acceptable...',
    },
    {
      id: 3,
      date: '15/11/2024',
      complaint: 'The rider took a longer route and delayed the delivery.',
      msg:'Make sure you deliver on time because customer satisfaction is our first priority.',
    },
  ]);
  const navigate = useNavigate();
  return (
      <><div className="reports-page">
        <button className="backbutton" onClick={() => navigate('/Profile')}>Back</button>
          <h1>Customer Complaints</h1>

          {/* Display Reports */}
          {reports.length > 0 ? (
              <div className="reports-list">
                  {reports.map((report) => (
                      <div key={report.id} className="report-card">
                          <p><strong>Complaint:</strong> {report.complaint}</p>
                          <p><strong>Date:</strong> {report.date}</p>
                          <p><strong>Message from HungerHub Management:</strong> {report.msg}</p>
                      </div>
                  ))}
              </div>
          ) : (
              <p className="no-reports-message">You are doing good! No Complaints found.</p>
          )}
      </div></>
  );
};

export default Reports;
