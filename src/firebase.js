// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoK99o_ALWtLs_6wPwRy3wlEPxxtaqlVA",
  authDomain: "mental-health-fd3f3.firebaseapp.com",
  projectId: "mental-health-fd3f3",
  storageBucket: "mental-health-fd3f3.appspot.com",
  messagingSenderId: "944056698915",
  appId: "1:944056698915:web:b9c339d6a893b635f50996",
  measurementId: "G-SGLHM1KDDS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};