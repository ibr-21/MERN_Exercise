import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function EditUser() {

  const { id } = useParams(); // get the :id from the route
  const navigate = useNavigate(); // for redirecting after submit
  const [username, setUsername] = useState("");

  // Fetch exercise and users when component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        console.log(response.data.username);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
    };

    axios
      .patch(`http://localhost:5000/users/update/${id}`, exercise)
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));

    navigate("/list-users"); // redirect after submission
  };

  return (
    <div className="form-group">
      <form>
        <label>Username: </label>
        <input
          type="text"
          required
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={onSubmit} className="btn btn-sm btn-primary m-2">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditUser;