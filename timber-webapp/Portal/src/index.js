import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BasicRouting from './config/routes';
import {Provider} from 'react-redux';
import store from './redux/store'; 

const App = () => (
    <MuiThemeProvider>
      <BasicRouting />
    </MuiThemeProvider>
  );

ReactDOM.render( <Provider store={store}> <MuiThemeProvider> <App /> </MuiThemeProvider> </Provider>, document.getElementById('root'));