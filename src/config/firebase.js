import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJyf0S3LmIcnqTRwb6M88Ie9N4-Dwy9ew",
  authDomain: "clone-e1c1d.firebaseapp.com",
  projectId: "clone-e1c1d",
  storageBucket: "clone-e1c1d.appspot.com",
  messagingSenderId: "247024529929",
  appId: "1:247024529929:web:9cb3b1354c45243add7ed8",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
