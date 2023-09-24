import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Features/authSlice";
import postSlice from "./Features/postSlice";

export default configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice
    }
})