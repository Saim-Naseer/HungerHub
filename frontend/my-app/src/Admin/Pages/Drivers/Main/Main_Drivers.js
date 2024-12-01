import Background from "../../Backgrounds/Background";
import React from "react";
import SearchBox from '../Components/SearchBox.js';
import DriversTable from "../Components/DriversTable.js";

class Main_Drivers extends React.Component {
  constructor(){
      super()
      this.state = {
          drivers: [],
          searchfield:''
      }
  }
  onSearchChange = (event) => {
      this.setState({searchfield:event.target.value})
  }
  fetchData = async() => {
    const drivers = await fetch("http://localhost:5000/admin/riders");
    const data = await drivers.json();
    this.setState({ drivers: data });
  }

  componentDidMount() {
    this.fetchData();
  }
  render(){
  const filteredDrivers = this.state.drivers.filter(drivers => {
      return drivers.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
  })
  
    return (
        <div>
            <Background />
            <SearchBox SearchChange = {this.onSearchChange}/>
            <h2 style={{textAlign:"center" ,  marginTop:"23px" , marginBottom:"23px", color:"black"}}>All Drivers</h2>
           
                <DriversTable drivers = {filteredDrivers} />
           
        </div>
    );
  }
};

export default Main_Drivers;
