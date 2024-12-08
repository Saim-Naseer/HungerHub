import React, { useState } from 'react';
import './Reports.css'; // Add your CSS file for styling
import { useParams, useNavigate } from 'react-router-dom'; 

const Reports = () => {
  // Sample report data
  const [reports, setReports] = useState([
    {
      complaint: 'The rider was late by 30 minutes and was rude.',  
    },
    {
      complaint: 'Order was delivered cold and unsealed.'
    },
    {
      complaint: 'The rider took a longer route and delayed the delivery.',
    },
  ]);
  const navigate = useNavigate();
  return (
      <><div className="reports-page">
        <button className="backbutton" onClick={() => navigate('/')}>Back</button>
          <h1>Customer Complaints</h1>

          {/* Display Reports */}
          {reports.length > 0 ? (
              <div className="reports-list">
                  {reports.map((report) => (
                      <div  className="report-card">
                          <p><strong>Complaint:</strong> {report.complaint}</p>
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
