import React from "react";
import { Link } from 'react-router-dom';
import "../../Customers/Components/CustomersTable/CustomersTable.css";

const DriversTable = ({ drivers }) => {
    return (
        <div className="customers-table">
            <div className="scrollable-table">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Orders</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                    {drivers.map((value, i) => (
                            <tr key={i}>
                                <td>{i + 1}.</td>
                                <td>
                                    <Link to={`/driver/${drivers[i].id}`} className="customer-link">
                                        {drivers[i].name}
                                    </Link>
                                </td>
                                <td>{drivers[i].orders}</td>
                                <td>{drivers[i].rating}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DriversTable;
