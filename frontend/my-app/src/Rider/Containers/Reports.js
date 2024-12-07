import React, { useEffect, useState } from 'react';
import '../Styles/Reports.css'; // Add your CSS file for styling
import { useParams, useNavigate } from 'react-router-dom';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state
  const { id } = useParams(); // Assuming riderId is passed as a URL param
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch reports from the API
    const fetchReports = async () => {
      try {
        const response = await fetch(`http://localhost:5000/rider/riderReports/${id}`); // Replace `/api` with your actual API prefix
        const data = await response.json();
        if (data.success) {
          setReports(data.data); // Use the reports data
        } else {
          setError(data.message || 'Failed to fetch reports.');
        }
      } catch (err) {
        setError('An error occurred while fetching the reports.');
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchReports();
  }, [id]);

  return (
    <div className="reports-page">
      <button className="backbutton" onClick={() => navigate('/Profile')}>Back</button>
      <h1>Customer Complaints</h1>

      {loading ? (
        <p>Loading reports...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : reports.length > 0 ? (
        <div className="reports-list">
          {reports.map((report, index) => (
            <div key={index} className="report-card">
              <p><strong>Complaint:</strong> {report}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-reports-message">You are doing good! No Complaints found.</p>
      )}
    </div>
  );
};

export default Reports;
