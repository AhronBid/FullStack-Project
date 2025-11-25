import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./slices/propertiesSlice";
import loanReducer from "./slices/loanSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    loan: loanReducer,
    auth: authReducer,
  },
});

export default store;

