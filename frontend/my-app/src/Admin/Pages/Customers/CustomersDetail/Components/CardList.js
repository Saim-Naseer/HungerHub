import React from 'react';
import Card from './Card/Card.js';

const CardList = ({ Customer_id, customers }) => {
    console.log(customers)
    const selectedCustomer = customers.find(customers => customers.Customer_id === Customer_id);
    if (!selectedCustomer) {
        return <p style={{ padding: '2.7rem', marginTop: '2rem' }}>No Customer found</p>;
    }
    
    const { name, email, phone, exact_address, onDelete,image } = selectedCustomer;

    return (
        <div>
            <Card
                Customer_id={Customer_id}
                name={name}
                email={email}
                phone={phone}
                exact_address={exact_address}
                onDelete={onDelete}
                image={image}
            />
        </div>
    );
};

export default CardList;
