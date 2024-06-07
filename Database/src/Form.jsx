import React, { useState } from 'react';
import { db, storage } from './firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    email: '',
    phoneNumber: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, branch, email, phoneNumber, file } = formData;

    if (name && branch && email && phoneNumber) {
      try {
        const docRef = await addDoc(collection(db, `${name}${branch}`), {
          name,
          branch,
          email,
          phoneNumber,
        });

        if (file) {
          const storageRef = ref(storage, `${name}${branch}/${file.name}`);
          await uploadBytes(storageRef, file);
          const fileURL = await getDownloadURL(storageRef);
          console.log("File available at", fileURL);
        }

        alert("Form submitted successfully!");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Branch:
        <input type="text" name="branch" value={formData.branch} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Phone Number:
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </label>
      <label>
        Upload Image:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
