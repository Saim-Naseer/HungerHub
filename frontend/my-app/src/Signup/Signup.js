import React from "react"
import Signin from "../Signin/Signin"
import Customer from "../Customer/Containers/App"
import Rider from "../Rider/Containers/App"
import Restaurant from "../Restaurant/Containers/App"
import Session from "../Session"

import "./Signup.css"

class Signup extends React.Component{
    constructor()
    {
        super()
        this.state={
            name:"",
            email:"",
            phone:-1,
            role:"-",
            region:"-",
            address:"",
            pwd:"",
            cpwd:"",
            forget:"",
            page:"signup",
            res_image:null,
            res_description:"",
            res_cuisine:"",
            rid_image:null,
            borderColor:{
                name:"#F8F8F8",
                email:"#F8F8F8",
                phone:"#F8F8F8",
                role:"#F8F8F8",
                region:"#F8F8F8",
                address:"#F8F8F8",
                pwd:"#F8F8F8",
                cpwd:"#F8F8F8",
                forget:"#F8F8F8",
                res_image:"#F8F8F8",
                res_description:"#F8F8F8",
                res_cuisine:"#F8F8F8",
                rid_image:"#F8F8F8"
            },
            match:true
        }
    }


    enterField = () => {
        
        const borderColor1 = {...this.state.borderColor}

        borderColor1.name = (this.state.name==="") ? "red" : "#F8F8F8";
        borderColor1.email = (this.state.email==="") ? "red" : "#F8F8F8";
        borderColor1.phone = (this.state.phone===-1) ? "red" : "#F8F8F8";
        borderColor1.role = (this.state.role==="-") ? "red" : "#F8F8F8";
        borderColor1.region = (this.state.region==="-") ? "red" : "#F8F8F8";
        borderColor1.address = (this.state.address==="") ? "red" : "#F8F8F8";
        borderColor1.pwd = (this.state.pwd==="") ? "red" : "#F8F8F8";
        borderColor1.cpwd = (this.state.cpwd==="") ? "red" : "#F8F8F8";
        borderColor1.forget = (this.state.forget==="") ? "red" : "#F8F8F8";

        borderColor1.res_image = (this.state.res_image===null) ? "red" : "#F8F8F8";
        borderColor1.res_cuisine = (this.state.res_cuisine==="") ? "red" : "#F8F8F8";
        borderColor1.res_description = (this.state.res_description==="") ? "red" : "#F8F8F8";

        borderColor1.rid_image = (this.state.rid_image===null) ? "red" : "#F8F8F8";

        this.setState({borderColor:borderColor1})
    }


    postUser = async() =>{
        const formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('phone', this.state.phone)
        formData.append('role', this.state.role)
        formData.append('region', this.state.region)
        formData.append('address', this.state.address)
        formData.append('pwd', this.state.pwd)
        formData.append('forget', this.state.forget)

        if(this.state.role==="Restaurant")
        {
            formData.append('image', this.state.res_image)
            formData.append('cusine', this.state.res_cuisine)
            formData.append('description', this.state.res_description)
        }
        else if(this.state.role==="Rider")
        {
            formData.append('image', this.state.rid_image)
        }

        try {
            // Send the file and additional data using fetch
            const response = await fetch('http://localhost:5000/customer/signup', {
                method: 'POST',
                body: formData, // Send FormData
            });
    
            const result = await response.json();
            console.log('Upload response:', result);

            alert(result.message)

            if(result.message==="succesfull")
            {
                if(this.state.role==="Customer")
                {
                    this.setState({page:"customer"})
                }
                else if(this.state.role==="Rider")
                {
                    this.setState({page:"rider"})
                }
                else if(this.state.role==="Restaurant")
                {
                    this.setState({page:"restaurant"})
                }

                Session.user_id=result.message2
                Session.name=this.state.name
                Session.email=this.state.email
                Session.location=this.state.region
                Session.address=this.state.address
                Session.phone=this.state.phone
            }

        } catch (error) {
            console.error('Error uploading data:', error);
        }

    }


    checkInputs = async() => {
        if(this.state.name!=="" & this.state.email!=="" & this.state.phone!==-1 & this.state.role!=="-" & this.state.region!=="-" & this.state.address!=="" & this.state.pwd!=="" & this.state.cpwd!=="" & this.state.forget!=="")
        {
        
            if(this.state.role==="-" || this.state.role==="Customer")
            {
                if(this.state.pwd===this.state.cpwd)
                {
                    //this.setState({page:"home"})
    
                    await this.postUser()
                }
                else{
                    this.setState({match:false})
                }
            }
            else if(this.state.role==="Restaurant")
            {
                if(this.state.res_image!==null & this.state.res_cuisine!=="" & this.state.res_description!=="")
                {
                    if(this.state.pwd===this.state.cpwd)
                    {
                        //this.setState({page:"home"})
        
                        //api post(user)
                        await this.postUser()
                    }
                    else{
                        this.setState({match:false})
                    }
                }
            }
            else if(this.state.role==="Rider")
            {
                if(this.state.rid_image!==null)
                {
                    if(this.state.pwd===this.state.cpwd)
                    {
                        //this.setState({page:"home"})
        
                        //api post(user)
                        await this.postUser()
                    }
                    else{
                        this.setState({match:false})
                    }
                }
            }
        }
        else if(this.state.pwd===this.state.cpwd)
        {
            this.enterField()
        }
        else{
            this.setState({match:false})
            this.enterField()
        }
    }

    changePage = (pageName) => {
        this.setState({page:pageName})
    }


    render()
    {

        let content;
        let content1;

        if(this.state.role==="-" || this.state.role==="Customer")
        {
           
            content1 = (
                <>
                    <div className="signup_body"></div>
                    <div className="signup_background">
                        <div className="signup_box">
                            <p className="signup_title">Sign Up</p>
    
                            <div className="signup_boxes">
                                <div className="signup_personal">
                                    <p className="signup_title3_personal">Personal Info</p>
                                    <p className="signup_title2">Name</p> 
                                    <input type="text" placeholder="Name"  className="name1" style={{borderColor:this.state.borderColor.name}} onChange={(event)=>this.setState({name:event.target.value})}/>
                                    <p className="signup_title2">Email</p>
                                    <input type="email" placeholder="Email"  className="email1" style={{borderColor:this.state.borderColor.email}} onChange={(event)=>this.setState({email:event.target.value})}/>
                                    <p className="signup_title2">Phone no.</p>
                                    <input type="number" placeholder="Phone No."  className="phone1" style={{borderColor:this.state.borderColor.phone}} onChange={(event)=>this.setState({phone:event.target.value})}/>
                                    <p className="signup_title2">Role</p>
                                    <select className="role" style={{borderColor:this.state.borderColor.role}} onChange={(event)=>this.setState({role:event.target.value})}>
                                        <option>-</option>
                                        <option>Customer</option>
                                        <option>Restaurant</option>
                                        <option>Rider</option>
                                    </select>
                                </div>
        
                                      
                                <div className="signup_pwd">
                                    <p className="signup_title3_security">Security Info</p>
                                    <p className="signup_title2">Password</p>
                                    <input type="password" placeholder="Password" className="pwd1" style={{borderColor:this.state.borderColor.pwd}} onChange={(event)=>this.setState({pwd:event.target.value})}/>
                                    <p className="signup_title2">Confirm Password</p>
                                    <input type="password" placeholder="Confirm Password" className="pwd2" style={{borderColor:this.state.borderColor.cpwd}} onChange={(event)=>this.setState({cpwd:event.target.value})}/>
                                    <p className="signup_title2">Favourite Meal</p>
                                    <input type="text" placeholder="Favourite Meal"  className="forget1" style={{borderColor:this.state.borderColor.forget}} onChange={(event)=>this.setState({forget:event.target.value})}/>
                                </div>

                                <div className="signup_address">
                                    <p className="signup_title3_location">Location Info</p>
                                    <p className="signup_title2">Region</p>
                                    <select className="region" style={{borderColor:this.state.borderColor.region}} onChange={(event)=>this.setState({region:event.target.value})}>
                                        <option>-</option>
                                        <option>Shahdara, Badami Bagh, Ravi Town</option>
                                        <option>Inner Lahore, Anarkali, Data Darbar, Circular Road</option>
                                        <option>Liberty Market, MM Alam Road, Ghalib Market, Main Boulevard</option>
                                        <option>Model Town, Garden Town, Faisal Town, Township</option>
                                        <option>DHA Phases 1-8, Lahore Cantt, Walton</option>
                                        <option>Johar Town, Wapda Town, Valencia Town</option>
                                        <option>Allama Iqbal Town, Sabzazar, Samanabad</option>
                                        <option>Bahria Town, NFC Society, Canal Road extensions</option>
                                    </select>
                                    <p className="signup_title2">Exact Address</p>
                                    <input type="text" placeholder="Exact Address"  className="address1" style={{borderColor:this.state.borderColor.address}} onChange={(event)=>this.setState({address:event.target.value})}/>
                                </div>
 
        
                            </div> 

                            <div className="logo2"></div>
                            
                            <div className="button1" onClick={()=>this.checkInputs()}>Sign Up</div>
                            <p className="account1">Already have an account <p className="signup_signin" onClick={()=> this.changePage("signin")}>SIGN IN</p></p>

                        </div>
                    </div>
                </>
            )
    
        }
        else if(this.state.role==="Restaurant")
        {
            console.log(this.state.res_image)
            content1 = (
                <>
                    <div className="signup_background">
                        <div className="signup_box">
                            <p className="signup_title">Sign Up</p>
    
                            <div className="signup_boxes">
                                <div className="signup_personal">
                                    <p className="signup_title3_personal">Personal Info</p>
                                    <p className="signup_title2">Name</p> 
                                    <input type="text" placeholder="Name"  className="name1" style={{borderColor:this.state.borderColor.name}} onChange={(event)=>this.setState({name:event.target.value})}/>
                                    <p className="signup_title2">Email</p>
                                    <input type="email" placeholder="Email"  className="email1" style={{borderColor:this.state.borderColor.email}} onChange={(event)=>this.setState({email:event.target.value})}/>
                                    <p className="signup_title2">Phone no.</p>
                                    <input type="number" placeholder="Phone No."  className="phone1" style={{borderColor:this.state.borderColor.phone}} onChange={(event)=>this.setState({phone:event.target.value})}/>
                                    <p className="signup_title2">Role</p>
                                    <select className="role" style={{borderColor:this.state.borderColor.role}} onChange={(event)=>this.setState({role:event.target.value})}>
                                        <option>-</option>
                                        <option>Customer</option>
                                        <option>Restaurant</option>
                                        <option>Rider</option>
                                    </select>
                                </div>

                                
                                <div className="signup_pwd">
                                    <p className="signup_title3_security">Security Info</p>
                                    <p className="signup_title2">Password</p>
                                    <input type="password" placeholder="Password" className="pwd1" style={{borderColor:this.state.borderColor.pwd}} onChange={(event)=>this.setState({pwd:event.target.value})}/>
                                    <p className="signup_title2">Confirm Password</p>
                                    <input type="password" placeholder="Confirm Password" className="pwd2" style={{borderColor:this.state.borderColor.cpwd}} onChange={(event)=>this.setState({cpwd:event.target.value})}/>
                                    <p className="signup_title2">Favourite Meal</p>
                                    <input type="text" placeholder="Favourite Meal"  className="forget1" style={{borderColor:this.state.borderColor.forget}} onChange={(event)=>this.setState({forget:event.target.value})}/>
                                </div>
                                
                                <div className="signup_address">
                                    <p className="signup_title3_location">Location Info</p>
                                    <p className="signup_title2">Region</p>
                                    <select className="region" style={{borderColor:this.state.borderColor.region}} onChange={(event)=>this.setState({region:event.target.value})}>
                                        <option>-</option>
                                        <option>Shahdara, Badami Bagh, Ravi Town</option>
                                        <option>Inner Lahore, Anarkali, Data Darbar, Circular Road</option>
                                        <option>Liberty Market, MM Alam Road, Ghalib Market, Main Boulevard</option>
                                        <option>Model Town, Garden Town, Faisal Town, Township</option>
                                        <option>DHA Phases 1-8, Lahore Cantt, Walton</option>
                                        <option>Johar Town, Wapda Town, Valencia Town</option>
                                        <option>Allama Iqbal Town, Sabzazar, Samanabad</option>
                                        <option>Bahria Town, NFC Society, Canal Road extensions</option>
                                    </select>
                                    <p className="signup_title2">Exact Address</p>
                                    <input type="text" placeholder="Exact Address"  className="address1" style={{borderColor:this.state.borderColor.address}} onChange={(event)=>this.setState({address:event.target.value})}/>
                                </div>


                                <div className="signup_restaurant">
                                    <p className="signup_title3_restaurant">Restaurant Info</p>
                                    <p className="signup_title2">Image</p>
                                    <input type="file" accept="image/*" placeholder="Image" className="resimg1" style={{borderColor:this.state.borderColor.res_image}} onChange={(event)=>this.setState({res_image:event.target.files[0]})}/>
                                    <p className="signup_title2">Cuisine</p>
                                    <input type="text" placeholder="Cuisine"  className="cuisine1" style={{borderColor:this.state.borderColor.res_cuisine}} onChange={(event)=>this.setState({res_cuisine:event.target.value})}/>
                                    <p className="signup_title2">Description</p>
                                    <input type="text" placeholder="Description"  className="description1" style={{borderColor:this.state.borderColor.res_description}} onChange={(event)=>this.setState({res_description:event.target.value})}/>
                                </div>
    
                            </div>

                            <div className="logo2"></div>
                            
                            <div className="button1" onClick={()=>this.checkInputs()}>Sign Up</div>
                            <p className="account1">Already have an account <p className="signup_signin" onClick={()=> this.changePage("signin")}>SIGN IN</p></p>

                            

                        </div>
                    </div>
                </>
            )
    
        }
        else if(this.state.role==="Rider")
            {
                content1 = (
                    <>
                        <div className="signup_background">
                            <div className="signup_box">
                                <p className="signup_title">Sign Up</p>
        
                                <div className="signup_boxes">
                                    <div className="signup_personal">
                                        <p className="signup_title3_personal">Personal Info</p>
                                        <p className="signup_title2">Name</p> 
                                        <input type="text" placeholder="Name"  className="name1" style={{borderColor:this.state.borderColor.name}} onChange={(event)=>this.setState({name:event.target.value})}/>
                                        <p className="signup_title2">Email</p>
                                        <input type="email" placeholder="Email"  className="email1" style={{borderColor:this.state.borderColor.email}} onChange={(event)=>this.setState({email:event.target.value})}/>
                                        <p className="signup_title2">Phone no.</p>
                                        <input type="number" placeholder="Phone No."  className="phone1" style={{borderColor:this.state.borderColor.phone}} onChange={(event)=>this.setState({phone:event.target.value})}/>
                                        <p className="signup_title2">Role</p>
                                        <select className="role" style={{borderColor:this.state.borderColor.role}} onChange={(event)=>this.setState({role:event.target.value})}>
                                            <option>-</option>
                                            <option>Customer</option>
                                            <option>Restaurant</option>
                                            <option>Rider</option>
                                        </select>
                                    </div>
            
                    
                                    <div className="signup_pwd">
                                        <p className="signup_title3_security">Security Info</p>
                                        <p className="signup_title2">Password</p>
                                        <input type="password" placeholder="Password" className="pwd1" style={{borderColor:this.state.borderColor.pwd}} onChange={(event)=>this.setState({pwd:event.target.value})}/>
                                        <p className="signup_title2">Confirm Password</p>
                                        <input type="password" placeholder="Confirm Password" className="pwd2" style={{borderColor:this.state.borderColor.cpwd}} onChange={(event)=>this.setState({cpwd:event.target.value})}/>
                                        <p className="signup_title2">Favourite Meal</p>
                                        <input type="text" placeholder="Favourite Meal"  className="forget1" style={{borderColor:this.state.borderColor.forget}} onChange={(event)=>this.setState({forget:event.target.value})}/>
                                    </div>
                                    
                                    <div className="signup_address">
                                        <p className="signup_title3_location">Location Info</p>
                                        <p className="signup_title2">Region</p>
                                        <select className="region" style={{borderColor:this.state.borderColor.region}} onChange={(event)=>this.setState({region:event.target.value})}>
                                            <option>-</option>
                                            <option>Shahdara, Badami Bagh, Ravi Town</option>
                                            <option>Inner Lahore, Anarkali, Data Darbar, Circular Road</option>
                                            <option>Liberty Market, MM Alam Road, Ghalib Market, Main Boulevard</option>
                                            <option>Model Town, Garden Town, Faisal Town, Township</option>
                                            <option>DHA Phases 1-8, Lahore Cantt, Walton</option>
                                            <option>Johar Town, Wapda Town, Valencia Town</option>
                                            <option>Allama Iqbal Town, Sabzazar, Samanabad</option>
                                            <option>Bahria Town, NFC Society, Canal Road extensions</option>
                                        </select>
                                        <p className="signup_title2">Exact Address</p>
                                        <input type="text" placeholder="Exact Address"  className="address1" style={{borderColor:this.state.borderColor.address}} onChange={(event)=>this.setState({address:event.target.value})}/>
                                    </div>
            

                                    <div className="signup_rider">
                                        <p className="signup_title3_rider">Rider Info</p>
                                        <p className="signup_title2">Image</p>
                                        <input type="file" accept="image/*" placeholder="Image" className="resimg1" style={{borderColor:this.state.borderColor.res_image}} onChange={(event)=>this.setState({res_image:event.target.files[0]})}/>
                                    </div>

                                </div>
        
                                <div className="logo2"></div>
                                

                                <div className="button1" onClick={()=>this.checkInputs()}>Sign Up</div>
                                <p className="account1">Already have an account <p className="signup_signin" onClick={()=> this.changePage("signin")}>SIGN IN</p></p>

                                
                                
                            </div>
                        </div>
                    </>
                )
        
            }

        
        if (this.state.page==="signup" & this.state.match===true)
        {
            content = (
                <>
                    {content1}
                </>
            )
        }
        else if(this.state.page==="signup" & this.state.match===false)
        {
            alert("Your passwords don't match")
            content = (
                <>
                    {content1}
                    {/* <p style={{color:"red",position:"relative",bottom:"173px",left:"500px"}}>Your passwords don't match</p> */}
                </>
            )
        }
        else if(this.state.page==="signin")
        {
            content = (
                <Signin />
            )
        }
        else if(this.state.page==="customer")
        {
            content = (
                <Customer />
            )
        }
        else if(this.state.page==="rider")
        {
            content = (
                <Rider />
            )
        }
        else if(this.state.page==="restaurant")
        {
            content = (
                <Restaurant />
            )
        }


        return(
            <>
                {content}
            </>
        )
    }
}

export default Signup
