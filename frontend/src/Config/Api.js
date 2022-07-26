import axios from "axios";
import Store from "../App/store";
import {logOut} from "../Pages/Login/loginSlice";

const instance = axios.create({
    baseURL: `http://localhost:8801/api`,
    headers: {
        "Content-Type": "application/json",
    }
});

instance.interceptors.request.use(
    config => {
        const {market} = Store.getState().login;
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData) {
            const {token} = userData;
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        if (market) {
            config.data = {
                ...config.data,
                market: market._id,
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use((response) => response, ({response: {data: {error, message}, status}}) => {
    if (!status) {
        return Promise.reject({message: "Internet mavjud emas"})
    } else if (status === 401) {
        localStorage.removeItem("useData");
        Store.dispatch(logOut(error || message));
    } else if (status === 404) {
        return Promise.reject("Bunday manzil mavjud emas !");
    } else {
        return Promise.reject(error || message);
    }
});

export default instance;