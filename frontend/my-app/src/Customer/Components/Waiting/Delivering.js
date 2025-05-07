import React from "react"
import "./Preparing.css"
import Session from "./Session"
import Ri from "./Ri"

class Preparing extends React.Component{
    constructor() {
        super()
        this.state={
            name:"",
            email:"",
            phone:"",
            report:false
        }
    }

    closeReport = () => {
        this.setState({report:false})
    }

    openReport = () => {
        this.setState({report:true})
    }


    fetchData = async() =>{
        const data = await fetch(`http://localhost:5000/customer/riderinfo?rid=${this.props.Rider_id}`)
        const data2 = await data.json()

        this.setState({
            name:data2.name,
            email:data2.email,
            phone:data2.phone
        })

        Session.Rider_id=data2.Rider_id
    }

    componentDidMount = async()=>{
        await this.fetchData()
    }

    render()
    {
        let content
        if(this.state.report===false)
        {
            content=(
            <>
                <div className="c_status">
                    <div className="c_circle2" style={{backgroundColor:"#22476D",color:"#D9D9D9"}}><p>1</p></div>
                    <div className="c_bar2" style={{backgroundColor:"#22476D"}}></div>
    
                    <div className="c_circle2" style={{border:"8px solid #22476D",position:"relative",right:"5px"}}><p>2</p></div>
                    <div className="c_bar2" ></div>
    
                    <div className="c_circle2" ><p>3</p></div>
                </div>
                <p className="c_statustext2_1" >Your Order is Being Prepared</p>
                <p className="c_statustext2_2"style={{color:"#22476D"}}>Your Order is on the way</p>
                <p className="c_statustext2_3">Your Order is Delivered</p>
    
                <div className="wait_container">
                    <h3 className="wait_heading">Rider Info</h3>
                    <div className="wait_details">
                        <p className="wait_detail"><span className="wait_label">Name:</span> {this.state.name}</p>
                        <p className="wait_detail"><span className="wait_label">Email:</span> {this.state.email}</p>
                        <p className="wait_detail"><span className="wait_label">Number:</span>+{this.state.phone}</p>
                    </div>
                    <div style={{
                        backgroundColor:"red",
                        color:"white",
                        display:"inline-flex",
                        width:"120px",
                        height:"30px",
                        justifyContent:"center",
                        alignItems:"center",
                        fontSize:"22px",
                        position:"relative",
                        left:"90px",
                        bottom:"000px",
                        borderRadius:"10px",
                        cursor:"pointer"
                        }}  onClick={this.openReport}>Report</div>
                </div>
            </>
            )
        }
        else if(this.state.report===true)
        {
            content = (
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
    
                <div className="wait_container">
                    <h3 className="wait_heading">Rider Info</h3>
                    <div className="wait_details">
                        <p className="wait_detail"><span className="wait_label">Name:</span> {this.state.name}</p>
                        <p className="wait_detail"><span className="wait_label">Email:</span> {this.state.email}</p>
                        <p className="wait_detail"><span className="wait_label">Number:</span>+{this.state.phone}</p>
                    </div>
                    <Ri CloseReport = {this.closeReport} Rider_id={this.props.Rider_id}/>
                </div>
            </>
            )
        }
        return(
            <>
                {content}
            </>
        )
    }
    
}

export default Preparing