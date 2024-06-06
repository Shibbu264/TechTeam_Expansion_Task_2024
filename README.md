# TechTeam Expansion Task 2024

deployed link: https://tech-team-expansion-task-2024-grf40s3c4-pratham-seths-projects.vercel.app/

In this project I have used my own config rather than the one provided here is the snipet of my firebase.js file 
```
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAwgx7vGn7RuXjyVfeMGsvRrJ_VUqTWGcE",
  authDomain: "dataupload-88fc9.firebaseapp.com",
  projectId: "dataupload-88fc9",
  storageBucket: "dataupload-88fc9.appspot.com",
  messagingSenderId: "498164452473",
  appId: "1:498164452473:web:b8f710da8b6818fd3858a8",
  measurementId: "G-17YBGGMQ16"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
```
find below the video demonstration of the form

<hr>



https://github.com/PrathamX595/TechTeam_Expansion_Task_2024/assets/143347368/744e3041-d230-4c70-8fc7-be035536e52c


