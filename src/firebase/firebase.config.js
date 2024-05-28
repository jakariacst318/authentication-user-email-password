// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA7wbVLTKwLhL5dYW9HcfFP4_r4H7uwx0",
  authDomain: "user-password-firebase-project.firebaseapp.com",
  projectId: "user-password-firebase-project",
  storageBucket: "user-password-firebase-project.appspot.com",
  messagingSenderId: "284666367293",
  appId: "1:284666367293:web:9070b6e618db288b038954"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;