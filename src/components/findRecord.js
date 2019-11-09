import React from 'react'
import { height } from '@material-ui/system';
import PaperSheet from './paper';
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';
import {
    Route,
    NavLink,
    BrowserRouter as Router,
    Switch,
  } from 'react-router-dom';

class Find extends React.Component {
constructor(props){
    super(props);
    
  
}
handleNewUser() { 

}
    render() {
        return (

<div style={{ margin: "auto", width: "80%" }}>
<br></br>
                <span ><NavLink to="/home"> Home </NavLink> > 
              
                Search
                </span>

                <br></br><br></br>
                <PaperSheet>
                    <span style={{ fontSize: "26px" }}> Find Record</span>
                    <p> Don't have an user account? register <NavLink to="/registerUser">here</NavLink> </p>
                    <br></br>

                    <TextField
                        id="txt_passport"
                        label="Passport:"
                        style={{ margin: 8 }}
                        placeholder="Enter passport number"
                        style={{ width: "400px" }}
                        margin="normal"
                        //value={this.state.mothersName}
                        InputLabelProps={{
                            shrink: true,
                        }} 
                        //onChange={this.change.bind(this)}
                    />
<br/><br/>
<Button variant="contained" color="primary" style={{ margin: "1" }} onClick={this.handleNewUser.bind(this)}>
                        Submit
      </Button>
                
          
            </PaperSheet></div>
        );
    };
//display record here =

}

export default Find;