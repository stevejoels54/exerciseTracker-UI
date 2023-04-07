import { takeLatest, fork, put } from "redux-saga/effects";
import axios from "axios";
import appActions from "../actions/actions";

function* getExercises() {
  try {
    const result = yield axios.get("http://localhost:5000/exercises");
    yield put({ type: appActions.GET_EXERCISES_SUCCESS, payload: result.data });
  } catch (error) {
    yield put({ type: appActions.GET_EXERCISES_ERROR, payload: error });
  }
}

function* watchGetExercisesRequest() {
  yield takeLatest(appActions.GET_EXERCISES_REQUEST, getExercises);
}

function* getUsers() {
  try {
    const result = yield axios.get("http://localhost:5000/users");
    yield put({ type: appActions.GET_USERS_SUCCESS, payload: result.data });
  } catch (error) {
    yield put({ type: appActions.GET_USERS_ERROR, payload: error });
  }
}

function* watchGetUsersRequest() {
  yield takeLatest(appActions.GET_USERS_REQUEST, getUsers);
}

function* addExercise(action) {
  try {
    const result = yield axios.post(
      "http://localhost:5000/exercises/add",
      action.exercise
    );
    yield put({ type: appActions.ADD_EXERCISE_SUCCESS, payload: result.data });
    yield put(appActions.getExercises());
  } catch (error) {
    yield put({ type: appActions.ADD_EXERCISE_ERROR, payload: error });
  }
}

function* watchAddExerciseRequest() {
  yield takeLatest(appActions.ADD_EXERCISE_REQUEST, addExercise);
}

function* deleteExercise(action) {
  try {
    const result = yield axios.delete(
      `http://localhost:5000/exercises/${action.id}`
    );
    yield put({
      type: appActions.DELETE_EXERCISE_SUCCESS,
      payload: result.data,
    });
    yield put(appActions.getExercises());
  } catch (error) {
    yield put({ type: appActions.DELETE_EXERCISE_ERROR, payload: error });
  }
}

function* watchDeleteExerciseRequest() {
  yield takeLatest(appActions.DELETE_EXERCISE_REQUEST, deleteExercise);
}

function* updateExercise({ id, exercise }) {
  try {
    const result = yield axios({
      url: `http://localhost:5000/exercises/update/${id}`,
      method: "post",
      data: exercise,
    });
    yield put({
      type: appActions.UPDATE_EXERCISE_SUCCESS,
      payload: result.data,
    });
    yield put(appActions.getExercises());
  } catch (error) {
    yield put({ type: appActions.UPDATE_EXERCISE_ERROR, payload: error });
  }
}

function* watchUpdateExerciseRequest() {
  yield takeLatest(appActions.UPDATE_EXERCISE_REQUEST, updateExercise);
}

function* addUser(action) {
  try {
    const result = yield axios.post(
      "http://localhost:5000/users/add",
      action.user
    );
    yield put({ type: appActions.ADD_USER_SUCCESS, payload: result.data });
    yield put(appActions.getUsers());
  } catch (error) {
    yield put({ type: appActions.ADD_USER_ERROR, payload: error });
  }
}

function* watchAddUserRequest() {
  yield takeLatest(appActions.ADD_USER_REQUEST, addUser);
}

export default function* rootSaga() {
  yield fork(watchGetExercisesRequest);
  yield fork(watchGetUsersRequest);
  yield fork(watchAddExerciseRequest);
  yield fork(watchDeleteExerciseRequest);
  yield fork(watchUpdateExerciseRequest);
  yield fork(watchAddUserRequest);
}
