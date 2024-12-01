import React from "react"
import "../ConfCart/StatusBar.css"

const StatusBar = (props) =>{
    return(
        <>
            <div className="c_statusbar" style={{position:"relative",left:"20px"}} >
                <div className="c_circle" style={{backgroundColor:"#22476D",color:"#D9D9D9"}} onClick={()=>props.pagefunc("home")}><p>1</p></div>
                <div className="c_bar" style={{backgroundColor:"#22476D"}}></div>

                <div className="c_circle" style={{backgroundColor:"#22476D",color:"#D9D9D9"}} onClick={()=>props.pagefunc("confcart")}><p>2</p></div>
                <div className="c_bar" style={{backgroundColor:"#22476D"}}></div>

                <div className="c_circle" style={{border:"10px solid #22476D"}}><p>3</p></div>
                <p className="c_statustext">Payment</p>
                <div className="c_bar"></div>

                <div className="c_circle"><p>4</p></div>
                <div className="c_bar"></div>
                
                <div className="c_circle"><p>5</p></div>
            </div>
        </>
    )
}

export default StatusBar