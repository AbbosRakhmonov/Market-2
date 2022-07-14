import axios from "axios";
const token = JSON.parse(localStorage.getItem("useData")).token;

const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;