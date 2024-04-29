import React from "react";
import "./priorityRating.css"
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

/**
 * The PriorityRating component displays a priority rating with custom icons.
 * @param {number} value - The current value of the rating.
 * @param {Function} onChange - Function to handle changes in the rating.
 */
const PriorityRating = ({ value, onChange }) => {
  const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
      color: theme.palette.action.disabled,
    },
  }));

  const customIcons = {
    1: {
      color: "success",
      label: "Muy baja",
    },
    2: {
      color: "success",
      label: "Baja",
    },
    3: {
      color: "warning",
      label: "Normal",
    },
    4: {
      color: "error",
      label: "Alta",
    },
    5: {
      color: "error",
      label: "Muy alta",
    },
  };

  /**
   * Custom IconContainer component to display icons based on the value.
   * @param {Object} props - Props for the IconContainer.
   */
  function IconContainer(props) {
    const { value, ...other } = props;
    return (
      <span {...other}>
        <ErrorOutlineOutlinedIcon color={customIcons[value].color} />
      </span>
    );
  }

  return (
    <Box className="priority-input">
      <Box className="priority-label">  
        <Typography variant="subtitle2">Prioridad</Typography>
      </Box>
      <Box className="priority-rating">
        <StyledRating
          IconContainerComponent={IconContainer}
          getLabelText={(value) => customIcons[value].label}
          highlightSelectedOnly
          value={parseInt(value)}
          onChange={(value) => onChange(value)}
        />
      </Box>
    </Box>

  );
};

export default PriorityRating;
