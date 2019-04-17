import axios from "axios";

const api = axios.create({
  baseURL: "https://dextra-lanches-backend.herokuapp.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  }
});

export default api;
