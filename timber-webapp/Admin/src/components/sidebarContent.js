import React from 'react';
import {List, ListItem} from 'material-ui/List';
import history from '../history';
import { auth } from '../config/firebaseConfiguration';
import { USER_LOGGEDOUT, signedIn } from '../store/actions/action';
import { connect } from 'react-redux';

class SidebarContent extends React.Component {
  constructor(props) {
    super(props);
  }

  changeRoute(route){
    history.push(route)
  }

  logoutHandler = () => {
    let that = this;
    auth.signOut()
  .then(function() {
    that.props.logout()
    console.log("successful")
    history.push('/')
    // Sign-out successful.
  })
  .catch(function(error) {
    // An error happened
  });
  }
 
  render() {
      const style = {
          color : '#E0E0E0'
      }
    return (
        <List hoverColor = "lightGray">
        <ListItem primaryText="Add Participants" hoverColor = "#EEEEEE"  style = {style} onClick = {this.changeRoute.bind(this, '/add-participants')}/>
        <ListItem primaryText="Requests" overColor = "#EEEEEE" style = {style} onClick = {this.changeRoute.bind(this, '/requests')} />
        {/* <ListItem primaryText="Vehicle Department" overColor = "#EEEEEE" style = {style}  onClick = {this.changeRoute.bind(this, '/department')} />
        <ListItem primaryText="Mechanics" hoverColor = "#EEEEEE"  style = {style}  onClick = {this.changeRoute.bind(this, '/mechanic')}/>
        <ListItem primaryText="All Users" hoverColor = "#EEEEEE"  style = {style}  onClick = {this.changeRoute.bind(this, '/users')}/>         */}
        <ListItem primaryText="Logout" hoverColor = "#EEEEEE"  style = {style}  onClick = {this.logoutHandler}/>
      </List>
    );
  }
}
 
function mapDispatchToProp(dispatch) {
  return ({
      logout: () => { 
          dispatch(USER_LOGGEDOUT())
      },
            signedIn: () => {
          dispatch(signedIn())
      }
  })
}

function mapStateToProp(state) {
  console.log(state.root.isLogin);
  return ({
    isLogin : state.root.isLogin
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(SidebarContent);