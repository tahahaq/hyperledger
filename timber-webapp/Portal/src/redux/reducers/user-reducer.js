import { LOGGEDIN, LOGGED_OUT } from "../actions/root.action";

const INITIAL_STATE = {
    // email : '',
    // uuid : '',
    // company : '',
    // company_id : '',
    user : {},
    is_login : false,
    token : ''
} 

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGGEDIN:
        return({
            ...state,
            user : action.payload,
            // email : action.payload.email,
            // company : action.payload.email,
            // company_id : action.payload.company_id,
            // uuid : action.payload.uuid,
            is_login : true
        })
        case LOGGED_OUT:
        return({ 
            ...state,
            is_login : false
        })
        default: 
        return state
    }
}