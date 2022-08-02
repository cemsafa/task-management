import createDataContext from "./createDataContext";
import api from "../api/apiServer";

const memberReducer = (state, action) => {
  switch (action.type) {
    case "get_member":
      return { member: action.payload };
    case "get_members":
      return { member: action.payload };
    case "create_member":
      return { member: action.payload };
    case "update_member":
      return { member: action.payload };
    case "delete_member":
      return { member: action.payload };
    default:
      return state;
  }
};

const getMembers = (dispatch) => {
  return async () => {
    const response = await api.get("/members");
    dispatch({ type: "get_members", payload: response.data });
  };
};

const getMember = (dispatch) => {
  return async ({ id }) => {
    const response = await api.get(`/members/${id}`);
    dispatch({ type: "get_member", payload: response.data });
  };
};

const createMember = (dispatch) => {
  return async ({ name, email, jobTitle, hourlyRate }) => {
    const response = await api.post("/members", {
      name,
      email,
      jobTitle,
      hourlyRate,
    });
    dispatch({ type: "create_member", payload: response.data });
  };
};

const updateMember = (dispatch) => {
  return async ({ id, name, email, jobTitle, hourlyRate }) => {
    const response = await api.put(`/members/${id}`, {
      name,
      email,
      jobTitle,
      hourlyRate,
    });
    dispatch({ type: "update_member", payload: response.data });
  };
};

const deleteMember = (dispatch) => {
  return async ({ id }) => {
    const response = await api.get(`/members/${id}`);
    dispatch({ type: "delete_member", payload: response.data });
  };
};

export const { Context, Provider } = createDataContext(
  memberReducer,
  {
    getMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember,
  },
  { member: null }
);
