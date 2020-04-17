import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDwVtyoWHVHOTJUOsRhNGCyw580ssgdOYU",
  authDomain: "starwars-form.firebaseapp.com",
  databaseURL: "https://starwars-form.firebaseio.com",
  projectId: "starwars-form",
  storageBucket: "starwars-form.appspot.com",
  messagingSenderId: "52181277620",
  appId: "1:52181277620:web:a9cf51c61652f02c0db0e1"
};

firebase.initializeApp(config);

export default firebase;