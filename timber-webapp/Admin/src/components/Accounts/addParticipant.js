import React, { Component } from "react";
import {RaisedButton, Snackbar, TextField} from 'material-ui'
import { Container, Row, Col } from 'react-grid-system';
import SidebarComponent from "../sidebar";
import {auth, db} from '../../config/firebaseConfiguration';
import swal from 'sweetalert';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
 
export default class Showroom extends Component{
    state = { 
        email : '',
        password : '',
        first_name : '',
        last_name : '',
        contract : '',
        company : '',
        company_id : '',
        open : false,
        participant : ''
    }

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };

    createAccount = async () => {
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
            swal({
                title: "Confirmation",
                text: "Account created successfully",
                icon: "success",    
                dangerMode: false,
              })
              .then((res) => {
                  this.setState({
                      email : ""
                  })
              })
            let uid = auth.currentUser.uid;
            let obj = this.state;
            obj.uid = uid;
            delete obj.password;
            db.ref('/users/'+uid).set(obj)
            .then((res) => {
            })
            .catch(err => alert(err.message))
        })
        .catch(err => {
            swal({
                title: "Something went wrong",
                text: err.message,
                icon: "error",    
                dangerMode: true,
              })
        })
    }

    handleSelectChange = (ev) => {
        console.log(ev.target.value)
        this.setState({
            participant : ev.target.value
        })
    }

    render(){
        return(
                <Container style = {{margin : 0, padding : 0}}>
  <Row style={{margin: 0, padding: 0, height : "96vh"}}>
    <Col sm={4}>
    <SidebarComponent/>
    </Col>
    <Col sm={8}>
    <h1>Add Participant</h1>
    <TextField
              hintText="Email"
              value = {this.state.email}
              floatingLabelText="abc@gmail.com"
              floatingLabelFixed={true}
              onChange = {this.handleChange('email')}
            /><br />
            <TextField
              hintText="******"
              floatingLabelText="Password"
              floatingLabelFixed={true} 
              type="password"
              onChange = {this.handleChange('password')}
            /><br />
            <TextField
              hintText="John"
              floatingLabelText="First Name"
              floatingLabelFixed={true}
              onChange = {this.handleChange('first_name')}
            /><br />
            <TextField
              hintText="Doe"
              floatingLabelText="Last Name"
              floatingLabelFixed={true}
              onChange = {this.handleChange('last_name')}
            /><br />
            <TextField
              hintText="EFU life"
              floatingLabelText="Company"
              floatingLabelFixed={true}
              onChange = {this.handleChange('company')}
            /><br />
                        <TextField
              hintText="655"
              floatingLabelText="Company ID"
              floatingLabelFixed={true}
              onChange = {this.handleChange('company_id')}
            /><br />
                        <TextField
              hintText="2343"
              floatingLabelText="Contract Number"
              floatingLabelFixed={true}
              onChange = {this.handleChange('contract')}
            /><br/>
            {/* dropdown */}
        <FormControl style = {{width : '35%'}}>
          <Select
            value={this.state.participant}
            onChange={this.handleSelectChange}
            displayEmpty
            // className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>
              Select Participant
            </MenuItem>
            <MenuItem value="Source">Source</MenuItem>
            <MenuItem value="Shipper">Shipper</MenuItem>
            <MenuItem value="Designer">Designer</MenuItem>
            <MenuItem value="Packager">Packager</MenuItem>
          </Select>
          <FormHelperText>Select Participant Type</FormHelperText>
        </FormControl><br/><br/>
                <RaisedButton label="submit" style = {{width : "35%"}} primary={true} onClick = {this.createAccount}/>
    </Col>
  </Row>
</Container>
        )
    }
}