import axios from "axios";
import store from "../store/Store";

const dataService = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  headers: {
    "Content-Type": "application/json",
  },
});

const updateAuthorizationHeader = () => {
  const { base } = store.getState();
  const token = base.token ? `Bearer ${base.token}` : null;

  dataService.defaults.headers.common["Authorization"] = token;
};

updateAuthorizationHeader();

store.subscribe(() => {
  updateAuthorizationHeader();
});

export default dataService;
