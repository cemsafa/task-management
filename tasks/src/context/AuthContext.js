import createDataContext from "./createDataContext";
import api from "../api/apiServer";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => {
  return () => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "signin", payload: token });
      navigate("TrackList");
    } else {
      navigate("Signup");
    }
  };
};

const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: "clear_error_message" });
  };
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await api.post("/signup", { email, password });
      localStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await api.post("/signin", { email, password });
      localStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};

const signout = (dispatch) => {
  return () => {
    try {
      localStorage.removeItem("token");
      dispatch({ type: "signout" });
      navigate("Signup");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign out",
      });
    }
  };
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
