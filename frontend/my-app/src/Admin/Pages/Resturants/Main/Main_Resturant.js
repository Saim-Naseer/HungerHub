import Background from "../../Backgrounds/Background";
import React from "react";
import SearchBox from '../Components/SearchBox/SearchBox.js';
import CardList from '../Components/CardList';

class Main_Resturant extends React.Component {
  constructor(){
      super()
      this.state = {
          restaurants: [],
          searchfield: ''
      }
  }

  fetchData = async() => {
    const restaurants = await fetch("http://localhost:5000/admin/restaurants");
    const data = await restaurants.json();
    console.log(data);
    this.setState({ restaurants: data});
  }

  componentDidMount() {
    this.fetchData();
  }

  onSearchChange = (event) => {
      this.setState({ searchfield: event.target.value });
  }

  render() {
    const filteredRestaurants = this.state.restaurants.filter(restaurant => {
        // Ensure restaurant has a 'name' property before calling toLowerCase
        return restaurant.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    });

    return (
        <div>
            <Background />
            <SearchBox SearchChange={this.onSearchChange}/>
            <h2 style={{textAlign: "center", marginTop: '2rem', color: "black"}}>All Restaurants</h2>
            <CardList restaurants={filteredRestaurants}/>
        </div>
    );
  }
}

export default Main_Resturant;

