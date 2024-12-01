import React from 'react';
import Card from './Card/Card.js';

const CardList = ({ restaurants }) => {
    const CardComponent = restaurants.map((restaurant) => {
        return (
            <Card 
                key={restaurant.Restaurant_id} 
                Restaurant_id={restaurant.Restaurant_id} 
                name={restaurant.name} 
                cusine={restaurant.cusine} 
                total_ratings={restaurant.total_ratings}
                image={restaurant.image} 
                total_stars={restaurant.total_stars}
                description={restaurant.description}
            />
        );
    });

    return (
        <div style={{ paddingLeft: '2.7rem', marginTop: "2rem" }}>
            {CardComponent}
        </div>
    );
}

export default CardList;
