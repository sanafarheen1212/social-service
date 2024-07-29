import React, { useState, useEffect } from "react";
import useFirebase from "../../Hook/useFirebase";
import './MyEvents.css';

const MyEvents = () => {
  const { user } = useFirebase();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/myEvents/${user.email}`)
        .then((res) => res.json())
        .then((data) => setEvents(data));
    }
  }, [user.email]);

  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(https://thekensingtonfallschurch.com/wp-content/uploads/bigstock-Helping-Hands-45333739.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(1px)', /* Adjust the blur amount */
    zIndex: -1, /* Places it behind other content */
  };

  return (
    <div style={backgroundStyle}>
      <div className="my-events-container">
        <h1 className="title">My Schedules: {events.length}</h1>
        <div className="events-list">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event._id}className="event-card">
                <h2 className="event-title">{event.title}</h2>
                <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
                <p className="event-description">{event.description}</p>
                <p className="event-location">{event.location}</p>
              </div>
            ))
          ) : (
            <p className="no-events">No events scheduled.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEvents;
