import React, { useState } from 'react';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import './Form.css';

const firebaseConfig = {
  apiKey: "AIzaSyCdyklm3YT6-zjjrnMMbnM1ZGg6GsvtJAU",
  authDomain: "e-cell-tech-team-fa84d.firebaseapp.com",
  projectId: "e-cell-tech-team-fa84d",
  storageBucket: "e-cell-tech-team-fa84d.appspot.com",
  messagingSenderId: "794555128355",
  appId: "1:794555128355:web:106af3ac434c77c205ef96"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

function Form() {
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please provide valid input for all fields.");
      return;
    }

    const collectionName = `${name.split(' ')[0]}${branch.split(' ')[0]}`;
    const formData = { name, branch, email, phoneNumber };

    try {
      await addDoc(collection(db, collectionName), formData);

      if (file) {
        const storageRef = ref(storage, `${collectionName}/${file.name}`);
        await uploadBytes(storageRef, file);
        console.log('File uploaded successfully!');
      }

      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    return emailRegex.test(email) && phoneRegex.test(phoneNumber);
  };

  return (
    <form className='qt' onSubmit={handleSubmit}>
      <label>
        Full Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <br />
      <label>
        Branch of Study:
        <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      </label>
      <br />
      <label>
        Upload Image:
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
