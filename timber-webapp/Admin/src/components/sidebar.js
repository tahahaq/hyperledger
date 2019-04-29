import React from 'react';
import Sidebar from "react-sidebar";
import SidebarContent from "./sidebarContent"
import { Z_FIXED } from 'zlib';
import { logout } from '../store/actions/action';

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
  
  render() {
    return (
      <Sidebar
        docked = {true}
        sidebar={<SidebarContent/>} 
        open={this.state.sidebarOpen} 
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "black", color : 'white'} }}
      >
      </Sidebar>
    );
  }
}
 
export default (SidebarComponent);