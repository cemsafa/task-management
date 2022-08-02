import createDataContext from "./createDataContext";
import api from "../api/apiServer";

const assignmentReducer = (state, action) => {
  switch (action.type) {
    case "get_assignment":
      return { assignment: action.payload };
    case "get_assignments":
      return { assignment: action.payload };
    case "assign":
      return { assignment: action.payload };
    case "complete":
      return { assignment: action.payload };
    default:
      return state;
  }
};

const getAssignments = (dispatch) => {
  return async () => {
    const response = await api.get("/assignments");
    dispatch({ type: "get_assignments", payload: response.data });
  };
};

const getAssignment = (dispatch) => {
  return async ({ id }) => {
    const response = await api.get(`/assignments/${id}`);
    dispatch({ type: "get_assignment", payload: response.data });
  };
};

const assign = (dispatch) => {
  return async ({ memberId, taskId }) => {
    const response = await api.post("/assignments", { memberId, taskId });
    dispatch({ type: "assign", payload: response.data });
  };
};

const complete = (dispatch) => {
  return async ({ memberId, taskId }) => {
    const response = await api.put("/completes", { memberId, taskId });
    dispatch({ type: "complete", payload: response.data });
  };
};

export const { Context, Provider } = createDataContext(
  assignmentReducer,
  {
    getAssignments,
    getAssignment,
    assign,
    complete,
  },
  { assignment: null }
);
