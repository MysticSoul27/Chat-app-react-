// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnIwzKBtdJf45rvi74TkhQ0UVSOS4sDTw",
  authDomain: "react-firechat-6cd95.firebaseapp.com",
  projectId: "react-firechat-6cd95",
  storageBucket: "react-firechat-6cd95.firebasestorage.app",
  messagingSenderId: "127978919782",
  appId: "1:127978919782:web:ba03b7d1f2ad4495091aa7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)