import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { db } from '../../config/firebaseConfiguration';


export default class Confirmation extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleDelete = () => {
    db.ref('/users/'+ this.props._id).remove().then(res => {
      console.log(res);
    })
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
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleDelete}
      />,
    ];

    return (
      <div>
        {/* <RaisedButton label="Dialog" onClick={this.handleOpen} /> */}
        <span style = {{color : 'red', textDecoration : "underline", cursor : 'pointer'}} onClick = {this.handleOpen}>Delete</span>

        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        The user will be permanently deleted, Are you sure ?
        </Dialog>
      </div>
    );
  }
}