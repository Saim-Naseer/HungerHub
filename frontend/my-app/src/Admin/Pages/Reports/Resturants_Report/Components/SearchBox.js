import React from 'react'
import '../../../Customers/Components/SearchBox/SearchBox.css'
const SearchBox = ({searchfield,SearchChange}) => {
    return(
        <div className = "search_box_customer" >
            <h3 style = {{ fontFamily : "Georgia, serif" }}>Search by Name :</h3>
            <input type="search" 
            placeholder='Search Resturant'
            onChange={SearchChange} />
        </div>
    );
}
export default SearchBox