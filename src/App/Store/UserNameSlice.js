import { createSlice } from "@reduxjs/toolkit";

export const UserNameSlice = createSlice({
  name: "userName",
  initialState: {
    name: "",
  },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserName } = UserNameSlice.actions;

export default UserNameSlice.reducer;
