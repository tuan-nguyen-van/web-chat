import { configureStore } from "@reduxjs/toolkit";
import UserNameSlice from "./UserNameSlice";

export default configureStore({
  reducer: {
    userName: UserNameSlice,
  },
});
