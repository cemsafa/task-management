import createDataContext from "./createDataContext";
import api from "../api/apiServer";

const userReducer = (state, action) => {
  switch (action.type) {
    case "get_user":
      return { user: action.payload };
    case "create_user":
      return { user: action.payload };
    default:
      return state;
  }
};

const getUser = (dispatch) => {
  return async () => {
    const response = await api.get("/users/me");
    dispatch({ type: "get_user", payload: response.data });
  };
};

const createUser = (dispatch) => {
  return async ({ name, email, password }) => {
    const response = await api.post("/users", { name, email, password });
    dispatch({ type: "create_user", payload: response.data });
  };
};

export const { Context, Provider } = createDataContext(
  userReducer,
  {
    getUser,
    createUser,
  },
  { user: null }
);
