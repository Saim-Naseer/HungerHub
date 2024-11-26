import React from "react";
import "../../Resturants_Report/Components/reportsTable/reportsTable.css";

const reportsTable = ({ riders_reports }) => {
    
    return (
        <div className="table-container">
            <div className="scrollable-table">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Riders Name</th>
                            <th>Customer Name</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riders_reports.map((value, i) => {
                            return (
                                <tr key={i} >
                                    <td>{i + 1}.</td>
                                    <td>{riders_reports[i].rider_name}</td>
                                    <td>{riders_reports[i].customer_name}</td>
                                    <td className="message">Message : {riders_reports[i].message}
                                        <div className="reports-input">
                                            <p>Reply</p>
                                            <input className = "input-button" ></input>
                                            <button className = "enter">Enter</button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default reportsTable;
