import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import appActions from "../stateConfig/actions/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/images/logo.png";

const NavBar = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.getUsersSuccess);

  const handleSelect = (e) => {
    const username = e.target.value;
    dispatch(appActions.setCurrentUser(username));
  };

  // Toggle button for mobile view
  const togglenavBar = () => {
    const navBar = document.querySelector(".navbar-collapse");
    if (navBar?.classList.contains("show")) {
      navBar?.classList.remove("show");
    } else {
      navBar?.classList.add("show");
    }
  };

  togglenavBar();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="/">
            <img
              src={logo}
              alt=""
              width="30"
              height="25"
              className="d-inline-block align-text-top me-2"
            />
            ExerTracker
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/exercises"
              >
                Exercises
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/create">
                Create Exercise Log
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/user">
                Create User
              </a>
            </li>
          </ul>
          <div className="d-flex w-25">
            <select
              className="form-select form-select-lg me-2"
              aria-label=".form-select-sm example"
              onChange={handleSelect}
            >
              {!isEmpty(users) &&
                users?.map((user) => (
                  <option key={user?._id} value={user?.username}>
                    {user?.username}
                  </option>
                ))}
              <option value="all">All</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
