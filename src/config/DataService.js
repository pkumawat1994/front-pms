import axios from "axios";

export const DataService = axios.create({
  baseURL: "http://localhost:3030/api",
});

DataService.interceptors.request.use(
  (config) => {
    const  tok =  localStorage.getItem("adminToken")
    if (tok) {
        config.headers['authorization'] = tok;
    }
    return config;
  },
 
);
