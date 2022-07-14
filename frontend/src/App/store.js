import {configureStore} from "@reduxjs/toolkit";
import LoginReducer from "../Pages/Login/loginSlice";

export default configureStore({
    devTools: process.env.NODE_ENV === 'development',
    reducer: {
        login: LoginReducer
    },
});