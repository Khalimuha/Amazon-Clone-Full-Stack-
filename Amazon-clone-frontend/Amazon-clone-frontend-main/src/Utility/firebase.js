import firebase from "firebase/compat/app";
// auth
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHHznUvyBRB0hhXw9XhgWHdfTz5lERGG0",
  authDomain: "clone-23c81.firebaseapp.com",
  projectId: "clone-23c81",
  storageBucket: "clone-23c81.firebasestorage.app",
  messagingSenderId: "1017983228627",
  appId: "1:1017983228627:web:41e3f6d4d35f76577d9226"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
