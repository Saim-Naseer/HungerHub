import React from "react";
import { Link } from 'react-router-dom';
import Background from "../../Backgrounds/Background";
import "./main_report.css"

class Main_Report extends React.Component {
    render(){
        return(
            <div>           
                <Background />
                <div className="report">
                    <div className="resturants-report">
                        <h2>Resturant's Report</h2>
                        <Link to = "/resturant-report">
                        <button className="display-button">Display Report</button>  
                        </Link>  
                    </div>
                    <div className="riders-report">
                        <h2>Rider's Report</h2>
                        <Link to = "/rider-report" >
                        <button className="display-button">Display Report</button>   
                        </Link> 
                    </div>
                </div>
            </div>
        );
    }
}
export default Main_Report