import Background from "../../../Backgrounds/Background.js";
import React from "react";
import SearchBox from '../Components/SearchBox.js';
import ReportsTable from "../Components/ReportsTable.js";

class Main_riders_report extends React.Component {
  constructor(){
      super()
      this.state = {
        riders_reports: [],
        customers:[],
        riders:[],
        searchfield:''
      }
  }
  onSearchChange = (event) => {
      this.setState({searchfield:event.target.value})
  }

  fetchData = async () => {
    try {
      // Fetch restaurant reports
      const reportsResponse = await fetch("http://localhost:5000/admin/riderReports");
      const reportsData = await reportsResponse.json();

      // Fetch riders
      const ridersResponse = await fetch("http://localhost:5000/admin/riders");
      const ridersData = await ridersResponse.json();

      // Fetch customers
      const customersResponse = await fetch("http://localhost:5000/admin/customers");
      const customersData = await customersResponse.json();

      this.setState({
        riders_reports: reportsData,
        riders: ridersData,
        customers: customersData,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  componentDidMount() {
    this.fetchData();
  }
  handleRefresh = () => {
    this.fetchData(); // Method to re-fetch data
  };
  render(){

    const { riders_reports, riders, customers, searchfield } = this.state;

    // Map rider and customer names to reports based on their IDs
    const reportsWithNames = riders_reports.map(report => {
      const rider = riders.find(r => r.Rider_id === report.Rider_id);
      const customer = customers.find(c => c.Customer_id === report.Customer_id);
      
      return {
        ...report,
        rider_name: rider ? rider.name : "Unknown Rider",
        customer_name: customer ? customer.name : "Unknown Customer",
      };
    });  
    const filteredReports = reportsWithNames.filter(report => 
      report.rider_name.toLowerCase().includes(searchfield.toLowerCase()) || 
      report.customer_name.toLowerCase().includes(searchfield.toLowerCase())
    );

  
    return (
        <div>
            <Background />
            <SearchBox SearchChange = {this.onSearchChange}/>
            <h2 style={{textAlign:"center", color:"black"}}>Riders  Reports</h2>
            <ReportsTable riders_reports = {filteredReports} onRefresh={this.handleRefresh}/>
           
        </div>
    );
  }
};

export default Main_riders_report;
