import React, { useState } from "react";
import "./register.css";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import RequiredInput from "../../utils/required-input/requiredInput";
import { register as registerApi } from "../../../api/auth";
import { useNavigate } from "react-router-dom";

/**
 * Renders a registration form and handles the registration process.
 */
const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerApi({
        username: username,
        email: email,
        password: password,
        password2: password2,
      });
      goBack();
    } catch (error) {
      toast.error("Error al registrarse.");
    }
  };

  const goBack = () => {
    navigate("/login");
  };

  return (
    <Box className="register-container">
      <Box className="left-screen"></Box>
      <Paper variant="outlined" className="register-box">
        <Box className="register-banner">
          <AccountCircleOutlinedIcon color="primary" fontSize="large" />
          <Typography variant="h4">Registrarse</Typography>
        </Box>
        <FormControl component={"form"} onSubmit={handleSubmit}>
          <Box className="register-inputs">
            <Box mb={4}>
              <RequiredInput
                label="Usuario"
                maxLen={64}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <Box mb={4}>
              <RequiredInput
                label="Correo electrónico"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb={4}>
              <RequiredInput
                label="Contraseña"
                password
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box mb={1}>
              <RequiredInput
                label="Repetir contraseña"
                password
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Box>
          </Box>
          <Box className="register-button">
            <Button color="error" onClick={goBack}>
              <Typography>Cancelar</Typography>
            </Button>
            <Button
              type="submit"
              disabled={
                username === "" ||
                email === "" ||
                password === "" ||
                password2 === ""
              }
            >
              <Typography>Registrarse</Typography>
            </Button>
          </Box>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default Register;
