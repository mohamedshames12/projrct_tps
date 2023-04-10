// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmQbqKi6f8TMOoOt4TxAUlGCL8T1Qapkg",
  authDomain: "boomrenge-ee155.firebaseapp.com",
  projectId: "boomrenge-ee155",
  storageBucket: "boomrenge-ee155.appspot.com",
  messagingSenderId: "1068605111265",
  appId: "1:1068605111265:web:f2f628387232e747aab0a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

