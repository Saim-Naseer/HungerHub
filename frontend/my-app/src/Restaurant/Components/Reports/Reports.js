import React from "react";
import "./Reports.css";

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
      const response = await fetch("http://localhost:5000/restaurant/reports?rid=1"); // Ensure correct restaurant ID
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

    if (loading) {
      return <div>Loading reports...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="reports">
        <h2 className="header">Restaurant Reports</h2>
        {reports.length > 0 ? (
          reports.map((report, index) => (
            <div key={index} className="report-card">
              <p><strong>Message:</strong> {report.Message}</p> {/* Display the Message */}
            </div>
          ))
        ) : (
          <p>No reports available.</p>
        )}
      </div>
    );
  }
}

export default Reports;
