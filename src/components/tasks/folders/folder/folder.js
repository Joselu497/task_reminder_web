import React, { useState } from "react";
import "./folder.css";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

/**
 * Represents a folder item with options to edit, delete, and create folders.
 * @type {React.FC<{folder: Object, onClose: Function, onCreate: Function, onDelete: Function, isNew: boolean, isSelected: boolean}>}
 */
const Folder = ({ folder, onClose, onCreate, onDelete, isNew, isSelected }) => {
  const [name, setName] = useState(folder?.name || "");
  const [isEditing, setIsEditing] = useState(isNew);
  const [isConfirmed, setIsConfirmed] = useState(false);

  /**
   * Handles the creation or editing of a folder.
   */
  const handleAddFolder = () => {
    if (name.trim().length > 0) {
      if (name !== folder?.name) {
        onCreate(name, folder?.id);;
      }
      setIsConfirmed(false);
    }
    if (isNew) {
      onClose();
    }
  }

  /**
   * Handles the deletion of a folder.
   */
  const handleDelete = () => {
    onDelete(isNew ? null : folder.id);
  }

  /**
   * Handles the start of editing a folder.
   */
  const handleEdit = () => {
    setIsEditing(true);
  }

  /**
   * Handles the confirmation of changes to a folder.
   */
  const handleConfirm = () => {
    setIsConfirmed(true);
    handleAddFolder();
    setIsEditing(false);
  }

  /**
   * Handles the cancellation of changes to a folder.
   */
  const handleCancel = () => {
    setIsEditing(false);
    setIsConfirmed(false);
    setName(folder?.name || "");
    if (isNew) {
      onClose();
    }
  };

  return (
    <>
        <CardHeader
          sx={{padding: 1.5}}
          className="folder-name"
          title={
            <InputBase
              placeholder="Nombre"
              variant="outlined"
              size="small"
              value={name}
              disabled={!isEditing}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              autoFocus
              inputProps={{ maxLength: 200 }}
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "#000000",
                  "&:hover": {
                    cursor: "pointer",
                  }
                },
              }}
            />
          }
          action={
            <Box className="button-bar" mt={0.5}>
              <IconButton
                color="primary"
                size="small"
                onClick={(e) => {
                  !isEditing && !isConfirmed ? handleEdit() : handleConfirm();
                }}
              >
                {isEditing && !isConfirmed ? (
                  <CheckOutlinedIcon />
                ) : (
                  <EditOutlinedIcon />
                )}
              </IconButton>
              <IconButton
                color="error"
                size="small"
                onClick={(e) => {
                  !isEditing && !isConfirmed ? handleDelete() : handleCancel();
                }}
              >
                {isEditing && !isConfirmed ? (
                  <CloseOutlinedIcon />
                ) : (
                  <DeleteOutlineOutlinedIcon />
                )}
              </IconButton>
            </Box>
          }
        />
    </>
  );
};

export default Folder;
