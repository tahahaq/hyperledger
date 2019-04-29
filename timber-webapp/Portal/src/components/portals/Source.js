import React, { Component } from "react";
import {TextField, Divider, Paper, RaisedButton, SelectField} from 'material-ui';
// import Snackbar from 'material-ui/Snackbar';
import {post_request} from '../../utils/helper'
import {auth} from '../../config/firebaseConfiguration' 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux';
import swal from "sweetalert";
import { api_base_url } from "../../config/apiBaseUrl";

class Source extends Component{
    state = {
        uid : '',
        timber_id : '',
        location_coordinates : '', 
        size : '',
        weight : '',
        color : '',
        industry_standard_certification : '',
        open : false
    }

    componentDidMount(){
        let uid = auth.currentUser.uid;
        this.setState({
            uid : uid
        })
    }

    handleClick = () => {
        this.setState({
          open: true,
        });
      };

    handleRequestClose = () => {
        this.setState({
          open: false, 
        });
      };

    submitHandler = () => {
    console.log(this.state)
    let obj = {
      location_coordinates : this.state.location_coordinates,
   size : this.state.size,
   weight : this.state.weight,
   color : this.state.color,
   member_id : this.state.uid,
   timber_id : this.state.timber_id,
   participant: 'Source',
   industry_standard_certification : this.state.industry_standard_certification,
   company : this.props.user.company,
   company_id : this.props.user.company_id
    }
     swal({
                title: "Request Send",
                text: "Request has been successfully send to the admin for approval.",
                icon: "success",    
                dangerMode: false,
              })
    console.log(obj)
    post_request(api_base_url + '/participant/request', obj)
    .then(res => {
    console.log('====================================');
    console.log(res);
    swal({
      text: "Your request has been send for confirmation!"
    })
  })
    .catch(err => {
                  swal({
                  title: "Error 404",
                  text: err.message,
                  icon: "error",
                  buttons: true,
                  dangerMode: true,
                })
  })  .catch(err => {
                  swal({
                  title: "Error 404",
                  text: err.message,
                  icon: "error",
                  buttons: true,
                  dangerMode: true,
                })
  })
    } //end submit

    changeHandler = name => event => {
        console.log(name, event.target.value)
        this.setState({
            [name] : event.target.value
        })
    }

    handleCertifications = (event, index, value) => {
      console.log(event.target.value, value)
      this.setState({
        value
    })
    }

      handleChange = event => {
    this.setState({industry_standard_certification : event.target.value });
  };


    render(){
        const style = {
            width : 'auto',
          marginTop : '15px',
          paddingLeft : '10px'
        }


        return(
          <div style = {{width : 'fit-content', margin : 'auto'}}>
          <h3 style = {style}>Source Data</h3>
    <Paper zDepth={2} style = {style}>
      <TextField hintText="63" floatingLabelFixed={true} onChange = {this.changeHandler("timber_id")} floatingLabelText="Enter Timber ID here" underlineShow={false}/>
      <TextField hintText="60, 70" floatingLabelFixed={true} onChange = {this.changeHandler("location_coordinates")} floatingLabelText= "Location Coordinates" underlineShow={false} />
      <Divider/>
      {/* <TextField hintText="2004" floatingLabelFixed={true} onChange = {this.modelHandler} floatingLabelText="Model Number" underlineShow={false} />
      <TextField hintText="Honda" floatingLabelFixed={true} onChange = {this.makerHandler} floatingLabelText = "Maker" underlineShow={false} />
      <Divider />
      <TextField hintText="4" floatingLabelFixed={true} onChange = {this.wheelsHandler} floatingLabelText="Number Of Wheels" underlineShow={false} />
      <TextField hintText="4" floatingLabelFixed={true} onChange = {this.doorsHandler} floatingLabelText = "Number Of Doors" underlineShow={false} />
      <Divider /> */}
    </Paper>
    <TextField
        hintText="225"
        floatingLabelText="Size"
        onChange = {this.changeHandler("size")}
    />
                    <TextField
            hintText="3 kg"
            floatingLabelText="Weight"
        onChange = {this.changeHandler("weight")}
            /><br/>
                      <TextField
        hintText="black"
        floatingLabelText="color"
        onChange = {this.changeHandler("color")}
        fullWidth
      /><br/>

        <FormControl 
          style = {{width : '100%'}}
          >
          <InputLabel htmlFor="age-simple">Industry Standard Certification</InputLabel>
          <Select
            value={this.state.industry_standard_certification}
            onChange={this.handleChange}
            inputProps={{
              industry_standard_certification: ''
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"DEFRA"}>DEFRA</MenuItem>
            <MenuItem value={"FISA"}>FISA 604</MenuItem>
          </Select>
        </FormControl><br/><br/>
        {/* <SelectField
          floatingLabelText="Industry standard Certifications"
          value={this.state.industry_standard_certification}
          onChange={this.handleCertifications}
        >
          <MenuItem value="DEFRA" primaryText="DEFRA" />
          <MenuItem value="FISA" primaryText="FISA 604" />
        </SelectField><br/> */}
      
          <RaisedButton label="Submit" primary={true} onClick = {this.submitHandler} />
          {/* {(this.state.transactionHash)? ( <div>
            <h5>Track Your Transction Here</h5>
            <a href = {this.state.transactionHash} target = "_blank"> {this.state.transactionHash} </a>
              </div>) : (null)
          }
          <Snackbar
          open={this.state.open}
          message="Metamask is not loggedin"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}/>
          {(this.state.transac)} */}
          </div>)
      }
}

function mapStateToProp(state) {
  console.log(state.user_reducer)
  return({
    user : state.user_reducer.user
  })
  // return ({
  //   token : state.user_reducer.token
  // })
}

export default connect(mapStateToProp, null)(Source)