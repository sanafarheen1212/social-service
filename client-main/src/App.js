import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Menubar from "./components/Menubar/Menubar";
import Home from "./components/Home/Dashboard";
import Login from "./components/Login/Login";
import AddEvents from "./components/AddEvents/AddEvents";
import AddVolunteer from "./components/AddVolunteer/AddVolunteer";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import Events from "./components/Events/Events";
import MyEvents from "./components/MyEvents/MyEvents";
import Support from "./components/support/Support";

function App() {
  return (
    <div className="App">
      <Router>
        <Menubar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mySchedule" element={<MyEvents />} />
          <Route path="/gatherings" element={<Events />} />
          <Route path="/addEvents" element={<AddEvents />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/registerVolunteer" element={<AddVolunteer />} />
          <Route path="/support" element={<Support />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
