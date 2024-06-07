import React, { useRef, useState } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";

export default function Home() {
  const nameRef = useRef();
  const branchRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const ref = collection(firestore, "IshaanComputerEngg");

  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      branch: branchRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    };
    try {
      await addDoc(ref, data);
      setSuccessMessage("Record has been saved successfully!!"); // Set success message
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div>
      <div className="form-title">Student Information Form</div>
      <form onSubmit={handleSave}>
        <label>Name</label>
        <input
          type="text"
          ref={nameRef}
          required
          pattern="[A-Za-z\s]+"
          title="Name can only contain letters and spaces"
        />

        <label>Branch</label>
        <input
          type="text"
          ref={branchRef}
          required
          pattern="[A-Za-z\s]+"
          title="Branch can only contain letters and spaces"
        />

        <label>Email</label>
        <input
          type="email"
          ref={emailRef}
          required
        />

        <label>Phone</label>
        <input
          type="tel"
          ref={phoneRef}
          required
          pattern="[0-9]{10}" // Allow 10 digits only
          title="Please enter a valid 10-digit phone number"
        />

        <button type="submit">Save</button>
      </form>
      {successMessage && <p>{successMessage}</p>} {/* Display success message */}
    </div>
  );
}
