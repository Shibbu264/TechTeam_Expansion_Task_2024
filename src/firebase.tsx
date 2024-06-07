import firebase from "firebase";

import "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyCgotbZRgqKXNbKLO_aU_qAZ6usy0mLIHA",

    authDomain: "form-task-5bb7c.firebaseapp.com",
  
    projectId: "form-task-5bb7c",
  
    storageBucket: "form-task-5bb7c.appspot.com",
  
    messagingSenderId: "700757172119",
  
    appId: "1:700757172119:web:ab5a0561c5e5b88f156ed2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

export { storage };
export { db as default };
