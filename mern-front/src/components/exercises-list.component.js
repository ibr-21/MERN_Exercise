import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Stateless child component (unchanged)
const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link
        to={`/edit/${props.exercise._id}`}
        className="btn btn-sm btn-primary me-2"
      >
        {" "}
        Edit
      </Link>
      <button
        onClick={() => props.deleteExercise(props.exercise._id)}
        className="btn btn-sm btn-danger"
      >
        Delete
      </button>
    </td>
  </tr>
);

function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty array = run once on mount (like componentDidMount)

  const deleteExercise = (id) => {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((response) => console.log(response.data));

    setExercises(exercises.filter((ex) => ex._id !== id));
  };

  const exerciseList = () => {
    return exercises.map((exercise) => (
      <Exercise
        exercise={exercise}
        deleteExercise={deleteExercise}
        key={exercise._id}
      />
    ));
  };

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration(mins)</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
}

export default ExercisesList;
