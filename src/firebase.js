import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB9KcGjQ233JQAVlrnXqOvoAY3r9hLAJE",
  authDomain: "facebook-clone-rf.firebaseapp.com",
  projectId: "facebook-clone-rf",
  storageBucket: "facebook-clone-rf.appspot.com",
  messagingSenderId: "340207531438",
  appId: "1:340207531438:web:d399fdde0f8e25fc8fc43f",
  measurementId: "G-R39GPYM5L0"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig); 
 
  const db = firebaseApp.firestore();
  var provider = new firebase.auth.GoogleAuthProvider();
  const auth = firebase.auth();
  const storage = firebase.storage();
  

  export {db,auth,storage,provider};

