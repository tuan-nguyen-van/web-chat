import { configureStore } from "@reduxjs/toolkit";
import userNameSlice from "./userNameSlice";

export default configureStore({
  reducer: {
    userName: userNameSlice,
  },
});
