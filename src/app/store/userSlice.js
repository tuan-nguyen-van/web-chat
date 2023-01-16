import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
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
export const { setUserName } = userSlice.actions;

export default userSlice.reducer;
