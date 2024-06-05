import React, { useState} from 'react';
import './App.css';
import {useForm} from 'react-hook-form';
import { db, storage, analytics } from './firebase.js'
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';


const App = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const delay = (d) =>{
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }

  const [image, setImage] = useState(null);

  const onSubmit = async (data) => {
    delay(3)
    console.log('Submitted data:', data);

    const collectionName = `${data.name.split(' ')[0]}${data.branch.split(' ')[0]}`;
    console.log(`Name of the created collection: ${collectionName}`);

    try {
      const docRef = await addDoc(collection(db, collectionName), {
        name: data.name,
        branch: data.branch,
        email: data.email,
        phoneNumber: data.phoneNumber,
      });
      
      if (data.image) {
        const imageFile = data.image[0];
        const storageRef = ref(storage, `${collectionName}/${docRef.id}/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        console.log('Image uploaded successfully.');
      }

      alert('Data submitted successfully and added to the Firebase Database!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleClear = () => {
    reset();
    setImage(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-orange-200">
        <nav className="bg-orange-500 text-black p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/ecell.svg" alt="Logo" className="h-8 w-8 mr-2" />
            <div className="text-2xl font-bold">
              <span className="font-serif">E-Cell IIT (BHU)</span>
            </div>
          </div>
          <div className="text-xl font-bold">Form Task</div>
        </nav>
        <div className="max-w-lg mx-auto mt-10 p-7 bg-orange-100 rounded-lg shadow-md font-serif text-md">
          <h3 className="text-center font-medium text-lg mb-4">
            Enter the following details and click on Submit
          </h3>
          <form onSubmit={handleSubmit (onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your Full Name"
                className={`shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                {...register ('name', {required: 'Full name is required'})}
              />

              {errors.name &&
                <p className="text-red-500 text-sm italic">
                  {errors.name.message}
                </p>}
            </div>

            <div className="mb-4">
              <label
                htmlFor="branch"
                className="block text-gray-700 font-bold mb-2"
              >
                Branch:
              </label>
              <select
                id="branch"
                className={`shadow cursor-pointer appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.branch ? 'border-red-500' : ''}`}
                {...register ('branch', {
                  required: 'Branch of study is required',
                })}
              >
                <option value="">Click to Select Branch </option>
                <option value="Biochemical-Biomedical Engineering">
                  Biochemical/Biomedical Engineering
                </option>
                <option value="Pharmaceutical Engineering">
                  Pharmaceutical Engineering
                </option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
                <option value="Industrial Chemistry">
                  Industrial Chemistry
                </option>
                <option value="Ceramic Engineering">Ceramic Engineering</option>
                <option value="Material-Sciences and Technology">
                  Material Sciences and Technology
                </option>
                <option value="Metallurgical Engineering">
                  Metallurgical Engineering
                </option>
                <option value="Mining Engineering">Mining Engineering</option>
                <option value="Computer science Engineering">
                  Computer Science Engineering
                </option>
                <option value="MNC (Mathematics and Computing)">
                  Mathematics and Computing
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Electronics Engineering">
                  Electronics Engineering
                </option>
                <option value="EP (Engineering Physics)">Engineering Physics</option>
                <option value="Architecture & Planning">
                  Architecture & Planning
                </option>
              </select>

              {errors.branch &&
                <p className="text-red-500 text-sm italic">
                  {errors.branch.message}
                </p>}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your E-mail id"
                className={`shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                {...register ('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />

              {errors.email &&
                <p className="text-red-500 text-sm italic">
                  {errors.email.message}
                </p>}
            </div>

            <div className="mb-6">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone Number:
              </label>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="Enter your 10-digit Phone Number"
                className={`shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phoneNumber ? 'border-red-500' : ''}`}
                {...register ('phoneNumber', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit phone number',
                  },
                })}
              />

              {errors.phoneNumber &&
                <p className="text-red-500 text-sm italic">
                  {errors.phoneNumber.message}
                </p>}
            </div>
            <div className="mb-4">
              <label htmlFor="fileInput" className="block text-gray-700 font-bold mb-2">
                Upload Image:
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register('image')}
              />
              {errors.fileInput && <p className="text-red-500 text-sm italic">{errors.fileInput.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-black hover:bg-orange-500 active:bg-gray-900 text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline transition ease-in-out duration-300 mb-2 sm:mb-0"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-black hover:bg-orange-500 active:bg-gray-900 text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline transition ease-in-out duration-300 mb-2 sm:mb-0"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
            {isSubmitting && <div>Submitting... This may take a while</div>}
          </form>
        </div>
      </div>
      <footer className="bg-orange-500 text-black font-semibold text-center py-2">
        <p className="text-md">
          `Turning Ideas into Reality, One Venture at a Time'
        </p>
      </footer>
    </div>
  );
};

export default App;
