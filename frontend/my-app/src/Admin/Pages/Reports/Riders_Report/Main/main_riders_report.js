import Background from "../../../Backgrounds/Background.js";
import React from "react";
import SearchBox from '../Components/SearchBox.js';
import { riders_reports } from '../Components/ReportRidersList.js';
import ReportsTable from "../Components/ReportsTable.js";

class Main_riders_report extends React.Component {
  constructor(){
      super()
      this.state = {
        riders_reports: riders_reports,
        searchfield:''
      }
  }
  onSearchChange = (event) => {
      this.setState({searchfield:event.target.value})
  }
  render(){
  const filteredRiders_reports = this.state.riders_reports.filter(riders_reports => {
      return riders_reports.rider_name.toLowerCase().includes(this.state.searchfield.toLowerCase())
  })
  
    return (
        <div>
            <Background />
            <SearchBox SearchChange = {this.onSearchChange}/>
            <h2 style={{textAlign:"center", color:"black"}}>Riders  Reports</h2>
            <ReportsTable riders_reports = {filteredRiders_reports} />
           
        </div>
    );
  }
};

export default Main_riders_report;
