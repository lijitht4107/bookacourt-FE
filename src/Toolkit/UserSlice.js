import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  userDetails:JSON.parse(localStorage.getItem("user"))??{} ,
};

const generalSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDetails } = generalSlice.actions;
export default generalSlice.reducer;