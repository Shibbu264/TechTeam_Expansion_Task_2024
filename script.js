
alert("welcome to the registration form");
 const firebaseConfig = {
    apiKey: "AIzaSyATvk75jw3O8hB3cU7Ypn3D4hvTXhwnvsg",
    authDomain: "ecell-form-763bd.firebaseapp.com",
    databaseURL: "https://ecell-form-763bd-default-rtdb.firebaseio.com",
    projectId: "ecell-form-763bd",
    storageBucket: "ecell-form-763bd.appspot.com",
    messagingSenderId: "897796157098",
    appId: "1:897796157098:web:309cee25860e048ed72ad3"
  };
  firebase.initializeApp(firebaseConfig);

 var ecellformDB= firebase.database().ref("SahilPharmaceutical");
 document.getElementById("forms").addEventListener("submit" , submitform);

 function submitform(e){
    e.preventDefault();
    const folderName = `${first1}_${'Branch1'}`; 
   
    var first1=getelementval('firstname');
    var last1=getelementval('lastname');
    var branch1=getelementval('branch');
    var mail1=getelementval('mail');
    var phone1=getelementval('phone');
    const img=document.getElementById("file");
   
    savemessage(first1,last1,branch1,mail1,phone1,img);
 }

 const savemessage=(first1,last1,branch1,mail1,phone1,img)=>{
 var newform=ecellformDB.push();
     newform.set({
         firstname:first1,
         lastname:last1,
         branchname:branch1,
         mailid:mail1,
        phoneno:phone1,
        image:img,
     })
     .then(() => {
        if(!first1 || !branch1 || !mail1 || !phone1 || !isValidEmail(mail1)){
        alert("please enter all required an valid data");
        return;
     }
        alert("Registration sucessful!");
        form.reset(); // Clear the form
        
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });}

 const getelementval =(id)=>{
return document.getElementById(id).value;
 };

function isValidEmail(email) {
    var r = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return r.test(email);
}
const phoneRegex = /^\d{10}$/;

  const form=document.querySelector("#forms");
  const first=document.querySelector("#firstname");
  const last=document.querySelector("#lastname");
  const mail=document.querySelector("#mail");
  const branch=document.querySelector("#branch");
  const phone=document.querySelector("#phone");
  const firsterror=document.querySelector("#firstnameerror");
  const lasterror=document.querySelector("#lastnameerror");
  const phoneerror=document.querySelector("#phoneerror");
  const mailerror=document.querySelector("#mailerror");
  const brancherror=document.querySelector(".errors");


form.addEventListener("submit", (evt)=>{

let isValid=true;

//for first name
if(first.value===""){
    firsterror.textContent="*First Name is required.";
    isValid=false;
}else{
   
    firsterror.textContent="";

    
};

//for mail
if(mail.value===""){
    mailerror.textContent="*Email is required.";
    isValid=false;
}
else if(!isValidEmail(mail.value)){
    mailerror.textContent="*email is not valid";
    isValid=false;
}
else{
    mailerror.textContent="";
}

//for phone
if(phone.value===""){
    phoneerror.textContent="*Phone number is required.";
    isValid=false;
}
else if(!phoneRegex.test(phone.value)) {
    phoneerror.textContent="*Phone Number is not valid";
    isValid=false;
}
else{
    phoneerror.textContent="";
}
if(!isValid){
 evt.preventDefault();

}
});
