import history from '../../history/index';

export function signedIn(){
    console.log("works")
    return dispatch => {
        dispatch({ type: "IS_LOGIN", payload: true })
        history.push('/add-participants')
    }
}

// export function logout(){
//     return dispatch => {
//         dispatch({ type: "IS_LOGIN", payload: false })
//         // history.push('/')
//     }
// }

  export function USER_LOGGEDOUT(){
    console.log("hello world")
    return { type: "LOGGED_OUT" }
  }

export function updateUserData(obj){
    return dispatch => {
        dispatch({ type: "USER_DATA", payload: obj })
        history.push('/add-participants')
    }
}
