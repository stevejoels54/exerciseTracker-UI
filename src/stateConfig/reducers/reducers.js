import initialState from "../initialState/initialState";
import appActions from "../actions/actions";

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActions.GET_EXERCISES_REQUEST:
      return {
        ...state,
        getExercisesLoading: true,
      };
    case appActions.GET_EXERCISES_SUCCESS:
      return {
        ...state,
        getExercisesLoading: false,
        getExercisesSuccess: action.payload,
      };
    case appActions.GET_EXERCISES_ERROR:
      return {
        ...state,
        getExercisesLoading: false,
        getExercisesError: action.payload,
      };
    case appActions.GET_USERS_REQUEST:
      return {
        ...state,
        getUsersLoading: true,
      };
    case appActions.GET_USERS_SUCCESS:
      return {
        ...state,
        getUsersLoading: false,
        getUsersSuccess: action.payload,
      };
    case appActions.GET_USERS_ERROR:
      return {
        ...state,
        getUsersLoading: false,
        getUsersError: action.payload,
      };
    case appActions.ADD_EXERCISE_REQUEST:
      return {
        ...state,
        addExerciseLoading: true,
      };
    case appActions.ADD_EXERCISE_SUCCESS:
      return {
        ...state,
        addExerciseLoading: false,
        addExerciseSuccess: action.payload,
      };
    case appActions.ADD_EXERCISE_ERROR:
      return {
        ...state,
        addExerciseLoading: false,
        addExerciseError: action.payload,
      };
    case appActions.DELETE_EXERCISE_REQUEST:
      return {
        ...state,
        deleteExerciseLoading: true,
      };
    case appActions.DELETE_EXERCISE_SUCCESS:
      return {
        ...state,
        deleteExerciseLoading: false,
        deleteExerciseSuccess: action.payload,
      };
    case appActions.DELETE_EXERCISE_ERROR:
      return {
        ...state,
        deleteExerciseLoading: false,
        deleteExerciseError: action.payload,
      };
    case appActions.UPDATE_EXERCISE_REQUEST:
      return {
        ...state,
        updateExerciseLoading: true,
      };
    case appActions.UPDATE_EXERCISE_SUCCESS:
      return {
        ...state,
        updateExerciseLoading: false,
        updateExerciseSuccess: action.payload,
      };
    case appActions.UPDATE_EXERCISE_ERROR:
      return {
        ...state,
        updateExerciseLoading: false,
        updateExerciseError: action.payload,
      };
    case appActions.ADD_USER_REQUEST:
      return {
        ...state,
        addUserLoading: true,
      };
    case appActions.ADD_USER_SUCCESS:
      return {
        ...state,
        addUserLoading: false,
        addUserSuccess: action.payload,
      };
    case appActions.ADD_USER_ERROR:
      return {
        ...state,
        addUserLoading: false,
        addUserError: action.payload,
      };
    case appActions.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.user,
      };
    default:
      return state;
  }
};

export default appReducer;
