import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAmQbqKi6f8TMOoOt4TxAUlGCL8T1Qapkg",
  authDomain: "boomrenge-ee155.firebaseapp.com",
  projectId: "boomrenge-ee155",
  storageBucket: "boomrenge-ee155.appspot.com",
  messagingSenderId: "1068605111265",
  appId: "1:1068605111265:web:f2f628387232e747aab0a0"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
