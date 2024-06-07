const firebaseConfig = {
    apiKey: "AIzaSyDhak2Dd9NwqITo_M9QCmFbUHxVqDxOGlw",
    authDomain: "priyanshi-form.firebaseapp.com",
    databaseURL: "https://priyanshi-form-default-rtdb.firebaseio.com",
    projectId: "priyanshi-form",
    storageBucket: "priyanshi-form.appspot.com",
    messagingSenderId: "927984343938",
    appId: "1:927984343938:web:1d1bc82cae1096edd5cd9b"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var formInfo = firebase.database().ref("PriyansiChemical");

document.getElementById("html").addEventListener("submit", submission);

//submiting
function submission(e){
    e.preventDefault();
    var Name =getElementVal("name");
    var Branch= getElementVal("branch");
    var Gmail= getElementVal("gmail");
    var Phone=getElementVal("phone");

    


    Data(Name,Branch,Gmail,Phone);

//enablealert
    document.querySelector(".alert").Style.display = "block";

//remove alert
    setTimeout(() =>{
        document.querySelector(".alert").style.display="none";
    },3000);

    document.getElementById("html").reset();

}

//saving the data
const Data= (name, branch ,gmail,tel)=>{
    var newStudentsForm= formInfo.push();
    newStudentsForm.set({           
        name: Name,
        branch: Branch,
        email: Gmail,
        tel: Phone,

    });
};


//To get the value again and again without writing the statement
const getElementVal= (id)=>{
    return document.getElementById(id).value;
};