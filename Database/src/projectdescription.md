# Project Description

## Overview

This project is a web application that features a form for collecting user information and uploading an image. The data is stored in a Firestore database and the image is uploaded to Firebase Storage. The application is built using React and Vite for the frontend and Firebase for the backend services.

## Features

1. **Form Submission**: Users can fill out a form with the following fields:
   - Full Name
   - Branch of Study
   - Email Address
   - Phone Number

2. **Image Upload**: Users can upload an image along with the form submission. The image is stored in Firebase Storage.


3. **Form Validation**: The form includes validation to ensure that all fields are filled out correctly and that the email and phone number follow valid formats.


## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Firebase (Firestore and Storage)



The Firebase configuration is set up in a `firebaseConfig.js` file, which initializes the Firebase app, Firestore, and Storage. Here is a sample configuration:
