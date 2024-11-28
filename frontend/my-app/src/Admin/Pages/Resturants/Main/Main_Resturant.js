import Background from "../../Backgrounds/Background";
import React from "react";
import SearchBox from '../Components/SearchBox/SearchBox.js';
import Scroll from '../Components/Scroll';
import CardList from '../Components/CardList';
import { resturants } from '../Components/ResturantsList';

class Main_Resturant extends React.Component {
  constructor(){
      super()
      this.state = {
          resturants: resturants,
          searchfield:''
      }
  }
  onSearchChange = (event) => {
      this.setState({searchfield:event.target.value})
  }
  render(){
  const filteredResturants = this.state.resturants.filter(resturants => {
      return resturants.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
  })
  
    return (
        <div>
            <Background />
            <SearchBox SearchChange = {this.onSearchChange}/>
            <h2 style={{textAlign:"center" , marginTop : '2rem' , color:"black"}}>All Resturants</h2>
            <CardList resturants = {filteredResturants}/>
        </div>
    );
  }
};

export default Main_Resturant;
