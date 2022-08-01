import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:3000/api/",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.common["x-auth-token"] = token;
    }
    return config;
  },
  (err) => {
    return err.message;
  }
);

export default instance;
