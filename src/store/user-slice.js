import { createSlice } from "@reduxjs/toolkit";

//initial state of user information slice
const initialState = {
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    //function to store user info and accessToken if it is retreived from local storage
    fromStorage(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    //function to store user info and accessToken through login
    login(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.accessToken)
      );
    },
    //function to remove unfollowed userId from following list
    unfollow(state, action) {
      state.user.following = state.user.following.filter(
        (follow) => follow !== action.payload.userId
      );
    },
    //function to add followed userId from followed list
    follow(state, action) {
      state.user.following = [...state.user.following, action.payload.userId];
    },
  },
});

const userReducer = userSlice.reducer;

export const userActions = userSlice.actions;

export default userReducer