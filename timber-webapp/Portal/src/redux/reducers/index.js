// import reducer from './reducer';
import {combineReducers} from 'redux';
import userReducer from './user-reducer';
import productReducer from './product-reducer';

export default combineReducers({
    user_reducer : userReducer, 
    productReducer : productReducer
});