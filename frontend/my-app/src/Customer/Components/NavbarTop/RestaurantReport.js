import Session from "../../../Session";
import "./Report.css";
import React from "react";

class RestaurantReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            restaurants: [],
            search: "",
        };
    }

    fetchData = async () => {
        try {
            // Fetch reports for the customer
            const reportsResponse = await fetch(`http://localhost:5000/customer/restaurantreports?uid=${Session.user_id}`);
            if (!reportsResponse.ok) {
                throw new Error("Failed to fetch reports");
            }
            const reportsData = await reportsResponse.json();

            // Fetch all restaurants
            const restaurantsResponse = await fetch("http://localhost:5000/admin/restaurants");
            if (!restaurantsResponse.ok) {
                throw new Error("Failed to fetch restaurants");
            }
            const restaurantsData = await restaurantsResponse.json();

            this.setState({
                reports: reportsData,
                restaurants: restaurantsData,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const { reports, restaurants, search } = this.state;

        // Map restaurant names to reports based on restaurant IDs
        const reportsWithNames = reports.map((report) => {
            const restaurant = restaurants.find((r) => r.Restaurant_id === report.Restaurant_id);
            return {
                ...report,
                restaurant_name: restaurant ? restaurant.name : "Unknown Restaurant",
            };
        });

        // Filter reports based on search input, searching in restaurant names
        const filteredReports = reportsWithNames.filter((report) =>
            report.restaurant_name.toLowerCase().includes(search.toLowerCase())
        );

        // Sort reports: those with replies come first
        const sortedReports = filteredReports.sort((a, b) => {
            // Check if report has a reply and sort accordingly
            if (a.Reply && a.Reply.trim() !== "" && (!b.Reply || b.Reply.trim() === "")) {
                return -1; // `a` comes before `b`
            } else if ((!a.Reply || a.Reply.trim() === "") && b.Reply && b.Reply.trim() !== "") {
                return 1; // `b` comes before `a`
            }
            return 0; // Maintain the original order for reports with or without replies
        });

        return (
            <div>
                <div className="search_box_customer_report">
                    <input
                        type="text"
                        placeholder="Search by restaurant's name"
                        onChange={(event) => this.setState({ search: event.target.value })}
                    />
                </div>
                <div className="report-list">
                    {sortedReports.map((report, index) => (
                        <div key={index} className="report-item">
                            <h3>{report.restaurant_name}</h3>
                            <p><div className="report-message">Message</div> {report.Message}</p>
                            {/* Conditionally render the reply section */}
                            {report.Reply && report.Reply.trim() !== "" && (
                                <p><div className="report-reply">Reply</div> {report.Reply}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default RestaurantReport;
