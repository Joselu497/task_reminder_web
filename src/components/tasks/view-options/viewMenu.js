import React, { useState } from "react";
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from "@mui/material/IconButton";
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Divider } from "@mui/material";

const paginationOptions = [
  { label: "Todas", value: "-1" },
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "20", value: "20" },
];

/**
 * Provides options to filter and adjust the view of tasks.
 * @type {React.FC<{handleStatus: Function, handleCompleted: Function, handleLimit: Function}>}
 */
const ViewMenu = ({ handleStatus, handleCompleted, handleLimit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCompleted, setSelectedCompleted] = useState(false);
  const [selectedLimit, setSelectedLimit] = useState(0);
  const open = Boolean(anchorEl);

  /**
   * Opens the menu for selecting view options.
   */
  const handleOpenSelect = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handles the status filter selection.
   */
  const handleStatusClick = (event) => {
    setSelectedStatus(event.target.checked ? "upcoming" : "");
    handleStatus(event, selectedStatus);
  };

  /**
   * Handles the completed filter selection.
   */
  const handleCompletedClick = (event) => {
    setSelectedCompleted(event.target.checked ? "false" : "");
    handleCompleted(event, selectedCompleted);
  };

  /**
   * Handles the limit selection for tasks per page.
   */
  const handleLimitClick = (event, index) => {
    setSelectedLimit(index);
    handleLimit(event);
  };

  /**
   * Closes the menu for selecting view options.
   */
  const handleCloseSelect = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenSelect}>
        <TuneOutlinedIcon />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={handleCloseSelect}>
        <ListSubheader>Mostrar</ListSubheader>
        <MenuItem>
        <FormControlLabel
            control={
              <Switch
              checked={selectedStatus === "upcoming"}
              onChange={(e) => {
                handleStatusClick(e);
              }}
            />
            }
            label="Atrasadas"
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={
              <Switch
                checked={selectedCompleted === "false"}
                onChange={(e) => {
                  handleCompletedClick(e);
                }}
              />
            }
            label="Completadas"
          />
        </MenuItem>
        <Divider />
        <ListSubheader>Tareas por página</ListSubheader>
        {paginationOptions.map((option, index) => (
          <MenuItem
            key={index}
            selected={index === selectedLimit}
            value={option.value}
            onClick={(e) => {
              handleLimitClick(e, index);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ViewMenu;
