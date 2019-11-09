import React from 'react'
import PaperSheet from './paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
    Route,
    NavLink,
    BrowserRouter as Router,
    Switch,
  } from 'react-router-dom';

class Doctor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            lnum: "",
            orgName: "", 
            tocken: "",
            tranID: ""
        }
    }

    registeDoc(tocken) {
        const toPost = {};
        const arr = [];
        arr.push(this.state.name);
        arr.push(this.state.lnum);
        arr.push(this.state.orgName);
       
        toPost.peers = ["mc-us/peer0"];
        toPost.fcn = "register";
        toPost.args = arr;

        console.log(toPost);
        const headerWithtocken = {
            "Authorization": "Bearer " + tocken,
            "Content-Type" : "application/json"
        }
        console.log(headerWithtocken);
        if(tocken!== "")
        fetch('http://168.62.196.11:4004/channels/medi-council-us/chaincodes/vacci-admin', {
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

    getTockenAndRegisterUser() {
        if (this.state.tocken === "") {
            console.log("here");
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
                        console.log(data);
                        this.registeDoc(data.token);
                    });
                }else {
                    console.log(response);
                }
            });
        } else {
            this.registeDoc(this.setState.token);
        }

    }

    handleNewUser() {
        console.log(this.state);
        //this.registeDoc("");
        this.getTockenAndRegisterUser();
    }
    change(evt) {
        switch (evt.target.id) {
            case "txt_name":
                this.setState({
                    name: evt.target.value
                });
                break
            case "txt_lnum":
                this.setState({
                    lnum: evt.target.value
                });
                break
            case "txt_org":
                this.setState({
                    orgName: evt.target.value
                });
                break
        }
    }
    render() {
        return (
            <div style={{ margin: "auto", width: "80%" }}>
                <br/>
                 <span ><NavLink to="/home"> Home </NavLink> > 
                 <NavLink to="/doctor"> Menu </NavLink> > 
                Doctor Registration
                </span>
           {this.state.tranID === "" ? 
            <div >
                
                <br></br><br></br>
                <PaperSheet>
                    <span style={{ fontSize: "26px" }}> Doctor Registration</span>
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
                        id="txt_lnum"
                        label="License Number:"
                        style={{ margin: 8 }}
                        placeholder="Enter License Number"
                        style={{ width: "400px" }}
                        margin="normal"
                        value={this.state.lnum}
                        onChange={this.change.bind(this)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <br></br>
                    <TextField
                        id="txt_org"
                        label="Organization:"
                        style={{ margin: 8 }}
                        placeholder="Enter Orgnization name (Company, State agency... ) "
                        style={{ width: "400px" }}
                        margin="normal"
                        value={this.state.orgName}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.change.bind(this)}
                    />
                    <br></br><br></br>
                    <Button variant="contained" color="primary" style={{ margin: "1" }} onClick={this.handleNewUser.bind(this)}>
                        Submit
      </Button>
                </PaperSheet>
            </div> : 
        <div> 
             <br></br><br></br>
            <PaperSheet>
                <b>You have register Successfully! (take me back to <NavLink to="/home">home</NavLink>)</b>
                <br/>
                Your transaction-ID: {this.state.tranID}
                </PaperSheet>
        </div>}
            </div>
        );
    }
}
export default Doctor


//NAME,    LICENE, ORG

// VAC - > YOUR LINCE AND THE NAME AND PATIANTES NAMES OF THE VAC AND DATE ?

/**
 * ID 
 * patint name and bc 
 * van and the date
 */