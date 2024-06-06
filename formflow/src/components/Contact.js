import React, { useState, useEffect } from "react";
import "../app.css";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
const Contact = () => {
    const [name, setName] = useState("")
    const [branch, setBranch] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhoneNumber] = useState("")
    const [file, setFile] = useState()
    const [loader, setLoader] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (file == null) { alert("There was some error uploading the file"); return; }
        const storageRef = ref(storage, `RaseshMathematicsAndComputing/${name.trim()}/${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => { getDownloadURL(snapshot.ref).then((url) => { console.log("File uploaded Successfully"); }); });
        setLoader(true);
        db.collection('RaseshMathematicsAndComputing').add(
            { Name: name.trim(), Branch: branch.trim(), Email: email.trim(), PhoneNumber: phone }
        ).then(() => { alert("Form submitted successfully"); setLoader(false) }).catch((error) => { alert(error.message); setLoader(false) })
        setName("");
        setBranch("");
        setEmail("");
        setPhoneNumber("");
        setFile()
    }
    return (
        // <div class="container">
            <form className='form' onSubmit={handleSubmit}>
                <h1>Information Form 👨🏻‍🎓📝</h1>
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter Your Name Here' required />
                <label>College Branch</label>
                <input value={branch} onChange={(e) => setBranch(e.target.value)} type='text' placeholder='Enter Your Branch Here' required />

                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter Your Email Address Here' required />
                <label>Phone Number</label>
                <input value={phone}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        if (/^\d*$/.test(newValue)) { setPhoneNumber(e.target.value) }
                    }
                    }
                    type='text' placeholder='Enter Your Phone Number here Here' required />
                <label>File</label>
                <input type='file'  onChange={(e) => setFile(e.target.files[0])} placeholder="Input File here" required />
                <button type="submit" disabled={loader} >Submit</button>
            </form>
        // </div>
    );
}

export default Contact;


