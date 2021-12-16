import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYjfXBwFpFyWi5BLXoKI4qNvZvBmNi2lc",
  authDomain: "facebook-clone-953f7.firebaseapp.com",
  databaseURL: "https://facebook-clone-953f7-default-rtdb.firebaseio.com",
  projectId: "facebook-clone-953f7",
  storageBucket: "facebook-clone-953f7.appspot.com",
  messagingSenderId: "371959171652",
  appId: "1:371959171652:web:72abb8a0422930219e4a11",
  measurementId: "G-9JYXJ991W3"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig); 
 
  const db = firebaseApp.firestore();
  var provider = new firebase.auth.GoogleAuthProvider();
  const auth = firebase.auth();
  const storage = firebase.storage();
  

  export {db,auth,storage,provider};

