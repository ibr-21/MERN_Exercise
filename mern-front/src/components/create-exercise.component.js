import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css" 
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function CreateExercise() {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  const navigate = useNavigate(); // for redirecting after submit

  // Fetch users when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data.map((user) => user.username));
          setUsername(response.data[0].username); // set default selected user
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // empty dependency array = run once on mount

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    };

    console.log(exercise);

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data))
      .catch((err)=> console.log(err) )

    navigate("/"); // redirect after successful submission
  };

  const userOptions = users.map((user) => ({
    value: user,
    label: user,
  }));
  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <Select
            options={userOptions}
            onChange={(selectedOption) => setUsername(selectedOption.value)}
            value={userOptions.find((option) => option.value === username)}
            placeholder="Select or search username"
            isSearchable
          />
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
            value="Create Exercise Log"
            className="btn btn-primary m-2"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExercise;
