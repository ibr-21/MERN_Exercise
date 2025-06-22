import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditExercise() {
  const { id } = useParams(); // get the :id from the route
  const navigate = useNavigate(); // for redirecting after submit
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);


  // Fetch exercise and users when component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setDescription(response.data.description);
        setDuration(response.data.duration);
        setDate(new Date(response.data.date));
      })
      .catch((error) => console.error(error));

    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          const usernames = response.data.map((user) => user.username);
          console.log("Usernames:", usernames);
          setUsers(usernames);
        }
      })
      .catch((error) => console.error(error));
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    axios
      .patch(`http://localhost:5000/exercises/update/${id}`, exercise)
      .then((res) => console.log(res.data));

    navigate("/"); // redirect after submission
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
          <datalist id="usernames">
            {users.map((user) => (
              <option key={user} value={user} />
            ))}
          </datalist>
        </div>

        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="number"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Save Changes"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default EditExercise;
