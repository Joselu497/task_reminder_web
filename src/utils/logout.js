import { logout } from "../redux/reducers/authReducer";

export const onLogout = (navigate, dispatch) => {
  dispatch(logout());
  navigate("/login");
};
