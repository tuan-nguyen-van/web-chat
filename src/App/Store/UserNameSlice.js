import { createSlice } from "@reduxjs/toolkit";

export const userNameSlice = createSlice({
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
export const { setUserName } = userNameSlice.actions;

export default userNameSlice.reducer;
