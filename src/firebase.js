
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAp0gT1YD_2uawKhig8hWkRb5r_UIfWPJc",
  authDomain: "react-contact-form-73803.firebaseapp.com",
  projectId: "react-contact-form-73803",
  storageBucket: "react-contact-form-73803.appspot.com",
  messagingSenderId: "242021213473",
  appId: "1:242021213473:web:10331cf45fe2085e9b4a60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
