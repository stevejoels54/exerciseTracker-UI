import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/navBar.jsx";
import ExercisesList from "./components/exercisesList.jsx";
import CreateExercise from "./components/createExercise.jsx";
import CreateUser from "./components/createUser.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<ExercisesList />} />
          <Route path="/exercises" element={<ExercisesList />} />
          <Route path="/create" element={<CreateExercise />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
