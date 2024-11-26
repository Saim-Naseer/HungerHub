import Background from "../../Backgrounds/Background";
import React from "react";
import SearchBox from '../Components/SearchBox/SearchBox.js';
import ScrollTable from '../Components/ScrollTable.js';
import { customers } from '../Components/CustomersList';
import CustomersTable from "../Components/CustomersTable/CustomersTable.js";

class Main_Customers extends React.Component {
  constructor(){
      super()
      this.state = {
          customers: customers,
          searchfield:''
      }
  }
  onSearchChange = (event) => {
      this.setState({searchfield:event.target.value})
  }
  render(){
  const filteredCustomers = this.state.customers.filter(customers => {
      return customers.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
  })
  
    return (
        <div>
            <Background />
            <SearchBox SearchChange = {this.onSearchChange}/>
            <h2 style={{textAlign:"center", marginTop:"23px" , marginBottom:"23px"}}>All Customers</h2>

            <CustomersTable customers = {filteredCustomers} />
           
        </div>
    );
  }
};

export default Main_Customers;
