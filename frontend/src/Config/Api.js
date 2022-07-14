import axios from "axios";
const userData = JSON.parse(localStorage.getItem("useData"));

const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

axios.interceptors.request.use(
    config => {
        const token = userData.token;
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;