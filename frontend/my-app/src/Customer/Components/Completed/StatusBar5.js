import React from "react"
import "../ConfCart/StatusBar.css"

const StatusBar = (props) =>{
    return(
        <>
            <div className="c_statusbar" style={{position:"relative",left:"10px"}} >
                <div className="c_circle" style={{backgroundColor:"#22476D",color:"#D9D9D9"}}><p>1</p></div>
                <div className="c_bar" style={{backgroundColor:"#22476D"}}></div>

                <div className="c_circle" style={{backgroundColor:"#22476D",color:"#D9D9D9"}} ><p>2</p></div>
                <div className="c_bar" style={{backgroundColor:"#22476D"}}></div>

                <div className="c_circle" style={{backgroundColor:"#22476D",color:"#D9D9D9"}}><p>3</p></div>
                <div className="c_bar" style={{backgroundColor:"#22476D"}}></div>

                <div className="c_circle" style={{backgroundColor:"#22476D",color:"#D9D9D9"}} ><p>4</p></div>
                <div className="c_bar" style={{backgroundColor:"#22476D"}}></div>
                
                <div className="c_circle" style={{border:"10px solid #22476D"}}><p>5</p></div>
                <p className="c_statustext">Completed</p>
            </div>
        </>
    )
}

export default StatusBar