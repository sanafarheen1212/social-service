import React from "react";
import { Link } from "react-router-dom";
import useFirebase from "../../Hook/useFirebase";
import "./Menubar.css";

const Menubar = () => {
  const { user, handleLogout } = useFirebase();
  return (
    <div>
      <div className="menubar-container">
        <div className="menubar container">
          <div className="row">
            <div className="col-md-2 col-sm-12">
              <div className="logo-img">
                <img
                  className="p-2 w-100"
                  src="https://tse2.mm.bing.net/th?id=OIP.9YA5oh83Z32MbbTSjwKGMQHaEK&pid=Api&P=0&h=180"
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-10 col-sm-12">
              <div className="menu-items text-center">
                <ul className="d-flex align-items-end justify-content-end me-5">
                  <li className="items p-2">
                    <Link className="items p-2" to="/Dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="items p-2">
                    <Link className="items p-2" to="/support">
                      Support
                    </Link>
                  </li>
                  <li className="items p-2">
                    <Link className="items p-2" to="/gatherings">
                      Gatherings
                    </Link>
                  </li>
                  <li className="items p-2">
                    <Link className="items p-2" to="/mySchedule">
                      My Schedule
                    </Link>
                  </li>

                  <Link to="/adminDashboard">
                    <button className="items btn btn-danger p-1 ">Admin</button>
                  </Link>
                  {user.email ? (
                    <Link to="/admin">
                      <button
                        onClick={handleLogout}
                        className="items btn btn-info p-1 "
                      >
                        Logout
                      </button>
                    </Link>
                  ) : (
                    <Link to="/registerVolunteer">
                      <button className="items btn btn-info p-1 ">
                        Register
                      </button>
                    </Link>
                  )}
                  <Link className="items" to="/admin">
                    <li>{user?.email}</li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
