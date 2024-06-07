import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGluJO5JpNhs441mMHzlufyfF941kqsDc",
  authDomain: "my-first-project-4047b.firebaseapp.com",
  databaseURL: "https://my-first-project-4047b-default-rtdb.firebaseio.com",
  projectId: "my-first-project-4047b",
  storageBucket: "my-first-project-4047b.appspot.com",
  messagingSenderId: "595055228135",
  appId: "1:595055228135:web:0d45a880d7f6e865a99e42",
  measurementId: "G-XYDSHK6RWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('participantForm');
const errorDiv = document.getElementById('error');

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhoneNumber = (number) => {
  return /^\d{10}$/.test(number);
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorDiv.textContent = '';

  const name = document.getElementById('name').value.trim();
  const branch = document.getElementById('branch').value.trim();
  const email = document.getElementById('email').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();

  if (!name || !branch || !email || !phoneNumber) {
    errorDiv.textContent = 'All fields are required';
    return;
  }

  if (!validateEmail(email)) {
    errorDiv.textContent = 'Invalid email format';
    return;
  }

  if (!validatePhoneNumber(phoneNumber)) {
    errorDiv.textContent = 'Invalid phone number format';
    return;
  }

  const collectionName = `${name.split(' ')[0]}${branch.split(' ')[0]}`;

  try {
    await addDoc(collection(db, collectionName), {
      name,
      branch,
      email,
      phoneNumber,
    });
    alert('Form submitted successfully!');
    form.reset();
  } catch (error) {
    console.error('Error adding document: ', error);
    errorDiv.textContent = 'Error submitting form. Please try again.';
  }
});
