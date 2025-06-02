import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./useslice";

const appstore = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default appstore;
