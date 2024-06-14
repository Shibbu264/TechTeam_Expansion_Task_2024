 // Your web app's Firebase configuration
 const firebaseConfig = {
    // apiKey: "AIzaSyB_hlHBSNLYMNUVx4zJhb-5UzdUpZn3ahI",
    authDomain: "form-for-ecell.firebaseapp.com",
    databaseURL: "https://form-for-ecell-default-rtdb.firebaseio.com",
    projectId: "form-for-ecell",
    storageBucket: "form-for-ecell.appspot.com",
    messagingSenderId: "715888968726",
    appId: "1:715888968726:web:0d6c91d7f9b41a82c46137"
  };

  // initialize firebase
  firebase.initializeApp(firebaseConfig);

  // reference database
  var formInfo = firebase.database().ref("RaviChemical");

  document.getElementById("firstform").addEventListener("submit",submission);

  function submission(e){
    e.preventDefault();
    var Name = getElementVal("username");
    var Branch = getElementVal("branch");
    var Gmail = getElementVal("gmail");
    var Phone = getElementVal("mobile");

    getData(Name,Branch,Gmail,Phone);

    document.querySelector(".b7").style.display = "block";

    setTimeout(() => {
        document.querySelector(".b7").style.display = "none";
    }, 3500);

    document.getElementById("firstform").reset();
    

  }

  const getData = ( Name,Branch,Gmail,Phone) =>{
    var newData = formInfo.push();
    newData.set({
        name : Name,
        branch : Branch,
        gmail : Gmail,
        phone : Phone,

    });
  };
  const getElementVal = (id) => {
    return document.getElementById(id).value;



  };