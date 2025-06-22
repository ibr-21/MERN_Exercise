import React, { useState,useEffect } from "react";
import axios from "axios";

function CreateUser() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const user = { username }; // shorthand it looks:  user = { username: 'the value inside username' };
    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => {
        console.log(res.data);
        setMessage("✅ User has been created successfully!");
        setUsername(""); // reset input
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 400) {
          setMessage("❌ User already exists or invalid data.");
        } else {
          setMessage("❌ Something went wrong. Please try again.");
        }
      });
  

  };
  // Auto-hide the message after 2 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [message]);

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
      {/* If message is truthy (not empty, null, etc.), then render the <div> element. */}
      {message && <div className="alert alert-success mt-3">{message}</div>}
    </div>
  );
}

export default CreateUser;
