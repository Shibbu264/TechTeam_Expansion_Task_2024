import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage"; // Import Firebase Storage



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0Y59uDWsnmImgr48cJgM3xMXFE6f9oiQ",
    authDomain: "techteamform-2d2c4.firebaseapp.com",
    projectId: "techteamform-2d2c4",
    storageBucket: "techteamform-2d2c4.appspot.com",
    messagingSenderId: "688335819375",
    appId: "1:688335819375:web:79446462ba714558e0b39a"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const storage = getStorage(app); // Initialize Firebase Storage


export { db};
