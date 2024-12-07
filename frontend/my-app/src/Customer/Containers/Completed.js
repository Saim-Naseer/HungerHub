import React from "react"
import StatusBar from "../Components/Completed/StatusBar5"
import "../Components/Completed/Completed.css"


class Completed extends React.Component{
    render()
    {
        return(
            <>
                <StatusBar/>
                <div className="c_completed"></div>
            </>
        )
    }
}

export default Completed