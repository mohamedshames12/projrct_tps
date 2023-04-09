// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6nAOddUVCl9np3t7fDKdT9rOob7EJF3s",
  authDomain: "fir-77679.firebaseapp.com",
  projectId: "fir-77679",
  storageBucket: "fir-77679.appspot.com",
  messagingSenderId: "949403294049",
  appId: "1:949403294049:web:bb133a96e1034536e5cd20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

