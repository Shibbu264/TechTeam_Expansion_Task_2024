import { useState, useEffect } from "react";
import "./userData.css";  // Ensure you have this CSS file to style your table

const UserData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ecell-292ea-default-rtdb.firebaseio.com/Ecell_database.json");
        if (response.ok) {
          const data = await response.json();
          const usersList = Object.values(data);
          setUsers(usersList);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>User Data</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Branch Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.PhoneNumber}</td>
              <td>{user.branchname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
