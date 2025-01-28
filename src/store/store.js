import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import weatherReducer from "./weatherSlice";
import todoReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
    todo: todoReducer,
  }
});

export default store;
