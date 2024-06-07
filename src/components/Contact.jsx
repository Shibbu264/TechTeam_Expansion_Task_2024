import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
// import './Contact.css'; // Assuming the CSS file is named Contact.css

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [branch, setBranch] = useState("");
  const [number, setNum] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!name) tempErrors.name = "Name is required";
    if (!email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Email address is invalid";
    if (!branch) tempErrors.branch = "Branch is required";
    if (!number) tempErrors.number = "Phone number is required";
    else if (!/^\d{10}$/.test(number)) tempErrors.number = "Phone number is invalid (should be 10 digits)";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      alert("Please fix the errors in the form");
      return;
    }
    const firstName = name.split(" ")[0];
    const collectionName = `${firstName}${branch.replace(/\s+/g, '')}`; // Concatenate first name and branch without spaces

    try {
      await addDoc(collection(db, collectionName), {
        name: name,
        email: email,
        branch: branch,
        phone_num: number,
      });
      alert("Details have been submitted");
      resetForm();
    } catch (error) {
      alert(error.message);
    }
  };

  const resetForm = () => {
    setName('');
    setMail('');
    setBranch('');
    setNum('');
    setErrors({});
  };

  return (
    <div className='Container'>
    <form className='form' onSubmit={handleSubmit}>
      <div className="header">
                <div className="text">Student Details</div>
                <div className="underline"></div>
            </div>
      <div className='conditions'>
        <h3>Required feild are followed by a *</h3>
      </div>
      <div className='mainInput'>
      <div>
        <label>Name*</label>
        <input type='text' placeholder='Please Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} className='inputs' />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label>Email*</label>
        <input type='email' placeholder='Please Enter Your Email' value={email} onChange={(e) => setMail(e.target.value)} className='inputs'/>
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label>Branch*</label>
        <input type='text' placeholder='Please Enter Your Branch' value={branch} onChange={(e) => setBranch(e.target.value)} className='inputs' />
        {errors.branch && <p className="error">{errors.branch}</p>}
      </div>
      <div>
        <label>Phone Number*</label>
        <input type='text' placeholder='Please Enter Your Phone Number' value={number} onChange={(e) => setNum(e.target.value)} className='inputs' />
        {errors.number && <p className="error">{errors.number}</p>}
      </div>
      </div>
      <button type='submit'>Submit your details</button>
      <button type='button' onClick={resetForm}>Reset</button>
    </form>
    </div>
  );
}

export default Contact;
