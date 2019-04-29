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
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import { api_base_url } from "../../config/apiBaseUrl";

class Designer extends Component{
    state = {
        uid : '',
        timber_id : '',
        batch_id: "",
        style_id: "",
        num_of_length: "",
        size_piece_meter: "",
        len_of_each: "",
        industry_standard_certification : '',
        est_production_time: new Date(),
        batch_id : ''
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

            handleDateChange = date => {
          console.log(date)
        //   let currentDate = new Date(date)
        //   console.log(currentDate.getMilliseconds())
        this.setState({ est_production_time: date });
      };

    submitHandler = () => {
    console.log(this.state)
    let obj = {
   member_id : this.state.uid,
   timber_id : this.state.timber_id,
   participant: 'Designer',
   industry_standard_certification : this.state.industry_standard_certification,
   company : this.props.user.company,
   company_id : this.props.user.company_id,
   est_production_time : this.state.est_production_time,
   style_id : this.state.style_id,
    len_of_each : this.state.len_of_each,
    size_piece_meter : this.state.size_piece_meter,
    num_of_length : this.state.num_of_length,
    batch_id : this.state.batch_id
    }


 
    console.log(obj)
    post_request(api_base_url + '/participant/request', obj)
    .then(res => {
    console.log('====================================');
    console.log(res);
    swal({
      title: "Request Send",
      text: "Request has been successfully send to the admin for approval.",
      icon: "success",      
      dangerMode: false,
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
        let est_production_time = this.state.est_production_time;
        const style = {
            width : 'auto',
          marginTop : '15px',
          paddingLeft : '10px'
        }


        return(
          <div style = {{width : 'fit-content', margin : 'auto'}}>
          <h3 style = {style}>Designer Data</h3>
    <Paper zDepth={2} style = {style}>
      <TextField hintText="63" floatingLabelFixed={true} onChange = {this.changeHandler("timber_id")} floatingLabelText="Enter Timber ID here" underlineShow={true}/>
      <TextField hintText="23" floatingLabelFixed={true} onChange = {this.changeHandler("batch_id")} floatingLabelText= "Enter Batch ID" underlineShow={true} />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <DatePicker
            margin="normal"
            label="Estimated Production Date"
            value={est_production_time}
            onChange={this.handleDateChange}
          />
          <TimePicker
            margin="normal"
            label="Estimated Production Time"
            value={est_production_time}
            onChange={this.handleDateChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </Paper>
    <TextField
        hintText="225"
        floatingLabelText="Style ID"
        onChange = {this.changeHandler("style_id")}
    />
        <TextField
        hintText="25"
        floatingLabelText="Batch ID"
        onChange = {this.changeHandler("batch_id")}
    />
                    <TextField
            hintText="3"
            floatingLabelText="Number Of Length"
        onChange = {this.changeHandler("num_of_length")}
            /><br/>
                      <TextField
        hintText="24"
        floatingLabelText="Size of piece in meter"
        onChange = {this.changeHandler("size_piece_meter")}
      />
        <TextField
        hintText="27"
        floatingLabelText="Length of each piece"
        onChange = {this.changeHandler("len_of_each")}
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
            <MenuItem value={"ISPM15"}> International Standards For Phytosanitary Measures No. 15 </MenuItem>
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

export default connect(mapStateToProp, null)(Designer)