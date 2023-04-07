import React, { useEffect, useState, useRef } from "react";
import appActions from "../stateConfig/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import image from "../assets/images/excercise.png";
import { Modal } from "bootstrap";
import moment from "moment";

const ExercisesList = () => {
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.getExercisesSuccess);
  const loading = useSelector((state) => state.getExercisesLoading);
  const error = useSelector((state) => state.getExercisesError);
  const deleteLoading = useSelector((state) => state.deleteExerciseLoading);
  const updateLoading = useSelector((state) => state.updateExerciseLoading);
  const selectedUser = useSelector((state) => state.currentUser);
  const [exerciseList, setExerciseList] = useState([]);
  const [deleteID, setDeleteID] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const [editID, setEditID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username,
      description,
      duration,
      date,
    };
    dispatch(appActions.updateExercise(editID, exercise));
    hideEditModal();
  };

  useEffect(() => {
    if (isEmpty(exercises)) {
      dispatch(appActions.getExercises());
      dispatch(appActions.getUsers());
    }
  }, [dispatch, exercises]);

  useEffect(() => {
    if (exercises) {
      setExerciseList(exercises);
    }
  }, [exercises]);

  useEffect(() => {
    if (
      selectedUser !== "all" &&
      !isEmpty(exercises) &&
      !isEmpty(selectedUser)
    ) {
      const filteredExercises = exercises?.filter(
        (exercise) => exercise.username === selectedUser
      );
      setExerciseList(filteredExercises);
    } else {
      setExerciseList(exercises);
    }
  }, [selectedUser, exercises]);

  const deleteExercise = (id) => {
    dispatch(appActions.deleteExercise(id));
  };

  const modalRef = useRef();
  const editModalRef = useRef();

  const showEditModal = () => {
    const editModalEle = editModalRef.current;
    const bsEditModal = new Modal(editModalEle, {
      backdrop: "static",
      keyboard: false,
    });
    bsEditModal.show();
  };

  const hideEditModal = () => {
    const editModalEle = editModalRef.current;
    const bsEditModal = Modal.getInstance(editModalEle);
    bsEditModal.hide();
  };

  const showModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle, {
      backdrop: "static",
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = () => {
    const modalEle = modalRef.current;
    const bsModal = Modal.getInstance(modalEle);
    bsModal.hide();
  };

  return (
    <div>
      <div className="container-fluid">
        {loading ? (
          <div className="containerfluid">
            <div className="spin-border">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        ) : !isEmpty(error) ? (
          <div className="text-center mt-2">
            <div className="d-flex justify-content-center align-items-center mt-5">
              <div
                className="alert alert-warning alert-dismissible fade show"
                role="alert"
              >
                <div>
                  <strong>
                    <i className="fas fa-exclamation-triangle"></i>
                    {error?.response?.status === 404
                      ? " Not Found"
                      : "Internal Server Error"}
                  </strong>
                </div>
                <div>{error?.response?.data} </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {isEmpty(exerciseList) ? (
              <div className="text-center mt-5">
                <h3 className="p-3">No exercises found</h3>
              </div>
            ) : (
              <div>
                <div className="text-center mt-5">
                  <div className="p-3">
                    <h3>Logged Exercises</h3>
                  </div>
                </div>
                <div className="exercise-container">
                  {exerciseList?.map((exercise) => (
                    <div
                      className="card m-2"
                      style={{ width: "18rem" }}
                      key={exercise?._id}
                    >
                      <img src={image} className="card-img-top" alt="" />
                      <div className="card-body">
                        <h5 className="card-title">{exercise?.username}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {exercise?.description}
                        </h6>
                        <p className="card-text">{exercise?.duration}mins</p>
                        <p className="card-text">
                          {exercise?.date?.substring(0, 10)}
                        </p>
                        {updateLoading && editID === exercise?._id ? (
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            />
                            updating...
                          </button>
                        ) : (
                          <button
                            className="card-link btn btn-primary"
                            onClick={() => {
                              showEditModal();
                              setUsername(exercise?.username);
                              setDescription(exercise?.description);
                              setDuration(exercise?.duration);
                              setDate(
                                moment(exercise?.date).format("YYYY-MM-DD")
                              );
                              setEditID(exercise?._id);
                            }}
                          >
                            Edit
                          </button>
                        )}
                        {/* Only set delete loading for only pressed item in grid */}
                        {deleteLoading && deleteID === exercise?._id ? (
                          <button
                            className="btn btn-danger"
                            type="button"
                            disabled
                          >
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            deleting...
                          </button>
                        ) : (
                          <button
                            className="card-link btn btn-danger"
                            onClick={() => {
                              setDeleteID(exercise?._id);
                              showModal();
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {/* Confirm delete Modal */}
        <div className="modal fade" ref={modalRef} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Confirm Delete
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={hideModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this exercise?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={hideModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    deleteExercise(deleteID);
                    hideModal();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Edit Modal */}
        <div className="modal fade" ref={editModalRef} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Edit Exercise
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={hideEditModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mt-2">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>Duration (in minutes)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-2">
                    <label>Date</label>
                    <div>
                      <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <input
                      type="submit"
                      value="Edit Exercise"
                      className="btn btn-primary"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisesList;
