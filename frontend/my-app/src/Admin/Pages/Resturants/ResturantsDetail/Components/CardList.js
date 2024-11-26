import React from 'react';
import Card from './Card/Card.js';

const CardList = ({ id, resturants }) => {

    const selectedRestaurant = resturants.find(resturant => resturant.id === id);

    if (!selectedRestaurant) {
        return <p style={{ padding: '2.7rem', marginTop: '2rem' }}>No Restaurant found</p>;
    }

    const { name, type, time, rating, location, total_orders, reviews } = selectedRestaurant;

    return (
        <div>
            <Card
                name={name}
                type={type}
                time={time}
                rating={rating}
                location={location}
                total_orders={total_orders}
                reviews={reviews}
            />
        </div>
    );
};

export default CardList;
