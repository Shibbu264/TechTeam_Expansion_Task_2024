
const inputs= document.querySelectorAll(".contact-input");

const tooglebtn = document.querySelector(".theme-toogle");

const allElements = document.querySelectorAll("*");



tooglebtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark");

    allElements.forEach(el=>{
        el.classList.add("transition"); 
        setTimeout(()=>{
            el.classList.remove("transition");
        },1000);
    });
});



//these are created to add new classes when specific action is performed and then remove that classes from object when action gets performed...the added classes are given some another interesting features which will apply to object when action is performed

inputs.forEach(ipt => {
    ipt.addEventListener("focus", ()=>{
        ipt.parentNode.classList.add("focus");    
        ipt.parentNode.classList.add("not-empty");    
    })
    ipt.addEventListener("blur", ()=>{
        if(ipt.value==""){
            ipt.parentNode.classList.remove("not-empty");   
        }
        ipt.parentNode.classList.remove("focus");    
    })
});


