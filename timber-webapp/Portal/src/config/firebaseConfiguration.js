import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAAjgTwiYHPl2G4f4e6pDQ9YgqFeCWwQa8",
    authDomain: "gtass-180712.firebaseapp.com",
    databaseURL: "https://gtass-180712.firebaseio.com",
    projectId: "gtass-180712",
    storageBucket: "gtass-180712.appspot.com",
    messagingSenderId: "549994660471"
  };
  firebase.initializeApp(config);

  export const db = firebase.database();
  export const auth = firebase.auth();
