import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { auth } from '../config/firebaseConfiguration';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class PasswordResetConfirmation extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handlerReset = () => {
    auth.sendPasswordResetEmail(this.props.email).then(function() {
      // Email sent.
      alert("Password reset email has been sent")
    }).catch(function(error) {
      // An error happened.
    });
    console.log('====================================');
    console.log("clicked");
    console.log('====================================');
    this.handleClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Send"
        primary={true}
        keyboardFocused={true}
        onClick={this.handlerReset}
      />,
    ];

    return (
      <div>
        {/* <RaisedButton label="Dialog" onClick={this.handleOpen} /> */}
    <div style = {{textDecoration : "underline", color : "blue", cursor : 'pointer'}} onClick = {this.handleOpen}>Reset Password</div>

        <Dialog
          title="Password Reset Link"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        The reset password link will be sent to <span style = {{textDecoration : "underline", color : 'blue'}}>{this.props.email}</span>. Make sure the email you entered is correct.
        </Dialog>
      </div>
    );
  }
}
