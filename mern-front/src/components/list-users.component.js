import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Select from "react-select";


// Stateless child component (unchanged)
const ManageUser = (props) => (
  <tr>
    <td>{props.users.username}</td>
    <td>
      <Link
        to={`/edit-user/${props.users._id}`} // make sure the route is :  "/edit-user/:id
        className="btn btn-sm btn-primary me-2"
      >
        {" "}
        Edit
      </Link>
      <button
        onClick={() => props.deleteExercise(props.users._id)}
        className="btn btn-sm btn-danger"
      >
        Delete
      </button>
    </td>
  </tr>
);


function ListUsers() {
  // const { id } = useParams(); // get the :id from the route
  const [users, setUsers] = useState([]);
  const [id, setId] = useState([]);
  
  let navigate = useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5000/users/").then((response) => {
      if (response.data.length > 0) {
        const usernames = response.data.map((user) => user);
        console.log("Usernames:", usernames);
        // console.log("Usernames:", response.data);
       
        setUsers(usernames);
      }
    });
  }, [id]);


  const deleteExercise = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then((response) => console.log(response.data));

    setUsers(users.filter((ex) => ex._id !== id));
  };

  const usersList = () => {
    return users.map((t) => (
      <ManageUser
        users={t}
        deleteExercise={deleteExercise}
        key={t._id}
      />
    ));
  };


  return (
    <div>
      <h3>All Users</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>{usersList()}</tbody>
      </table>
    </div>
    
  );
}

export default ListUsers;
