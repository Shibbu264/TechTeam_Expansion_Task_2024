import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh_K3rARUTcVgT3BCrlL_AC-TUn49Okjc",
  authDomain: "ecell-2024.firebaseapp.com",
  projectId: "ecell-2024",
  storageBucket: "ecell-2024.appspot.com",
  messagingSenderId: "174842735119",
  appId: "1:174842735119:web:69190bcc370aa4d912517a",
  measurementId: "G-B3TFGC5717"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Firestore
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('honey').addEventListener('submit', function(event) {
    event.preventDefault();
    let valid = true;

    const name = document.getElementById('name').value;
    const branch = document.getElementById('branch').value;
    const email = document.getElementById('email').value;
    const phonenumber = document.getElementById('phone').value;

    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
        valid = false;
        document.getElementById('emailError').textContent = 'Invalid Email Format';
    }

    const phonePattern = /^[1-9][0-9]{9}$/;

    if (!phonePattern.test(phonenumber)) {
        valid = false;
        document.getElementById('phoneError').textContent = 'Invalid PhoneNumber Format';
    }

    if (valid) {
      addDoc(collection(db, 'raju_mechanical'), {
        name: name,
        branch: branch,
        email: email,
        phone: phonenumber
      }).then(() => {
        alert('Form is submitted successfully!');
        document.getElementById('honey').reset();
      }).catch((error) => {
        console.error('Error writing document: ', error);
      });
    }
  });
});
