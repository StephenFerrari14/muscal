import firebase from 'firebase';
// import app from 'firebase/app';

const config = {
  apiKey: "xxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxx.firebaseapp.com",
  databaseURL: "https://xxxxxxxxxxxxxx.firebaseio.com",
  projectId: "xxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxx.appspot.com",
  messagingSenderId: "xxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxxxxx"
};
// class Firebase {
//   constructor() {
//     app.initializeApp(config);
//   }
// }
firebase.initializeApp(config);
export default firebase;

// class Firebase {
//   constructor() {
//     app.initializeApp(config);
//   }
// }
// export default Firebase;