import React from 'react';
import Card from './Card/Card.js';

const CardList = ({ Rider_id, drivers }) => {

    const selectedDriver = drivers.find(driver => driver.Rider_id === Rider_id);

    if (!selectedDriver) {
        return <p style={{ padding: '2.7rem', marginTop: '2rem' }}>No Driver found</p>;
    }

    const { name, email, phone, total_stars, total_ratings, location, image,  onDelete } = selectedDriver;

    return (
        <div>
            <Card
                Rider_id={Rider_id}
                name={name}
                email={email}
                phone={phone}
                location={location}
                total_stars={total_stars}
                total_ratings={total_ratings}
                image={image}
                onDelete={onDelete}
            />
        </div>
    );
};

export default CardList;
