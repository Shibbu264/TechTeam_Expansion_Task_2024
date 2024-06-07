
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC1jZ9hCJR39KzXK6Bw_tfWTxnBy4fhuEM",
    authDomain: "database-432da.firebaseapp.com",
    projectId: "database-432da",
    storageBucket: "database-432da.appspot.com",
    messagingSenderId: "201012144788",
    appId: "1:201012144788:web:7b5a5dea8a1f3ec7cda281",
    measurementId: "G-VJ6K1W9KGZ"
  };


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
