import React, { useState } from "react";
import "./Info.css";
import { useNavigate } from "react-router-dom";
import R_Session from "./Session";
import session1 from "../../../Session";
import Session from "./Session";


const Info = () => {
    const navigate = useNavigate();

    const [groupStatus, setGroupStatus] = useState(""); // "", "started", or "joined"
    const [groupCode, setGroupCode] = useState("");
    const [showStartPopup, setShowStartPopup] = useState(false);
    const [showJoinPopup, setShowJoinPopup] = useState(false);
    const [inputCode, setInputCode] = useState("");
    const [orderId, setOrderId] = useState("");

    const handleBack = () => {
        navigate("/profile");
    };

    const generateCode = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
        let code = "";
        for (let i = 0; i < 7; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    };

    const handleStartGroupOrder = async () => {
        const code = generateCode();
        const userId = session1.user_id;        // Replace with actual logged-in user ID
        const restaurantId = R_Session.restaurant_id;  // Replace with actual restaurant ID
        R_Session.group_order = 1;
        R_Session.group_leaderId = session1.user_id
        
        try {
            const response = await fetch(`http://localhost:5000/customer/mark-group-order?goc=${code}&uid=${userId}&rid=${restaurantId}`, {
                method: 'POST',
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log('Group order started successfully:', data.order);
                // Optionally update UI state
            } else {
                console.error('Failed to start group order:', data.message);
            }
        } catch (error) {
            console.error('Error calling mark-group-order API:', error);
        }
        setGroupCode(code);
        setGroupStatus("started");
        setShowStartPopup(true);
    };
    
    

    const handleJoinGroupOrder =  () => {
        setInputCode("");
        setShowJoinPopup(true);
    };

    const handleCancelGroupOrder = async () => {
        if (window.confirm("Are you sure you want to cancel the group order?")) {
            try {
                const response = await fetch(`http://localhost:5000/customer/cancel-group-order?&uid=${session1.user_id}`, {
                    method: 'POST',
                });
                
                const data = await response.json();
                
                if (data.success) {
                    console.log('Group order end successfully:', data.order);
                    // Optionally update UI state
                } else {
                    console.error('Failed to end group order:', data.message);
                }
            } catch (error) {
                console.error('Error calling cancel-group-order API:', error);
            }
            setGroupStatus("");
            setGroupCode("");
            R_Session.group_order = 0;
        }
    };

    const handleLeaveGroupOrder = () => {
        if (window.confirm("Are you sure you want to leave the group order?")) {
            setGroupStatus("");
            setGroupCode("");
            R_Session.group_leaderId = -1;
            R_Session.group_order = 0;
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(groupCode);
        alert("Group code copied to clipboard!");
    };

    const handleJoin = async () => {
        if (inputCode.trim().length < 5) {
            alert("Please enter a valid group code.");
           
        }
        
        try {
            const response = await fetch(`http://localhost:5000/customer/join-group-order?&cog=${inputCode}`, {
                method:'POST',
            });
            
            const data = await response.json();
            R_Session.group_order = 1;
            R_Session.group_leaderId = data.Customer_id;
           
            if (data.success) {
                console.log('Group order joined successfully:', data.order);
                // Optionally update UI state
            } else {
                console.error('Failed to join group order:', data.message);
            }
        } catch (error) {
            console.error('Error calling join-group-order API:', error);
        }
        setGroupStatus("joined");
        setGroupCode(inputCode);
        setShowJoinPopup(false);
        alert(`Successfully joined the group with code: ${inputCode}`);
    };

    return (
        <>
            <div className="c_info">
                <button className="back" onClick={handleBack}>Back</button>

                <div
                    className="c_info_image"
                    style={{
                        backgroundImage: `url(${R_Session.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "200px",
                        width: "30%",
                    }}
                ></div>

                <p className="c_info_name">{R_Session.name}</p>
                <p className="c_info_cusine">{R_Session.cusine}</p>
                <p className="c_info_location">{R_Session.exact_address}</p>

                {groupStatus === "started" && (
                    <p className="group-status">Group Order Started (Code: {groupCode})</p>
                )}
                {groupStatus === "joined" && (
                    <p className="group-status">Joined Group Order (Code: {groupCode})</p>
                )}
            </div>

            {/* Group Start/Cancel */}
            {groupStatus === "started" ? (
                <button className="StartGroupOrderbtn" onClick={handleCancelGroupOrder}>
                    Cancel Group Order
                </button>
            ) : (
                <button
                    className="StartGroupOrderbtn"
                    onClick={handleStartGroupOrder}
                    disabled={groupStatus === "joined"}
                    style={{ backgroundColor: groupStatus === "joined" ? "#ccc" : "" }}
                >
                    Start Group Order
                </button>
            )}

            {/* Group Join/Leave */}
            {groupStatus === "joined" ? (
                <button className="JoinGroupOrderbtn" onClick={handleLeaveGroupOrder}>
                    Leave Group Order
                </button>
            ) : (
                <button
                    className="JoinGroupOrderbtn"
                    onClick={handleJoinGroupOrder}
                    disabled={groupStatus === "started"}
                    style={{ backgroundColor: groupStatus === "started" ? "#ccc" : "" }}
                >
                    Join Group Order
                </button>
            )}

            {/* Start Group Popup */}
            {showStartPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Group Order Started</h3>
                        <p>Share this code with your friends:</p>
                        <div className="code-box">
                            <span>{groupCode}</span>
                            <button onClick={handleCopy}>Copy</button>
                        </div>
                        <p className="group-note">
                            As you are the group leader, the payment will be handled on your side.
                        </p>
                        <button className="close-popup" onClick={() => setShowStartPopup(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* Join Group Popup */}
            {showJoinPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Join a Group Order</h3>
                        <p>Enter the group code shared by your friend:</p>
                        <input
                            type="text"
                            className="code-input"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            placeholder="Enter group code"
                        />
                        <div style={{ marginTop: "10px" }}>
                            <button onClick={handleJoin} className="join-btn">Join</button>
                            <button onClick={() => setShowJoinPopup(false)} className="close-popup">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Info;
