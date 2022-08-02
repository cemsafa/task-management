import createDataContext from "./createDataContext";
import api from "../api/apiServer";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "get_task":
      return { task: action.payload };
    case "get_tasks":
      return { task: action.payload };
    case "create_task":
      return { task: action.payload };
    case "update_task":
      return { task: action.payload };
    case "delete_task":
      return { task: action.payload };
    default:
      return state;
  }
};

const getTasks = (dispatch) => {
  return async () => {
    const response = await api.get("/tasks");
    dispatch({ type: "get_tasks", payload: response.data });
  };
};

const getTask = (dispatch) => {
  return async ({ id }) => {
    const response = await api.get(`/tasks/${id}`);
    dispatch({ type: "get_task", payload: response.data });
  };
};

const createTask = (dispatch) => {
  return async ({ name, description, projectId }) => {
    const response = await api.post("/tasks", {
      name,
      description,
      projectId,
    });
    dispatch({ type: "create_task", payload: response.data });
  };
};

const updateTask = (dispatch) => {
  return async ({ id, name, description, projectId }) => {
    const response = await api.put(`/tasks/${id}`, {
      name,
      description,
      projectId,
    });
    dispatch({ type: "update_task", payload: response.data });
  };
};

const deleteTask = (dispatch) => {
  return async ({ id }) => {
    const response = await api.get(`/tasks/${id}`);
    dispatch({ type: "delete_task", payload: response.data });
  };
};

export const { Context, Provider } = createDataContext(
  taskReducer,
  {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
  },
  { task: null }
);
