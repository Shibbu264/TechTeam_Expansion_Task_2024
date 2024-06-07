// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVxS73Yc8BggI6o5VE6ZB3LDXFP4yc-zw",
    authDomain: "e-cell-tech-team.firebaseapp.com",
    projectId: "e-cell-tech-team",
    storageBucket: "e-cell-tech-team.appspot.com",
    messagingSenderId: "175102458189",
    appId: "1:175102458189:web:ce75ceb67ee0b827c65f04",
    measurementId: "G-7QGF87208N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let fullname = document.querySelector('#fullname');
let email = document.querySelector('#email');
let phone = document.querySelector('#phone');
let branch = document.querySelector('#branch');
let icon = document.querySelector('#mode');
let submitButton = document.querySelector('#submit');
let count = 0;

submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    fullname.value = fullname.value.trim();
    let mainname = fullname.value.split(" ")[0];
    branch.value = branch.value.trim();
    let branchfirst = branch.value.split(" ")[0];

    if (fullname.value.length < 1) {
        window.alert("Name is blank");
        count++;
        return false;
    }

    if (email.value.length < 1) {
        window.alert("Email is blank");
        count++;
        return false;
    }

    let emailat = email.value.indexOf('@');
    if (emailat < 1) {
        window.alert("Email is not valid");
        count++;
        return false;
    }

    if (phone.value.trim().length !== 10 || isNaN(phone.value.trim())) {
        window.alert("Phone number is not valid");
        count++;
        return false;
    }

    if (count === 0) {
        window.alert("Form Submitted Successfully");

        let output = mainname + branchfirst;
        console.log(output);
        let FirstNameBranch = output;
        const colRef = db.collection(FirstNameBranch);
        const addDocument = async () => {
            try {
                const docData = {
                    fullName: fullname.value,
                    email: email.value,
                    phoneNumber: phone.value,
                    branch: branch.value
                };
                const docRef = await colRef.add(docData);
                console.log("Document written with ID: ", docRef.id);
                let form = document.querySelector('#myForm');
                form.reset();
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        };
        addDocument();
    }
});

let hovcount = 0;
submitButton.addEventListener('mouseover', function(event) {
    event.preventDefault();
    if (fullname.value.trim().length < 1) {
        hovcount++;
    }

    if (email.value.trim().length < 1) {
        hovcount++;
    }

    let emailat = email.value.indexOf('@');
    if (emailat < 1) {
        hovcount++;
    }

    if (phone.value.trim().length !== 10 || isNaN(phone.value.trim())) {
        hovcount++;
    }

    if (hovcount === 0) {
        submitButton.classList.remove('red');
        submitButton.classList.add('green');
    } else {
        submitButton.classList.remove('green');
        submitButton.classList.add('red');
    }
});

submitButton.addEventListener('mouseout', function(event) {
    submitButton.classList.remove('green');
    submitButton.classList.remove('red');
    hovcount = 0;
});

icon.addEventListener('click', function(event) {
    event.preventDefault();
    let body = document.querySelector('body');
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});


