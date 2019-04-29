import React, { Component } from "react";
import {db,auth} from '../config/firebaseConfiguration'
import AppBarExampleIcon from './appBar';
// To Avoid Complexity Each participant has its own component
import {connect} from 'react-redux';

import Source from './portals/Source';
import Packager from './portals/Packager'
import Designer from './portals/Designer'
import Shipper from './portals/Shipper'

class Home extends Component {
  state = {
    participant : '',
    uid : '',
    obj : {}
  }

    componentDidMount(){
       // console.log(userid)
        let uid = this.props.uid
        db.ref('/users/' + uid).once('value',(snapshot) => {
            // let userid =  auth.currentUser.uid;
            //save the uid in local storage
            // localStorage.setItem("uid", userid);
            console.log(snapshot.val(), snapshot.val().type);
            var objUser = snapshot.val();
            objUser.uid = uid;
            console.log(objUser)
            this.setState({
              participant : snapshot.val().participant,
              obj : objUser,
                uid : uid
            })
        })
    }    
  

    typeRender = () =>{
      // Check the participant and render component accordingly
      if(this.state.participant === 'Source'){
      return <Source obj = {this.state.obj} uid = {this.state.uid}/>
      }
      else if(this.state.participant === 'Shipper'){
        return <Shipper obj = {this.state.obj}  uid = {this.state.uid}/>
      }else if(this.state.participant === 'Designer'){
        return <Designer obj = {this.state.obj}  uid = {this.state.uid}/>
      }else if(this.state.participant === 'Packager'){
        return <Packager obj = {this.state.obj}  uid = {this.state.uid}/>
      }
    }

    render(){
      const style = {
        width: 270,
        textAlign: 'center'
      };
        return(
          <div>
            <AppBarExampleIcon obj = {this.state.obj}/>
            {this.typeRender()}
        </div>
        )
    }
}


function mapStateToProp(state) {
  console.log(state.user_reducer.user.uid)
  return ({
    uid : state.user_reducer.user.uid
  })
}

export default connect(mapStateToProp, null)(Home)
