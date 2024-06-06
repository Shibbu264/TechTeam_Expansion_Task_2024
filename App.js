import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function App() {
  const [user, setUser] = useState({
    firstname: "",
    branch: "", 
    email: "",
    PhoneNumber: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, branch, email, PhoneNumber } = user;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstname, branch, email, PhoneNumber })
    };
    try {
      const res = await fetch("https://first-project-49c2d-default-rtdb.firebaseio.com/ecell_database.json", options);
      if (res.ok) {
        alert("Message sent successfully");
        navigate("/database");
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error");
    }
  }

  return (
    <div className="form">
      <div className="Container">
        <h1>Student form</h1>
        <form method="POST" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="firstname" 
            placeholder="Name" 
            value={user.firstname} 
            onChange={handleInputChange} 
            required 
          /><br/>
          <input 
            type="text" 
            name="branch" 
            placeholder="Branch" 
            value={user.branch} 
            onChange={handleInputChange} 
            required 
          /><br/>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={user.email} 
            onChange={handleInputChange} 
            required 
          /><br/>
          <input 
            type="text" 
            name="PhoneNumber" 
            placeholder="Phone Number" 
            value={user.PhoneNumber} 
            onChange={handleInputChange} 
            required 
          /><br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
