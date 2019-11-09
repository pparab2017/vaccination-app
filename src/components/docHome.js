import React from 'react'
import { height } from '@material-ui/system';
import {
    Route,
    NavLink,
    BrowserRouter as Router,
    Switch,
  } from 'react-router-dom';

class DocHome extends React.Component {

    render() {
        return (

            <div style={{ margin: "auto", width: "80%" }}>
                <br/>
                 <span ><NavLink to="/home"> Home </NavLink> > 
                
               Menu
                </span>
                <br></br><br></br>
                <NavLink to="/user"><div style={{ width: "170px", height: "70px", float: "left", backgroundColor: "#ff5252", padding: "10px", marginRight: "20px", color: "#fff" }}>
                    <b>Find Record</b></div></NavLink>
                    <NavLink to="/submit"><div style={{ width: "170px", height: "70px", float: "left", backgroundColor: "#00796b", padding: "10px", marginRight: "20px" ,color: "#fff"}}>
                   <b> Submit Record</b></div></NavLink>
                    <NavLink to="/doctorReg"><div style={{ width: "170px", height: "70px", float: "left", backgroundColor: "#63b4f4", padding: "10px", marginRight: "20px" ,color: "#fff"}}>
                    <b>Register</b></div></NavLink>

            </div>
        );
    };


}

export default DocHome;