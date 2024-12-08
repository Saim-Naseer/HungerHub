import React from "react";
import "./Reports.css";
import Session from "../../../Session";

class Reports extends React.Component {
  constructor() {
    super();
    this.state = {
      reports: [], // State to store the reports
      loading: true, // Loading state to handle fetching data
      error: null, // State to store errors
    };
  }

  // Fetch reports data from the server
  fetchReports = async () => {
    try {

      const response = await fetch(`http://localhost:5000/restaurant/reports?rid=${Session.user_id}`); // Ensure correct restaurant ID
      const data = await response.json();

      // Handle success response
      if (data && data.reports) {
        this.setState({ reports: data.reports, loading: false });
      } else {
        this.setState({ error: "No reports found.", loading: false });
        console.warn("No reports found.");
      }
    } catch (error) {
      this.setState({ error: error.message, loading: false });
      console.error("Error fetching reports:", error);
    }
  };

  // Fetch reports when component mounts
  componentDidMount() {
    this.fetchReports();
  }

  render() {
    const { reports, loading, error } = this.state; // Destructure state
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className="reports">
        <h2 className="header">Restaurant Reports</h2>
        {loading ? (
          <p>Loading...</p> // Show loading text while fetching
        ) : reports.length > 0 ? (
          reports.map((report, index) => (
            <div key={index} className="report-card">
              <p><strong>Message:</strong> {report.Message}</p> {/* Display the Message */}
            </div>
          ))
        ) : (
          <p>No reports found.</p> // Show this when there are no reports
        )}
      </div>
    );
  }
  
}

export default Reports;
