import React, { useState, useEffect } from "react";
import AddEvents from "../../AddEvents/AddEvents";
import "./AdminDashboard.css";
import Events from "../../Events/Events";
import AllVolunteers from "../AllVolunteers/AllVolunteers";

const AdminDashboard = () => {
  const [control, setControl] = useState("allVolunteers");
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
    fetch("http://localhost:5000/volunteers")
      .then((res) => res.json())
      .then((data) => setVolunteers(data));
  }, []);

  const handleDeleteEvent = (id) => {
    fetch(`http://localhost:5000/events/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Event removed successfully') {
          setEvents(events.filter(event => event.id !== id));
        }
      });
  };

  const handleDeleteVolunteer = (id) => {
    fetch(`http://localhost:5000/volunteers/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Volunteer removed successfully') {
          setVolunteers(volunteers.filter(volunteer => volunteer.id !== id));
        }
      });
  };

  return (
    <div className="my-events">
    <div className="admin-container">
      <div className="dashboard">
        <div className="admin-box">
          <div className="row admin-container">
            <div className="col-md-3 ">
              <div className="admin-area p-1">
                <h6>Dashboard</h6>
                <div className="all-menu mt-5">
                  <li
                    onClick={() => setControl("allVolunteers")}
                    className="admin-menu p-2"
                  >
                    All Volunteers
                  </li>
                  <li
                    onClick={() => setControl("addEvents")}
                    className="admin-menu p-2"
                  >
                    Add Events
                  </li>
                  <li
                    onClick={() => setControl("allEvents")}
                    className="admin-menu p-2"
                  >
                    Manage Events
                  </li>
                </div>
              </div>
            </div>
            <div className="col-md-9 text-center">
              {control === "allVolunteers" && (
                <AllVolunteers 
                  volunteers={volunteers}
                  onDelete={handleDeleteVolunteer}
                />
              )}
              {control === "allEvents" && (
                <Events
                  events={events}
                  onDelete={handleDeleteEvent}
                />
              )}
              {control === "addEvents" && <AddEvents />}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
