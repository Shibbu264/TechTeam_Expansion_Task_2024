// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAyD3wNT5M-9TiHZ6VeOSyRmPW18G6YXls",
//     authDomain: "assignform23085096.firebaseapp.com",
//     projectId: "assignform23085096",
//     storageBucket: "assignform23085096.appspot.com",
//     messagingSenderId: "35404348635",
//     appId: "1:35404348635:web:cd920b6ac9a62a54e860fe",
//     measurementId: "G-ZRDC9NX2VN"
//   };
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdKthmN5V1tKXJ5vlMxbqc1L4o4clEKj4",
    authDomain: "techteamtask2024.firebaseapp.com",
    projectId: "techteamtask2024",
    storageBucket: "techteamtask2024.appspot.com",
    messagingSenderId: "1067539417498",
    appId: "1:1067539417498:web:cb7f4bf39e824524ce1223",
    measurementId: "G-76JGN8JWVE"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

// Form handling
const success = document.getElementById('sm');
const mess = document.getElementById('wm');
const form = document.getElementById('formdiv');

// Validation function
function validation() {
    const inputname = document.getElementById('namefilled').value;
    const inputnum = document.getElementById('phonenumfilled').value;
    const numerror = document.getElementById('nuem');
    const nameerror = document.getElementById('naem');
    const nameRegex = /^[A-Za-z ]{3,30}$/;
    const phonenumRegex = /^[6-9][\d]{9}$/;
    nameerror.style.display = "none";
    numerror.style.display = "none";
    let isvalid = true;

    if (!nameRegex.test(inputname)) {
        nameerror.style.display = "block";
        isvalid = false;
    }
    if (!phonenumRegex.test(inputnum)) {
        numerror.style.display = "block";
        isvalid = false;
    }
    return isvalid;
}

// Sending off form data
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Perform validation
    if (!validation()) {
        return;
    }

    try {
        const nameofuser = document.getElementById('namefilled').value;
        const branchofuser = document.getElementById('branchnamefilled').value;
        const emailofuser = document.getElementById('emailidfilled').value;
        const phonenumofuser = document.getElementById('phonenumfilled').value;
        const photoofuser = document.getElementById('photouploaded').files[0];
        let urlofuserphoto = '';

        // Upload photo if provided
        if (photoofuser) {
            const photoname = photoofuser.name;
            const photoref = ref(storage, photoname);
            await uploadBytes(photoref, photoofuser);
            urlofuserphoto = await getDownloadURL(photoref);
        }

        // Adding a new document to the "nayacollection" collection
        await setDoc(doc(db, 'SuhaniElectrical', emailofuser), {
            name: nameofuser,
            branch: branchofuser,
            email: emailofuser,
            phonenum: phonenumofuser,
            imgurl: urlofuserphoto
        });

        // Show success message
        success.style.display = 'block';
        setTimeout(() => {
            success.style.display = 'none';
        }, 2000);

    } catch (error) {
        console.error("An error occurred", error);

        // Show error message
        mess.style.display = 'block';
        setTimeout(() => {
            mess.style.display = 'none';
        }, 2000);
    }

    // Reset form
    form.reset();
});
