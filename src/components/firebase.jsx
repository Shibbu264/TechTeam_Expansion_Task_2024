import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCdKthmN5V1tKXJ5vlMxbqc1L4o4clEKj4",
    authDomain: "techteamtask2024.firebaseapp.com",
    projectId: "techteamtask2024",
    storageBucket: "techteamtask2024.appspot.com",
    messagingSenderId: "1067539417498",
    appId: "1:1067539417498:web:cb7f4bf39e824524ce1223",
    measurementId: "G-76JGN8JWVE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };