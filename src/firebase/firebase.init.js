// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuSpn6c31kAbRFXEw6SQXsZXLQUK9EVhM",
  authDomain: "ass-9-5eb14.firebaseapp.com",
  projectId: "ass-9-5eb14",
  storageBucket: "ass-9-5eb14.firebasestorage.app",
  messagingSenderId: "864976706459",
  appId: "1:864976706459:web:9336610190a3f40ed75f3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);