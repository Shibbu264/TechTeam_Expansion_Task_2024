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
    const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    const storage = getStorage();
    const signupForm = document.querySelector('.signup')
    const submittedDataList = document.getElementById('submittedData');
    function displaySubmittedData(data) {
    submittedDataList.innerHTML = ''; 
    const li = document.createElement('li');
    li.textContent = "Name: " + data.name + ", Branch: " + data.branch + ", Email: " + data.email + ", Phone Number: " + data.phonenumber;
    submittedDataList.appendChild(li);
    }
    signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = signupForm.name.value.split(' ').join('');
    const branch = signupForm.branch.value
    const email = signupForm.email.value
    const phonenumber = signupForm.phonenumber.value
    const password = e.target.password.value;
    const image = e.target.image.files[0];
    if (!name || !branch || !email || !phonenumber || !password) {
        document.getElementById('message').textContent = 'All fields are required';
        return;
    }
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    } 
      function validatePhoneNumber(phonenumber) {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phonenumber);
    }
      function validatePassword(password) { 
        return password.length >= 6;
      }
      if (!validateEmail(email)) {
        document.getElementById('message').textContent = 'Please enter a valid email address,for example: task@gmail.com';
        return;
      }
      if (!validatePhoneNumber(phonenumber)) {
        document.getElementById('message').textContent = 'Please enter a valid phone number';
        return;
      }
      if (!validatePassword(password)) {
        document.getElementById('message').textContent = 'Password should be at least 6 characters long';
        return;
      }
      const isConfirmed = confirm('Are you sure you want to submit the form?');
      if (!isConfirmed) {
        return;
      }
      try{ 
      const docRef = addDoc(collection(db, name + branch), {
          name: signupForm.name.value,
          branch: signupForm.branch.value,
          email: signupForm.email.value,
          phonenumber: signupForm.phonenumber.value,
          createdAt: serverTimestamp()
         
      });
     if (image) {
         const imageRef = ref(storage, 'images/' + name + branch + '/' + image.name);
         uploadBytes(imageRef, image);
         const imageURL =getDownloadURL(imageRef);
         console.log('Image URL:', imageURL);
     } 
     document.getElementById('message').textContent = 'Form submitted successfully!';
     displaySubmittedData({ name, branch, email, phonenumber });
     signupForm.reset();     
     } 
     catch (error) {
         console.error(error);
         document.getElementById('message').textContent = 'Error submitting form';   
    }
});  
        

