import React, { useState } from "react";
import "./requiredInput.css"
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/**
 * The RequiredInput component is a form input that displays an error message if the field is empty.
 * @param {string} label - The label for the input field.
 * @param {string} value - The current value of the input.
 * @param {Function} onChange - Function to handle changes in the input.
 * @param {number} maxLen - Maximum length allowed for the input.
 * @param {boolean} multiline - Flag to enable multiline input.
 * @param {boolean} password - Flag to indicate if it's a password field.
 */
const RequiredInput = ({ label, value, onChange, maxLen, multiline, password }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [requiredError, setRequiredError] = useState(false);

  /**
   * Toggle password visibility
   */ 
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  
  return (
    <FormControl className="required-input">
      <InputLabel color={requiredError ? "warning" : "primary"}>{label}</InputLabel>
      <Input
        error={requiredError}
        value={value}
        inputProps={{ maxLength: maxLen }}
        multiline={multiline}
        type={!showPassword && password ? "password" : "text"}
        onChange={(e) => {
          onChange(e);
          setRequiredError(e.target.value === "");
        }}
        endAdornment={
          password && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
        required
      />
      <FormHelperText className="error-message" color="warning">{requiredError ? "Este campo es requerido" : ""}</FormHelperText>
    </FormControl>
  );
};

export default RequiredInput;