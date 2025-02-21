import { createSlice } from "@reduxjs/toolkit";

//initial state to show the active menu, show search and the active modal
const initialState = {
    showActive: 0,
    showSearch: false,
    minimize: false,
    showChatId: null,
    showModal: ""
}

const uiSlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        //function to update which menu is active
        updateActive(state, action) {
            state.showActive = action.payload;
        },
        //function to update the search menu
        updateSearch(state, action) {
            state.showSearch = action.payload;
        },
        //function to update the chat id
        updateChatId(state, action) {
            state.showChatId = action.payload;
        },
        //function to update if the sidebar should be minimized
        minimizeSidebar(state, action) {
            state.minimize = action.payload;
        },
        //function to show upload image modal
        showUploadImage(state) {
            state.showModal = "upload-post";
        },
        //function to hide uplaod image modal
        hideUploadImage(state) {
            state.showModal = "";
        },
        //function to show edit profile modal
        showEditProfile(state) {
            state.showModal = "edit-profile";
        },
        //function to hide edit profile modal
        hideEditProfile(state) {
            state.showModal = "";
        },
        //function to show new chat modal
        showNewChat(state) {
            state.showModal = "new-chat";
        },
        //function to hide new chat modal
        hideNewChat(state) {
            state.showModal = "";
        }
    }
});

const uiReducer = uiSlice.reducer;

export const uiActions = uiSlice.actions;

export default uiReducer;