import React, { useEffect, useState } from "react";
import appActions from "../stateConfig/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import moment from "moment";

const CreateExercise = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.getUsersSuccess);
  const addExerciseError = useSelector((state) => state.addExerciseError);
  const addExerciseSuccess = useSelector((state) => state.addExerciseSuccess);
  const addExerciseLoading = useSelector((state) => state.addExerciseLoading);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    dispatch(appActions.getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(users)) {
      setUsersList(users);
      setUsername(users[0]?.username);
    }
  }, [users]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(moment(date).format("YYYY-MM-DD"));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: moment(date).format("YYYY-MM-DD"),
    };
    console.log(exercise);
    dispatch(appActions.addExercise(exercise));
  };

  return (
    <div>
      <div className="container">
        <h3 className="text-center mt-5 p-3">Create New Exercise Log</h3>
        <div className="row justify-content-center">
          {!isEmpty(addExerciseSuccess) && (
            <div
              className="alert alert-success alert-dismissible fade show m-2"
              role="alert"
            >
              <div className="text-center">
                <strong>Success!</strong>
              </div>
              <div className="text-center">
                <p>Exercise Added Successfully</p>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          {!isEmpty(addExerciseError) && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <div className="text-center">
                <strong>Error!</strong>
              </div>
              <div className="text-center">{addExerciseError?.message}</div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          <div className="col-md-6 card mt-5" style={{ padding: "20px" }}>
            <form onSubmit={onSubmit}>
              <div className="form-group mt-2">
                <label>Username: </label>
                <select
                  required
                  className="form-control form-select"
                  value={username}
                  onChange={onChangeUsername}
                >
                  {!isEmpty(usersList) &&
                    usersList.map((user) => (
                      <option key={user?._id} value={user?.username}>
                        {user?.username}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group mt-2">
                <label>Description: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={description}
                  onChange={onChangeDescription}
                />
              </div>
              <div className="form-group mt-2">
                <label>Duration (in minutes): </label>
                <input
                  type="text"
                  className="form-control"
                  value={duration}
                  onChange={onChangeDuration}
                />
              </div>
              <div className="form-group mt-2">
                <label>Date: </label>
                <div>
                  <input
                    type={"date"}
                    className="form-control"
                    value={moment(date).format("YYYY-MM-DD")}
                    onChange={(e) => onChangeDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group mt-2">
                {addExerciseLoading ? (
                  <button className="btn btn-primary" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Creating...
                  </button>
                ) : (
                  <button className="btn btn-primary" type="submit">
                    Create Exercise Log
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExercise;
