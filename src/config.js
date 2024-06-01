// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSeDUHWK7_JZOsIWxIsJ0RCaUOuTfJ1MY",
  authDomain: "graphical-password-627bd.firebaseapp.com",
  projectId: "graphical-password-627bd",
  storageBucket: "graphical-password-627bd.appspot.com",
  messagingSenderId: "719419167475",
  appId: "1:719419167475:web:5cd736a8a823da571f9d86",
  measurementId: "G-G9YH4WKJ4J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
