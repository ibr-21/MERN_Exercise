import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import ListUsers from "./components/list-users.component";
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import EditUser from "./components/edit-user.component";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<ExercisesList />} />
          <Route path="/edit/:id" element={<EditExercise />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/user" element={<CreateUser />} />
          <Route path="/list-users" element={<ListUsers />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
