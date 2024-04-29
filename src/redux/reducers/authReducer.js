import { createSlice } from "@reduxjs/toolkit";

/**
 * The initial state of the authentication slice.
 * @type {Object}
 * @property {boolean} authenticated - Whether the user is authenticated or not.
 * @property {boolean|null} isAdmin - Whether the user is an admin or not.
 * @property {string|null} currentUser - The current user object as a JSON string.
 */
const initialState = {
  authenticated: !!localStorage.getItem("accessToken"),
  isAdmin: JSON.parse(localStorage.getItem("currentUser"))?.isAdmin || null,
  currentUser: localStorage.getItem("currentUser") || null,
};

/**
 * The authentication slice of the Redux store.
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * The login reducer.
     * @param {string} action.payload.access - The access token.
     * @param {Object} action.payload.user - The user object.
     */
    login: (state, action) => {
      const { access } = action.payload;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("currentUser", JSON.stringify(action.payload.user));
      state.currentUser = localStorage.getItem("currentUser");
      state.authenticated = true;
      state.isAdmin = JSON.stringify(action.payload.user.isAdmin);
    },
    /**
     * The logout reducer.
     */
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      state.authenticated = false;
      state.isAdmin = false;
    },
  },
});

export const { login } = authSlice.actions;
export const { logout } = authSlice.actions;

export default authSlice.reducer;
