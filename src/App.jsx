import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "./firebase";

import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { firstName, branch } = data;
    const collectionName = `${firstName}${branch}`;

    try {
      // Save form data to Firestore
      await addDoc(collection(db, collectionName), data);

      alert("Data submitted successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting the form. Please try again.");
    }
  };

  console.log(watch("example")); // Watch example usage

  return (
    <div className="bgcontainer">
      <form className="myform" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="heading">Welcome to E-Cell IIT BHU</h1>
        
        <label>First Name*</label>
        <input
          {...register("firstName", {
            required: true,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i,
          })}
        />
        {errors?.firstName?.type === "required" && <p>This field is required</p>}
        {errors?.firstName?.type === "maxLength" && (
          <p>First name cannot exceed 20 characters</p>
        )}
        {errors?.firstName?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}

        <label>Last Name*</label>
        <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
        {errors?.lastName?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}

        <label>Age</label>
        <input {...register("age", { min: 18, max: 99 })} />
        {errors.age && (
          <p>You must be older than 18 and younger than 99 years old</p>
        )}

        <label>Branch*</label>
        <input {...register("branch",{required: true})} />
        {errors.branch && <p>This field is required</p>}

        <label>Email*</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors?.email && <p>{errors.email.message}</p>}

        <label>Mobile number*</label>
        <input 
          {...register("mobile", {
            required: true,
            minLength: 10,
            maxLength: 10,
            pattern: {
              value: /^[0-9]+$/,
              message: "Please enter a valid mobile number",
            },
          })}
        />
        {errors.mobile && <p>{errors.mobile.message}</p>}

        <input type="submit" />
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);

export default App;
