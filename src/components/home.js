import React from 'react'
import { height } from '@material-ui/system';
import Icon from '@material-ui/core/Icon';
import {
    Route,
    NavLink,
    BrowserRouter as Router,
    Switch,
  } from 'react-router-dom';

class Home extends React.Component {

    render() {
        return (

            <div style={{ margin: "auto", width: "80%" }}>
                <br></br><br></br>
                <NavLink to="/doctor"><div style={{ width: "140px", height: "140px", float: "left", backgroundColor: "#0F9D58", padding: "30px", marginRight: "40px" }}>
                    <span style={{fontSize: "30px", paddingTop:"30px", color: "#fff"}}>Doctor</span></div></NavLink>
                    <NavLink to="/user"><div style={{ width: "140px", height: "140px", float: "left", backgroundColor: "#4285F4", padding: "30px", marginRight: "10px" }}>
                    <span style={{fontSize:  "30px", paddingTop:"30px", color: "#fff"}}>User</span></div></NavLink>

            </div>
        );
    };


}

export default Home;