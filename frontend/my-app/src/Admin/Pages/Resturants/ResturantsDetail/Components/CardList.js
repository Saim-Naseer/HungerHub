import React from 'react';
import Card from './Card/Card.js';

const CardList = ({ Restaurant_id, restaurants }) => {

    const selectedRestaurant = restaurants.find(restaurant => restaurant.Restaurant_id === Restaurant_id);

    if (!selectedRestaurant) {
        return <p style={{ padding: '2.7rem', marginTop: '2rem' }}>No Restaurant found</p>;
    }

    const { name, email,phone,total_stars,exact_address, total_ratings, cusine, onDelete, image } = selectedRestaurant;

    return (
        <div>
            <Card
                Restaurant_id={Restaurant_id}
                name={name}
                email={email}
                phone={phone}
                exact_address={exact_address}
                total_ratings={total_ratings}
                total_stars={total_stars}
                cusine={cusine}
                onDelete={onDelete}
                image={image}
            />
        </div>
    );
};

export default CardList;
