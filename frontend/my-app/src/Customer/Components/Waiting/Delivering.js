import React from "react"
import "./Preparing.css"

const Preparing =()=>{
    return(
        <>
            <div className="c_status">
                <div className="c_circle2" style={{backgroundColor:"#22476D",color:"#D9D9D9"}}><p>1</p></div>
                <div className="c_bar2" style={{backgroundColor:"#22476D"}}></div>

                <div className="c_circle2" style={{border:"10px solid #22476D",position:"relative",right:"5px"}}><p>2</p></div>
                <div className="c_bar2" ></div>

                <div className="c_circle2" ><p>3</p></div>
            </div>
            <p className="c_statustext2_1" >Your Order is Being Prepared</p>
            <p className="c_statustext2_2"style={{color:"#22476D"}}>Your Order is on the way</p>
            <p className="c_statustext2_3">Your Order is Delivered</p>
        </>
    )
}

export default Preparing