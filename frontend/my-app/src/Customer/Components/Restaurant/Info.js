import React from "react"
import "./Info.css"
import R_Session from "./Session"

const Info = () => {
    return(
        <>
            <div className="c_info">
                <div className="c_info_image" style={{backgroundImage:`url(${R_Session.image})`,backgroudSize:"cover"}}></div>
                <p className="c_info_name">{R_Session.name}</p>
                <p className="c_info_cusine">{R_Session.cusine}</p>
                <p className="c_info_location">{R_Session.exact_address}</p>
            </div>
        </>
    )
} 

export default Info