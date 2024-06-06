import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAwgx7vGn7RuXjyVfeMGsvRrJ_VUqTWGcE",
  authDomain: "dataupload-88fc9.firebaseapp.com",
  projectId: "dataupload-88fc9",
  storageBucket: "dataupload-88fc9.appspot.com",
  messagingSenderId: "498164452473",
  appId: "1:498164452473:web:b8f710da8b6818fd3858a8",
  measurementId: "G-17YBGGMQ16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)