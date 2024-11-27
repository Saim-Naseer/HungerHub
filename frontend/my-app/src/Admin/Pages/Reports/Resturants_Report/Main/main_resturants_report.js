import Background from "../../../Backgrounds/Background.js";
import React from "react";
import SearchBox from '../Components/SearchBox.js';
import { resturants_reports } from '../Components/ReportResturantsList.js';
import ReportsTable from "../Components/reportsTable/reportsTable.js";

class Main_resturants_report extends React.Component {
  constructor(){
      super()
      this.state = {
        resturants_reports: resturants_reports,
        searchfield:''
      }
  }
  onSearchChange = (event) => {
      this.setState({searchfield:event.target.value})
  }
  render(){
  const filteredResturants_reports = this.state.resturants_reports.filter(resturants_reports => {
      return resturants_reports.resturant_name.toLowerCase().includes(this.state.searchfield.toLowerCase())
  })
  
    return (
        <div>
            <Background />
            <SearchBox SearchChange = {this.onSearchChange}/>
            <h2 style={{textAlign:"center" , color:"black"}}>Resturants Reports</h2>
            <ReportsTable resturants_reports = {filteredResturants_reports} />
           
        </div>
    );
  }
};

export default Main_resturants_report;
