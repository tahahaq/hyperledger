  import React, { Component } from "react";
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {signedIn, updateUserData, USER_LOGGEDOUT} from '../../store/actions/action';
import {auth, db} from '../../config/firebaseConfiguration';
import {post_request} from '../../utils/helper'
import { api_base_url } from "../../config/api";

class LoginComponent extends Component {
  state = {
    email : '',
    password : '',
    loading : false,
    errorTextPass : '',
    errorTextEmail : ''
  }

  logoutHandler = () => {
    let that = this;
    auth.signOut()
  .then(function() {
    that.props.logout()
    console.log("successful")
    // Sign-out successful.
  })
  .catch(function(error) {
    // An error happened
    alert(error)
  });
  }

  emailHandler(ev){
    this.setState({
      email : ev.target.value
    })
  }

  passwordHandler(ev){
    this.setState({
      password : ev.target.value
    })
  }


  loginHandler(){ 
    console.log(this.state.email, this.state.password);
    auth.signInWithEmailAndPassword(this.state.email, this.state.password).then((res) => {
      let user_uid = res.user.uid;
      console.log("works")
          this.props.signedIn();
      post_request(api_base_url+'/admin/is-admin', {uid : user_uid})
      .then(res => {
        console.log('====================================');
        console.log("admin is admin works");
        console.log('====================================');
          this.props.updateUserData({email : this.state.email, uuid : user_uid})
      }).catch(err => {
          this.logoutHandler();
          this.setState({
            errorTextPass : "this user doesn't have admin rights."
          })
      })
    //   db.ref('/admin').once("value", snapshot => {
    //   if(user_uid == snapshot.val().uid){
    // } else {
    //   }
    //   })
    })
    .catch((err) => { 
      console.log(err);
      if(err.message.includes('email')){
        this.setState({
          errorTextEmail : err.message
        })
      }
      else {
        this.setState({
          errorTextPass : err.message
        })
      }
    })
  } 
  
  emailClickHandler = () => {
    this.setState({
      errorTextEmail : ''
    })
  }

  passwordClickHandler = () => {
    this.setState({
      errorTextPass : ''
    })
  }

  render(){
    return(
<div>
    <div style = {{width:'320px', margin : 'auto'}}>
    <div> <h3>ADMIN LOGIN PANEL</h3> </div>
    <TextField
      hintText="admin@abc.com"
      errorText={this.state.errorTextEmail}
      floatingLabelText="Enter Email Here"
      onChange = {this.emailHandler.bind(this)}
      onClick = {this.emailClickHandler}
    />
    <TextField
      hintText="Password"
      errorText = {this.state.errorTextPass}
      floatingLabelText="Enter Password Here"
      type="password"
      onChange = {this.passwordHandler.bind(this)}
      onClick = {this.passwordClickHandler}
    />
    <RaisedButton label="Login" primary={true} onClick = {this.loginHandler.bind(this)} />
    <div>     
       </div>
    {(this.state.loading) ? (<div>Loading ... </div>) : (null)}
    </div>
  </div>
    )
  }
}

function mapDispatchToProp(dispatch) {
  return ({
      signedIn: () => {
          dispatch(signedIn())
      },
      updateUserData : (obj) => {
        dispatch(updateUserData(obj))
      },
      logout: () => {
        dispatch(USER_LOGGEDOUT())
    }
  })
} 

export default connect(null, mapDispatchToProp)(LoginComponent)
