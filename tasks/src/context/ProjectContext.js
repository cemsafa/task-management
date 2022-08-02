import createDataContext from "./createDataContext";
import api from "../api/apiServer";

const projectReducer = (state, action) => {
  switch (action.type) {
    case "get_project":
      return { project: action.payload };
    case "get_projects":
      return { project: action.payload };
    case "create_project":
      return { project: action.payload };
    case "update_project":
      return { project: action.payload };
    case "delete_project":
      return { project: action.payload };
    default:
      return state;
  }
};

const getProjects = (dispatch) => {
  return async () => {
    const response = await api.get("/projects");
    dispatch({ type: "get_projects", payload: response.data });
  };
};

const getProject = (dispatch) => {
  return async ({ id }) => {
    const response = await api.get(`/projects/${id}`);
    dispatch({ type: "get_project", payload: response.data });
  };
};

const createProject = (dispatch) => {
  return async ({ name, description }) => {
    const response = await api.post("/projects", { name, description });
    dispatch({ type: "create_project", payload: response.data });
  };
};

const updateProject = (dispatch) => {
  return async ({ id, name, description }) => {
    const response = await api.put(`/projects/${id}`, { name, description });
    dispatch({ type: "update_project", payload: response.data });
  };
};

const deleteProject = (dispatch) => {
  return async ({ id }) => {
    const response = await api.get(`/projects/${id}`);
    dispatch({ type: "delete_project", payload: response.data });
  };
};

export const { Context, Provider } = createDataContext(
  projectReducer,
  {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
  },
  { project: null }
);
