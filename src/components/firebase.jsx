import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAcAAj4riFrf2srEMKWLX4ERXcwzkyE_p8",
    authDomain: "first-project-af1ec.firebaseapp.com",
    projectId: "first-project-af1ec",
    storageBucket: "first-project-af1ec.appspot.com",
    messagingSenderId: "353001104624",
    appId: "1:353001104624:web:dfc8af49dd9663abe18e35"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };