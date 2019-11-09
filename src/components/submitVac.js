import React from 'react'
import PaperSheet from './paper';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { keys } from '@material-ui/core/styles/createBreakpoints';
import {
    Route,
    NavLink,
    BrowserRouter as Router,
    Switch,
  } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

class SubmitVac extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            lic: "",
            pName: "",
            bc: "",
            vacText: "", 
            tranID: ""
        };
        this.handleNewUser = this.handleNewUser.bind(this);
    }
    /**
     * {"success":true,"secret":"EkMHsNknuWmp","message":"id-admin enrolled Successfully","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzMzNTY5NzgsInVzZXJuYW1lIjoiaWQtYWRtaW4iLCJvcmdOYW1lIjoiaWQtdXMiLCJpYXQiOjE1NzMzMjA5Nzh9.UPR8TJzOhqxw1RYOBwHTbZ4EPXsIGQp_t-lOjac3XVk"}
     * 
     */
    getTockenAndRegisterUser() {


        if (this.state.tocken !== "") {

            const body_my = {};
            body_my.username = "id-admin";
            const hed = {
                "Content-Type" : "application/json"
            }

            fetch('http://168.62.196.11:4000/users', {
                method: "POST",
                headers: hed,
                body: JSON.stringify(body_my)
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        this.setState({
                            tocken: data.token
                        })
                        this.submit(data.token);
                    });
                } else {
                    console.log(response);
                }
            });
        } else {
            this.submit(this.setState.token);
        }

    }
    /**
     * 
     * @param {{"peers":["id-us/peer0"],"fcn":"register","args":["name1","father_name","mother_name","entity_access","passport","ssn","bc"]}} tocken 
     */
    submit(tocken) {
        const toPost = {};
        const arr = [];
        arr.push(this.state.name);
        arr.push(this.state.lic);
        arr.push(this.state.pName);
        arr.push(this.state.bc);
        arr.push(this.state.vacText);
       const d = new Date();
        arr.push(d.getTime() +""); // date
        
        toPost.peers = ["id-us/peer0"];
        toPost.fcn = "register";
        toPost.args = arr;
//["name1","licnumber","name1","bc","polio","12-09-2019"]
        console.log(toPost);
        const headerWithtocken = {
            "Authorization": "Bearer " + tocken,
            "Content-Type" : "application/json"
        }
        if(tocken!== "")
        fetch('http://168.62.196.11:4000/channels/vaccination-us/chaincodes/identity-register', {
            method: "POST",
            headers: headerWithtocken,
            body: JSON.stringify(toPost)
        }
        ).then((res) => {
            console.log(res);
            if (res.status === 200) {
                res.json().then((data) => {
                    this.setState({
                        tranID: data.transaction
                    });
                });
            }
        });
    }


    handleNewUser() {
        console.log(this.state);
        this.registerUser("");
    }

    change(evt) {
        switch (evt.target.id) {
            case "txt_name":
                this.setState({
                    name: evt.target.value
                });
                break
            case "txt_lic":
                this.setState({
                    lic: evt.target.value
                });
                break
            case "txt_patient":
                this.setState({
                    pName: evt.target.value
                });
                break
            case "txt_bc":
                this.setState({
                    bc: evt.target.value
                });
                break
            case "txt_vac":
                this.setState({
                    vacText: evt.target.value
                });
                break;
        }
        console.log(evt.target.id);
    }
    render() {
        return (

<div style={{ margin: "auto", width: "80%" }}> 
<br/>
                 <span ><NavLink to="/home"> Home </NavLink> > 
                 <NavLink to="/doctor"> Menu </NavLink> > 
                Submit Vaccination record
                </span>
{this.state.tranID === "" ?

            <div >

                
                <br></br><br></br>
                <PaperSheet>
                    <span style={{ fontSize: "26px" }}> Submit Vaccination Record</span>

                    <br></br>
                    <TextField
                        id="txt_name"
                        label="Dr's Full Name:"
                        style={{ margin: 8 }}
                        placeholder="Enter your Full Name"
                        style={{ width: "400px" }}
                        margin="normal"
                        value={this.state.name}
                        onChange={this.change.bind(this)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br></br>
                    <TextField
                        id="txt_lic"
                        label="License:"
                        style={{ margin: 8 }}
                        placeholder="Enter License number (123132132134)"
                        style={{ width: "400px" }}
                        margin="normal"
                        value={this.state.lic}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.change.bind(this)}
                    />

                    <br></br>
                    <TextField
                        id="txt_patient"
                        label="Patient's name:"
                        style={{ margin: 8 }}
                        placeholder="Enter Patient's name"
                        style={{ width: "400px" }}
                        margin="normal"
                        value={this.state.pName}
                        InputLabelProps={{
                            shrink: true,
                        }} onChange={this.change.bind(this)}
                    />

                    <br></br>
                    <TextField
                        id="txt_bc"
                        label="Birth Identifier:"
                        style={{ margin: 8 }}
                        placeholder="Enter Birth Identifier of patient"
                        style={{ width: "400px" }}
                        margin="normal"
                        value={this.state.bc}
                        InputLabelProps={{
                            shrink: true,
                        }} onChange={this.change.bind(this)}
                    />

                    <br></br>
                    <TextField
                        id="txt_vac"
                        label="Vaccination Type:"
                        style={{ margin: 8 }}
                        placeholder="Enter Vaccination type "
                        style={{ width: "400px" }}
                        margin="normal"
                        value={this.state.vacText}
                        InputLabelProps={{
                            shrink: true,
                        }} onChange={this.change.bind(this)}
                    />
                  
                    <br /><br />
                    <Button variant="contained" color="primary" style={{ margin: "1" }} onClick={this.handleNewUser}>
                        Submit
      </Button>

                </PaperSheet>
            </div> : <div>
            <br></br><br></br>
            <PaperSheet>
                <b>You have Successfully submited vaccination record! (take me back to <NavLink to="/home">home</NavLink>)</b>
                <br/>
                 Transaction-ID: {this.state.tranID}
                </PaperSheet>
            </div>
}
</div>
        );
    }
}
export default SubmitVac