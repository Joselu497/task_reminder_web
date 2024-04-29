import React, { useState } from "react";
import "./login.css";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import RequiredInput from "../../utils/required-input/requiredInput";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/reducers/authReducer";
import { login as loginApi } from "../../../api/auth";

/**
 * Renders a login form and handles the login process.
 */
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const token = await loginApi({ username: username, password: password });
      dispatch(login(token));
      navigate("/home");
    } catch (error) {
      toast.error("Credenciales incorrectas.");
    }
  };

  return (
    <Box className="login-container">
      <Box className="left-login-screen">
        <Box className="app-name">
          <Typography variant="h5" color="#fff">
            Bienvenido a
          </Typography>
          <Typography variant="h3" color="#fff">
            Task Reminder
          </Typography>
        </Box>
      </Box>
      <Paper variant="outlined" className="login-box">
        <Box className="login-banner">
          <AccountCircleOutlinedIcon color="primary" fontSize="large" />
          <Typography variant="h4">Iniciar Sesión</Typography>
        </Box>
        <Box className="login-inputs">
          <Box mb={4}>
            <RequiredInput
              label="Usuario"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box mb={1}>
            <RequiredInput
              label="Contraseña"
              password
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </Box>
        <Box className="login-button">
          <Button
            onClick={handleLogin}
            disabled={username === "" || password === ""}
          >
            <Typography>Iniciar Sesión</Typography>
          </Button>
        </Box>
        <Divider style={{ marginBottom: "0" }}></Divider>
        <Box className="register-link">
          <Typography>
            No tienes cuenta? <Link href="/register">{"Registrate aquí"}</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
