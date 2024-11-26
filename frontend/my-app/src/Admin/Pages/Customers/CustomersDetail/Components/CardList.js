import React from 'react';
import Card from './Card/Card.js';

const CardList = ({ id, customers }) => {

    const selectedCustomer = customers.find(customer => customer.id === id);

    if (!selectedCustomer) {
        return <p style={{ padding: '2.7rem', marginTop: '2rem' }}>No Customer found</p>;
    }

    const { name, email, number, reviews, location, orders } = selectedCustomer;

    return (
        <div>
            <Card
                name={name}
                email={email}
                number={number}
                location={location}
                orders={orders}
                reviews={reviews}
            />
        </div>
    );
};

export default CardList;
