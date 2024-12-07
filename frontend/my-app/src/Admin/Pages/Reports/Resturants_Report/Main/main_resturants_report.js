import Background from "../../../Backgrounds/Background.js";
import React from "react";
import SearchBox from '../Components/SearchBox.js';
import ReportsTable from "../Components/reportsTable/reportsTable.js";

class Main_resturants_report extends React.Component {
  constructor() {
    super();
    this.state = {
      resturants_reports: [],
      customers: [],
      resturants: [],
      searchfield: '',
    };
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  // Fetch data for both reports, restaurants, and customers
  fetchData = async () => {
    try {
      // Fetch restaurant reports
      const reportsResponse = await fetch("http://localhost:5000/admin/restaurantReports");
      const reportsData = await reportsResponse.json();

      // Fetch restaurants
      const restaurantsResponse = await fetch("http://localhost:5000/admin/restaurants");
      const restaurantsData = await restaurantsResponse.json();

      // Fetch customers
      const customersResponse = await fetch("http://localhost:5000/admin/customers");
      const customersData = await customersResponse.json();

      this.setState({
        resturants_reports: reportsData,
        resturants: restaurantsData,
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
  render() {
    const { resturants_reports, resturants, customers, searchfield } = this.state;

    // Map restaurant and customer names to reports based on their IDs
    const reportsWithNames = resturants_reports.map(report => {
      const restaurant = resturants.find(r => r.Restaurant_id === report.Restaurant_id);
      const customer = customers.find(c => c.Customer_id === report.Customer_id);
      
      return {
        ...report,
        restaurant_name: restaurant ? restaurant.name : "Unknown Restaurant",
        customer_name: customer ? customer.name : "Unknown Customer",
      };
    });

    // Filter reports based on search input, searching both restaurant and customer names
    const filteredReports = reportsWithNames.filter(report => 
      report.restaurant_name.toLowerCase().includes(searchfield.toLowerCase()) || 
      report.customer_name.toLowerCase().includes(searchfield.toLowerCase())
    );

    return (
      <div>
        <Background />
        <SearchBox SearchChange={this.onSearchChange} />
        <h2 style={{ textAlign: "center", color: "black" }}>Restaurants Reports</h2>
        <ReportsTable resturants_reports={filteredReports} onRefresh={this.handleRefresh}/>
      </div>
    );
  }
}

export default Main_resturants_report;
