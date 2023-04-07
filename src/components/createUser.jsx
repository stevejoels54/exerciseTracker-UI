import React, { useState } from "react";
import appActions from "../stateConfig/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

// Creating a user is just a single form where we provide a username no spaces and no special characters
//  then we submit the form and the user is created

const CreateUser = () => {
  const dispatch = useDispatch();
  const addUserError = useSelector((state) => state.addUserError);
  const addUserSuccess = useSelector((state) => state.addUserSuccess);
  const addUserLoading = useSelector((state) => state.addUserLoading);
  const [username, setUsername] = useState("");
  const [dataError, setDataError] = useState("");

  const onHandleSubmit = (e) => {
    e.preventDefault();
    // check if username has spaces or special characters
    if (/\s/.test(username) || /[^a-zA-Z0-9]/.test(username)) {
      setDataError(
        "Found spaces or special characters, but we removed them for you"
      );
      setUsername(username.replace(/[^a-zA-Z0-9]/g, "").toLowerCase());
    }
    // dispatch action to create user
    dispatch(appActions.addUser({ username: username }));
  };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="container">
      <h3 className="text-center mt-5 p-3">Create New User</h3>
      <div className="row justify-content-center">
        {!isEmpty(addUserError) && (
          <div
            className="alert alert-danger alert-dismissible fade show m-2"
            role="alert"
          >
            <div className="text-center">
              <strong>Error!</strong>
            </div>
            <div className="text-center">{addUserError}</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        {!isEmpty(addUserSuccess) && (
          <div
            className="alert alert-success alert-dismissible fade show m-2"
            role="alert"
          >
            <div className="text-center">
              <strong>Success!</strong>
            </div>
            <div className="text-center">{addUserSuccess}</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        {!isEmpty(dataError) && (
          <div
            className="alert alert-warning alert-dismissible fade show m-2"
            role="alert"
          >
            <div className="text-center">
              <strong>Warning!</strong>
            </div>
            <div className="text-center">{dataError}</div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        <div className="col-md-6 card mt-5" style={{ padding: "20px" }}>
          <form onSubmit={onHandleSubmit}>
            <div className="form-group mt-2">
              <label>Username: </label>
              <input
                type="text"
                required
                className="form-control"
                value={username}
                onChange={onChangeUsername}
              />
            </div>
            <div className="form-group mt-2">
              {addUserLoading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Creating...
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Create User
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
