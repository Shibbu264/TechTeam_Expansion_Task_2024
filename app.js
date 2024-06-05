import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";




const firebaseConfig = ({
    apiKey: "AIzaSyCdKthmN5V1tKXJ5vlMxbqc1L4o4clEKj4",
  authDomain: "techteamtask2024.firebaseapp.com",
  projectId: "techteamtask2024",
  storageBucket: "techteamtask2024.appspot.com",
  messagingSenderId: "1067539417498",
  appId: "1:1067539417498:web:cb7f4bf39e824524ce1223",
  measurementId: "G-76JGN8JWVE"
  });

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const firestore = getFirestore(firebaseApp);
const collectionRef = collection(firestore, 'GyanajyotiPharma');



function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;
    return emailRegex.test(email);
}


function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
}



    const form = document.getElementById('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            
            const name = getVal('name');
            const branch = getVal('branch');
            const emailid = getVal('emailid');
            const Phonenumber = getVal('Phonenumber');
          

           
            if (!validateEmail(emailid)) {
                throw new Error('Invalid email address');
            }

            if (!validatePhoneNumber(Phonenumber)) {
                throw new Error('Invalid phone number should be 10 digits');
            }

          
            const formdata = {
             name :   name,
             branch :  branch, 
             emailid  : emailid, 
             Phonenumber : Phonenumber,
            };
            const docRef = await addDoc(collectionRef, formdata);

            form.reset();
            alert('Form submitted successfully!!');
        } catch (error) {
            form.reset();
            console.error('Form validation error:', error.message);
            alert('Form validation error. Please check your inputs.');
        }
    });

function getVal(id) {
    return document.getElementById(id).value;
}
