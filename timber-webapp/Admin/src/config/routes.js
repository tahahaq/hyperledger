import React from 'react';
import {
  Router,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import addParticipant from '../components/Accounts/addParticipant';
import LoginComponent from '../components/login/loginComponent';
import Requests from '../components/Requests';

const BasicRouting = (props) => {
  return (
    <Router history={history}>
    <div>
      {((props.isLogin)) ? (
          <div>
            <Route exact path="/add-participants" component={addParticipant} />
            <Route exact path="/requests" component={Requests} />
            <Redirect exact path = "/" to = "/add-participants"/>
            {/* <Route exact path="/department" component={Department} />
            <Route exact path="/mechanic" component={Mechanic} />
            <Route exact path="/users" component={Users} /> */}
          </div>          
      ) : (
        <Route exact path="/" component={LoginComponent} />
      )}
    </div>
    </Router>
  )
}


function mapStateToProp(state) {
  return ({
    isLogin : state.root.isLogin
  })
}

export default connect(mapStateToProp, null)(BasicRouting);