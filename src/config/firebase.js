import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKxoZctkXSH0ieNZemwJXWdywicabQ9EQ",
  authDomain: "yt-clone-6b8b0.firebaseapp.com",
  projectId: "yt-clone-6b8b0",
  storageBucket: "yt-clone-6b8b0.appspot.com",
  messagingSenderId: "496913701820",
  appId: "1:496913701820:web:2dcc123507bfa003e3a9b9",
};

firebase.initializeApp(firebaseConfig);

export default firebase.auth();
