import React from 'react'
import PaperSheet from './paper';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            passport: "",
            mothersName: "",
            fathersName: "",
            orgName: "",
            ssn: "",
            dob: "",
            tocken: "", 
            tranID: ""
        };
        this.handleNewUser = this.handleNewUser.bind(this);
    }
    /**
     * {"success":true,"secret":"EkMHsNknuWmp","message":"id-admin enrolled Successfully","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzMzNTY5NzgsInVzZXJuYW1lIjoiaWQtYWRtaW4iLCJvcmdOYW1lIjoiaWQtdXMiLCJpYXQiOjE1NzMzMjA5Nzh9.UPR8TJzOhqxw1RYOBwHTbZ4EPXsIGQp_t-lOjac3XVk"}
     * 
     */
    getTockenAndRegisterUser() {
        if (this.state.tocken === "") {
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
                        this.registerUser(data.token);
                        console.log(response);
                    });
                } else {
                    console.log(response);
                }
            });
        } else {
            this.registerUser(this.setState.token);

        }

    }
    /**
     * 
     * @param {{"peers":["id-us/peer0"],"fcn":"register","args":["name1","father_name","mother_name","entity_access","passport","ssn","bc"]}} tocken 
     */
    registerUser(tocken) {
        const toPost = {};
        const arr = [];
        arr.push(this.state.name);
        arr.push(this.state.fathersName);
        arr.push(this.state.mothersName);
        arr.push(this.state.orgName);
        arr.push(this.state.passport);
        arr.push(this.state.ssn);
        arr.push(this.state.dob);
        toPost.peers = ["id-us/peer0"];
        toPost.fcn = "register";
        toPost.args = arr;

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
            // write a message
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
        this.getTockenAndRegisterUser();
    }

    change(evt) {
        switch (evt.target.id) {
            case "txt_name":
                this.setState({
                    name: evt.target.value
                });
                break
            case "txt_passport":
                this.setState({
                    passport: evt.target.value
                });
                break
            case "txt_mother":
                this.setState({
                    mothersName: evt.target.value
                });
                break
            case "txt_father":
                this.setState({
                    fathersName: evt.target.value
                });
                break
            case "txt_org":
                this.setState({
                    orgName: evt.target.value
                });
                break
            case "txt_ssn":
                this.setState({
                    ssn: evt.target.value
                });
                break
            case "txt_dob":
                this.setState({
                    dob: evt.target.value
                });
                break
        }
        console.log(evt.target.id);
    }
    render() {
        return (
            <div style={{ margin: "auto", width: "80%" }}>
                {this.state.tranID 
                === "" ? 
            <div >
                <br></br>
                <span ><NavLink to="/home"> Home </NavLink> > 
                <NavLink to="/user"> Search </NavLink> >
                User Registration
                </span>
            <br></br>
            <br></br>
            <PaperSheet>
                <span style={{ fontSize: "26px" }}> User Registration</span>

                <br></br>
                <TextField
                    id="txt_name"
                    label="Full Name:"
                    style={{ margin: 8 }}
                    placeholder="Enter Full Name"
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
                    id="txt_passport"
                    label="Passport:"
                    style={{ margin: 8 }}
                    placeholder="Enter Passoprt number (JER23432)"
                    style={{ width: "400px" }}
                    margin="normal"
                    value={this.state.passport}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.change.bind(this)}
                />

                <br></br>
                <TextField
                    id="txt_mother"
                    label="Mother's name:"
                    style={{ margin: 8 }}
                    placeholder="Enter Mother's name"
                    style={{ width: "400px" }}
                    margin="normal"
                    value={this.state.mothersName}
                    InputLabelProps={{
                        shrink: true,
                    }} onChange={this.change.bind(this)}
                />

                <br></br>
                <TextField
                    id="txt_father"
                    label="Father's Name:"
                    style={{ margin: 8 }}
                    placeholder="Enter Father's Name"
                    style={{ width: "400px" }}
                    margin="normal"
                    value={this.state.fathersName}
                    InputLabelProps={{
                        shrink: true,
                    }} onChange={this.change.bind(this)}
                />

                <br></br>
                <TextField
                    id="txt_org"
                    label="Organization:"
                    style={{ margin: 8 }}
                    placeholder="Enter Orgnization name (School, Company... ) "
                    style={{ width: "400px" }}
                    margin="normal"
                    value={this.state.orgName}
                    InputLabelProps={{
                        shrink: true,
                    }} onChange={this.change.bind(this)}
                />
                <br />
                <TextField
                    id="txt_ssn"
                    label="SSN:"
                    style={{ margin: 8 }}
                    placeholder="Enter SSN "
                    style={{ width: "400px" }}
                    margin="normal"
                    value={this.state.ssn}
                    InputLabelProps={{
                        shrink: true,
                    }} onChange={this.change.bind(this)}
                />
                <br />

                <TextField
                    id="txt_dob"
                    label="Birth Identifier:"
                    style={{ margin: 8 }}
                    placeholder="Enter Birth Identifier "
                    style={{ width: "400px" }}
                    margin="normal"
                    value={this.state.dob}
                    InputLabelProps={{
                        shrink: true,
                    }} onChange={this.change.bind(this)}
                />
                <br /><br />
                <Button variant="contained" color="primary" style={{ margin: "1" }} onClick={this.handleNewUser}>
                    Submit
  </Button>

            </PaperSheet>
        </div>
            :
            <div>
                <br></br><br></br>
            <PaperSheet>
                <b>You have register Successfully! (take me back to <NavLink to="/home">home</NavLink>)</b>
                <br/>
                Your transaction-ID: {this.state.tranID}
                </PaperSheet>
            </div>
            }
            
            </div>
        );
    }
}
export default User