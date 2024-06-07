// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZGk36eEQOfiNE3FDpAUJUjj-2G1C43tk",
  authDomain: "technical-task-dc4ce.firebaseapp.com",
  projectId: "technical-task-dc4ce",
  storageBucket: "technical-task-dc4ce.appspot.com",
  messagingSenderId: "965056776883",
  appId: "1:965056776883:web:20fcbd47d2e0e8f9167ec6",
  measurementId: "G-P5JKHGSHPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);