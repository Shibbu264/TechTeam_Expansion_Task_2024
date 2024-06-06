let form=document.querySelector(".info");
let name=document.querySelector("#name");
let branch=document.querySelector("#branch");
let phone=document.querySelector("#phone");
let email=document.querySelector("#email");
let submit=document.querySelector("#submit");
let close=document.querySelector(".btn");
let pop=document.querySelector(".message");




var filetext=document.querySelector(".filetext");
var progress=document.querySelector(".progress");
var uploadper=document.querySelector(".uploadper");
var per;
var fileitem;
var filename;
function getfile(e){
    fileitem=e.target.files[0];
    filename=fileitem.name;
    filetext.innerHTML=filename;

}


submit.addEventListener('click',(e)=>{
   
    e.preventDefault();
    
    validate()
    if(validate()){
    console.log(validate());
    if(validate){
    db.collection('NeharikaCSE').doc("form").set({
        
        Name:name.value,
        Branch:branch.value,
        Email:email.value,
        Phone:phone.value,
    }).then(()=>{
        console.log("processing"),
        form.reset();
        rev_success(name,branch,phone,email);

        pop.classList.toggle('invisible')
        
    });}}
    let storageRef=firebase.storage().ref("NeharikaCSE"+filename);
    let uploadtask=storageRef.put(fileitem);
    uploadtask.on("state_changed",(snapshot)=>{
        console.log(snapshot);
        per=Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        console.log(per);
        uploadper.innerHTML=per+'%';
        progress.style.width=per+"%";
    },(error)=>{
        console.log("erro is: ",error)
    },()=>{
        uploadtask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log("url is: ",url);
        })
    })
});
console.log("reached")
close.addEventListener('click',()=>{
    pop.classList.toggle('invisible')
});
const rev_success=(e1,e2,e3,e4)=>{
    const f1=e1.parentElement;
    const f2=e2.parentElement;
    const f3=e3.parentElement;
    const f4=e4.parentElement;
    f1.classList.remove('success');
    f2.classList.remove('success');
    f3.classList.remove('success');
    f4.classList.remove('success');
};
const set_error=(element,message)=>{
    const f=element.parentElement;
    const error_msg=f.querySelector(".error");
    error_msg.innerText=message;
    f.classList.add('error');
    f.classList.remove('success');

};
const set_success= element=>{
    console.dir(element);
    console.dir(element.parentElement);
    const f=element.parentElement;

    console.dir(f);
    const error_msg=f.querySelector(".error");
    console.dir(error_msg);
    
    error_msg.innerText="";
    f.classList.add('success');
    f.classList.remove('error');
    
};
const contact_check= element=>{
    const check=/^\d{10}$/;
    return check.test(element);
};
const email_check= element=>{
    const check=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return check.test(String(element).toLowerCase());
};

const validate=()=>{
    const n=name.value.trim();
    const b=branch.value.trim();
    const p=phone.value.trim();
    const m=email.value.trim();
    let isvalid=true;

    if(n===""){
        set_error(name,"Username is a required entry");
        isvalid=false;
    }
    else{
        set_success(name);
    }
    if(b===""){
        set_error(branch,"Branch is a required entry");
        isvalid=false;
    }
    else{
        set_success(branch);
    }
    if(contact_check(p)){
        set_success(phone);
    }
    else{
        set_error(phone,"Enter a valid phone number: ");
        isvalid=false;
    }
    if(m===""){
        set_error(email,"Email is required entry");
        isvalid=false;
    }
    else if(!email_check(m)){
        set_error(email,"Enter a valid email");
        isvalid=false;
    }
    else {set_success(email);}
    return isvalid;
    
};
  