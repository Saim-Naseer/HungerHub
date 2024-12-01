import React from "react";
import { Link } from 'react-router-dom';
import "../../Customers/Components/CustomersTable/CustomersTable.css";

const DriversTable = ({ drivers }) => {
    const rating = ((drivers.total_stars/drivers.total_ratings)/2).toFixed(1)
    return (
        <div className="customers-table">
            <div className="scrollable-table">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                    {drivers.map((value, i) => (
                            <tr key={i}>
                                <td>{i + 1}.</td>
                                <td>
                                    <Link to={`/driver/${drivers[i].Rider_id}`} className="customer-link">
                                        {drivers[i].name}
                                    </Link>
                                </td>
                                <td>{drivers[i].email}</td>
                                <td>{((drivers[i].total_stars/drivers[i].total_ratings)/2).toFixed(1)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DriversTable;
