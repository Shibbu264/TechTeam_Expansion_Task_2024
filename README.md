Here is the link of my deployed website:
https://ecellproject.netlify.app/

I have used my own configuration instead of which was provided ,i have attached my config here below: 

# Task: Explore Firestore and firebase

## Description

We want you all to get an intro to firebase and similar backend technology so We are attaching a sample Task but If you think you can do something more creative and cooler than this task or you have built a project where you have utilized firebase or firestore database or anyother database like Mongodb,postgresql etc, then you can submit that as well just make sure to attach a "projectdescription.md" file in the Pull-request and explain about it .






# Sample Task 

The task involves creating a form with specific fields and submitting the form. On submission, the data should be stored in a [Firestore database](https://firebase.google.com/docs/firestore). Yor are also required to create a collection with your first name and branch, following a specific naming convention (mentioned below). I can add some good resources for firebase and form but I want to test your Googling skills. But wherever you fill confused, feel free to ask in WhatsApp group.

## Task Requirements

1. Create a form with the following fields:
   - **Name**: A field for participants to enter their full name.
   - **Branch**: A field for participants to enter their branch of study.
   - **Email**: A field for participants to enter their email address.
   - **PhoneNumber**: A field for participants to enter their phone number.

2. All fields mentioned above are required, meaning participants must provide information for each field before submitting the form.

3. Implement form validation to ensure that participants provide valid data. For example, validate that the email address follows the proper format, and ensure the phone number is in a valid format as well.

4. Design and implement a user interface (UI) for the form. Participants are free to choose any framework they prefer for building the UI.

5. Configure Firebase Firestore to store the form data. We have provided you with the Firebase configuration file that you will need to integrate into your solution,however you are free to use your own configuration in that case attach the screenshot of the collection in firebase dashboard with the pull request.

6. Participants should create a collection in Firestore with the following naming convention:
   - Collection Name: FirstNameBranch
   - For example, if a participant's name is "Shivanshu Ranjan" and their branch is "Chemical Engineering" the collection name would be "ShivanshuChemical".

7. Once participants complete the task,host the form on services like (netlify or vercel) and raise a pull request on this repository with the link of your hosted site in description.


# Bonus Task
Can you create a functionality to upload an image also to the firebase storage bucket along with form submission, Keep the folder name in the same format i.e "FirstNameBranch" ?

Hint: You can use input type as file like   "<input type="file" id="fileInput" />" and then you can get the image object from  const file = document.getElementById("fileInput").files[0] .After that you can upload this file to storagebucket by creating a reference to storage bucket just like you are doing for form submission.

# Suggestion/Warning 
Take help from chatgpt/gemini whenever required . They will make your work a lot easy but don't go on just blindly copy pasting the code from chatgpt as We will be discussing your project in details in the interview if shortlisted .




## Deadline

The deadline for completing this task is the end of the day (EOD) on June 6th.(Negotiable if requested)

## Additional Notes

- You are free to use any framework of their choice for building the form and UI. You can select from popular options such as React,NextJS, Angular, Vue.js, or any other framework they are comfortable with. Also don't get scared if you aren't familiar with these now, you can go on with html/css JS as well .
 
- We encourage you to write clean and well-documented code. This will make reviewing your submissions easier and allow for better evaluation of your skills.
- Its optional but if you use [react hook form](https://www.react-hook-form.com), it would make form handling and validation lot simpler.


# Happy Coding 



## Firestore config file
```

const firebaseConfig = {
 apiKey: "AIzaSyBveCIZLitId-GY29ITvp8Qn7ySkKv5sJY",
 authDomain: "e-celltask.firebaseapp.com",
 projectId: "e-celltask",
 storageBucket: "e-celltask.appspot.com",
 messagingSenderId: "1038712385022",
 appId: "1:1038712385022:web:2badcf88e1eb6b8527e4af"
};
```
VanillaJS here is the script
```
<script type="module">
  
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
 import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
 import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
 
 const firebaseConfig = {
 apiKey: "AIzaSyBveCIZLitId-GY29ITvp8Qn7ySkKv5sJY",
 authDomain: "e-celltask.firebaseapp.com",
 projectId: "e-celltask",
 storageBucket: "e-celltask.appspot.com",
 messagingSenderId: "1038712385022",
 appId: "1:1038712385022:web:2badcf88e1eb6b8527e4af"
};

  // Initializing Firebase
 const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
</script>
```

## FAQ
Q: How would you know wheather you have succesfully connected to database or not?<br>
A: When we add document to firestore, in response we get a document id, so if you're getting this id that means you have succesfully connected to database.

Here are some of the screenshots of my project demostrating the functionalities:
![website ss](https://github.com/MuskanPastor/TechTeam_Expansion_Task_2024/assets/154066638/f8ea5684-f1c3-4ad9-bbf8-0f5b3cd5989a)

![website ss3](https://github.com/MuskanPastor/TechTeam_Expansion_Task_2024/assets/154066638/2ef3d383-7414-4830-9598-b742888abbd6)

![website ss2](https://github.com/MuskanPastor/TechTeam_Expansion_Task_2024/assets/154066638/e14e7f18-f543-4819-a05f-0d9c8ca8dd27)

![website ss1](https://github.com/MuskanPastor/TechTeam_Expansion_Task_2024/assets/154066638/830385c0-21dd-4de1-aacb-7242f9b7a234)

![firebase](https://github.com/MuskanPastor/TechTeam_Expansion_Task_2024/assets/154066638/68b47d47-6fde-4fba-885e-545c5b9ca202)


Here is the video demonstration of my project:

https://github.com/MuskanPastor/TechTeam_Expansion_Task_2024/assets/154066638/2f5e1d25-c148-43f6-a3fa-685ce289a8b7





