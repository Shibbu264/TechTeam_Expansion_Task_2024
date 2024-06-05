import{ initializeApp } from 'firebase/app'
import{
    getFirestore, collection, addDoc, serverTimestamp,
} from 'firebase/firestore'
import{
    getAuth, createUserWithEmailAndPassword, onAuthStateChanged,
} from 'firebase/auth'
import{
    getStorage,ref, uploadBytes, getDownloadURL
} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBveCIZLitId-GY29ITvp8Qn7ySkKv5sJY",
    authDomain: "e-celltask.firebaseapp.com",
    projectId: "e-celltask",
    storageBucket: "e-celltask.appspot.com",
    messagingSenderId: "1038712385022",
    appId: "1:1038712385022:web:2badcf88e1eb6b8527e4af"
  };
  initializeApp(firebaseConfig) 
  const db = getFirestore();
const auth = getAuth();
const storage = getStorage();
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = signupForm.name.value
    const branch = signupForm.branch.value
    const email = signupForm.email.value
    const phonenumber = signupForm.phonenumber.value
    const password = e.target.password.value;
    const image = e.target.image.files[0];
    if (!name || !branch || !email || !phonenumber || !password) {
        document.getElementById('message').textContent = 'All fields are required';
        return;
    }
    const userCredential =createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
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
        
            signupForm.reset();
            document.getElementById('message').textContent = 'Form submitted successfully!';
    } 
    catch (error) {
        console.error(error);
        document.getElementById('message').textContent = 'Error submitting form';
    }
})
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User logged in:', user);
    } else {
        console.log('User logged out');
    }
});

  