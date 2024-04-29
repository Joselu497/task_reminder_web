import React, { useState } from "react";
import SearchField from "./search-field/searchField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UserMenu from "../usermenu/userMenu";

/**
 * Renders a toolbar with a logo, search field, and user menu.
 */
const Appbar = () => {
  const [open, setOpen] = useState(false);

  /**
   * Handles the opening of the user menu.
   */
  const handleOpenUserMenu = (open) => () => {
    setOpen(open);
  };

  return (
    <> 
      <AppBar position="fixed" elevation={0}>
        <Toolbar className="tool-bar" sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Task Reminder</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SearchField></SearchField>
            <Box className="user-button">
              <IconButton onClick={handleOpenUserMenu(true)}>
                <Tooltip title="Mi usuario">
                  <Avatar sx={{ bgcolor: "inherit" }}>
                    <AccountCircleOutlinedIcon fontSize="large" />
                  </Avatar>
                </Tooltip>
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <UserMenu open={open} handleOpenUserMenu={handleOpenUserMenu} />
    </>
  );
};

export default Appbar;
