import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user-slice";
import uiReducer from "./ui-slice";

const store = configureStore({
  reducer: {
    userReducer: userReducer,
    ui: uiReducer
  },
});

export default store;
