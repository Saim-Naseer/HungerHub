import React from "react";
import "./reportsTable.css";

const reportsTable = ({ resturants_reports }) => {
    
    return (
        <div className="table-container">
            <div className="scrollable-table">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Resturant Name</th>
                            <th>Customer Name</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resturants_reports.map((value, i) => {
                            return (
                                <tr key={i} >
                                    <td>{i + 1}.</td>
                                    <td>{resturants_reports[i].resturant_name}</td>
                                    <td>{resturants_reports[i].customer_name}</td>
                                    <td className="message">Message : {resturants_reports[i].message}
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
