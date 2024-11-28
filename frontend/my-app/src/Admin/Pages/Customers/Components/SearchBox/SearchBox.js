import React from 'react'
import './SearchBox.css'
const SearchBox = ({searchfield,SearchChange}) => {
    return(
        <div className = "search_box_customer" >
            <h3 style = {{ fontFamily : "Georgia, serif" }}>Search by Name :</h3>
            <input type="search" 
            placeholder='Search Customer'
            onChange={SearchChange} />
        </div>
    );
}
export default SearchBox