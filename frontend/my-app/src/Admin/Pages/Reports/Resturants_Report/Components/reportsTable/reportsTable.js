import React, { useState } from "react";
import "./reportsTable.css";

const ReportsTable = ({ resturants_reports,onRefresh }) => {
    const [replies, setReplies] = useState({}); // State to manage replies for input boxes

    const handleReply = async (index, replyText, restaurantId) => {
        try {
            // Make the API call to update the reply
            const response = await fetch(`http://localhost:5000/admin/restaurantReports/${restaurantId}/reply`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reply: replyText }),
            });

            const result = await response.json();

            if (response.ok) {
                // Remove the report from the local state after reply is updated
                resturants_reports.splice(index, 1); // Remove the report at the current index

                // Clear input after successful update
                setReplies((prevReplies) => ({
                    ...prevReplies,
                    [index]: "", // Clear the reply input
                }));
                onRefresh();
            } else {
                console.error("Error updating report reply:", result);
            }
        } catch (error) {
            console.error("Error making API call:", error);
        }
    };

    // Filter reports with no reply
    const filteredReports = resturants_reports.filter((report) => !report.Reply);

    return (
        <div className="table-container">
            <div className="scrollable-table">
                {filteredReports.length === 0 ? (
                    <p style={{ textAlign: "center" }}>No reports found</p> // Display message if no reports
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Restaurant Name</th>
                                <th>Customer Name</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.map((report, i) => (
                                <tr key={i}>
                                    <td>{i + 1}.</td>
                                    <td>{report.restaurant_name || "Unknown Restaurant"}</td>
                                    <td>{report.customer_name || "Anonymous"}</td>
                                    <td>
                                        <div className="message">Message: {report.message}</div>

                                        {report.reply ? (
                                            <p>{report.reply}</p> // Show reply if it exists
                                        ) : (
                                            <div className="reports-input">
                                                <p>Reply</p>
                                                <input
                                                    className="input-button"
                                                    type="text"
                                                    value={replies[i] || ""}
                                                    onChange={(e) =>
                                                        setReplies((prevReplies) => ({
                                                            ...prevReplies,
                                                            [i]: e.target.value,
                                                        }))
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" && replies[i]?.trim()) {
                                                            handleReply(i, replies[i].trim(), report.Restaurant_id);
                                                        }
                                                    }}
                                                />
                                                <button
                                                    className="enter"
                                                    onClick={() => {
                                                        if (replies[i]?.trim()) {
                                                            handleReply(i, replies[i].trim(), report.Restaurant_id);
                                                        }
                                                    }}
                                                >
                                                    Enter
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ReportsTable;
