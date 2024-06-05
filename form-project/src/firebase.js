import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCekSqbzAEdWBTN2aLFZmh1K6vZ7ae7rYI",
  authDomain: "e-cell-form-task.firebaseapp.com",
  projectId: "e-cell-form-task",
  storageBucket: "e-cell-form-task.appspot.com",
  messagingSenderId: "685769778135",
  appId: "1:685769778135:web:e846dba8cf0d9cafc32192",
  measurementId: "G-4SZSNGYXM7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { db, storage, analytics };