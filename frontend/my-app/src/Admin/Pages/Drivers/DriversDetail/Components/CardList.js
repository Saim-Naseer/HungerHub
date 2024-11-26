import React from 'react';
import Card from './Card/Card.js';

const CardList = ({ id, drivers }) => {

    const selectedDriver = drivers.find(driver => driver.id === id);

    if (!selectedDriver) {
        return <p style={{ padding: '2.7rem', marginTop: '2rem' }}>No Driver found</p>;
    }

    const { name, email, number, rating, location, orders } = selectedDriver;

    return (
        <div>
            <Card
                name={name}
                email={email}
                number={number}
                location={location}
                orders={orders}
                rating={rating}
            />
        </div>
    );
};

export default CardList;
