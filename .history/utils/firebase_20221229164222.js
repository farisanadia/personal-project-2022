// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase';
import { getFireStore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABmA4k2_mo3w3fT29G96EGLPDyT6TNJso",
  authDomain: "creative-writes-3c18e.firebaseapp.com",
  projectId: "creative-writes-3c18e",
  storageBucket: "creative-writes-3c18e.appspot.com",
  messagingSenderId: "653826406554",
  appId: "1:653826406554:web:f5320c4e8ff3b1c85ac723",
  measurementId: "G-W244DWMP8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFireStore(app);
