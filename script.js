// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3mqGO_l8pnq4WblUN_rIxGQ2p3DuTNC8",
    authDomain: "fir-form-83b70.firebaseapp.com",
    projectId: "fir-form-83b70",
    storageBucket: "fir-form-83b70.appspot.com",
    messagingSenderId: "107066393022",
    appId: "1:107066393022:web:85e777b1bd40e01eb8f9ef",
    measurementId: "G-1VBKBBV3T8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

document.getElementById('submitForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const branch = document.getElementById('branch').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    console.log("Form Data:", { name, branch, email, phone });

    const isConfirmed = confirm('Press OK to confirm submission.');
    if (!isConfirmed) {
        return;
    }
    try {
        await addDoc(collection(db, "PriyanshiMChemical"), {
            FullName: name,
            Branch: branch,
            Email: email,
            Phone: phone
        });
        alert('Submitted Successfully!');
        
    } 
        catch (error) {
        console.error("Error adding document: ", error);
        alert('There was an error submitting your details. Please try again.');
    }

})