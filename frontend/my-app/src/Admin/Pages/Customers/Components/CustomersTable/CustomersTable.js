import React from "react";
import { Link } from 'react-router-dom';
import "./CustomersTable.css";

const CustomersTable = ({ customers }) => {
    return (
        <div className="customers-table">
            <div className="scrollable-table">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((value, i) => (
                            <tr key={i}>
                                <td>{i + 1}.</td>
                                <td>
                                    <Link to={`/customer/${customers[i].Customer_id}`} className="customer-link">
                                        {customers[i].name}
                                    </Link>
                                </td>
                                <td>{customers[i].email}</td>
                                <td>{customers[i].phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomersTable;
