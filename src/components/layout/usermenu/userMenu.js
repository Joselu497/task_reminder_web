import "./userMenu.css";
import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/reducers/authReducer";
import { useSelector } from "react-redux";

/**
 * Renders a drawer with user information and a logout button.
 * @type {React.FC<{open: boolean, handleOpenUserMenu: Function}>}
 */
const UserMenu = ({ open, handleOpenUserMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = JSON.parse(
    useSelector((state) => state.auth.currentUser)
  );

  /**
   * Handles the logout process.
   */
  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate("/login");
    } catch (error) {}
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleOpenUserMenu(false)}>
      <Box
        className="drawer-box"
        sx={{ width: 400 }}
        onClick={handleOpenUserMenu(false)}
      >
        <Box className="user-info-box">
          <AccountCircleOutlinedIcon
            className="user-info-icon"
            fontSize="large"
            color="primary"
          />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            {" "}
            {currentUser?.username}{" "}
          </Typography>
          <Typography sx={{ marginLeft: 2 }}>{currentUser?.email}</Typography>
          <Box className="logout-button">
            <Button onClick={handleLogout} variant="outlined" size="small">
              Cerrar Sesión
            </Button>
          </Box>
        </Box>
        <Divider></Divider>
      </Box>
      <Box classname="copyright">
        <Typography
          variant="body2"
          align="center"
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            mb: 2,
          }}
        >
          Copyright&copy; {new Date().getFullYear()},{" "}
          <Link
            href="https://github.com/Joselu497"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Joselu497
          </Link>
        </Typography>
      </Box>
    </Drawer>
  );
};

export default UserMenu;
