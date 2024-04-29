import React, { useState, useEffect } from "react";
import "./task.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Typography from "@mui/material/Typography";

import AddEditDialog from "../addEdit/addEdit";
import moment from "moment";

/**
 * Represents a task item with options to edit, delete, and mark as complete.
 * @type {React.FC<{task: Object, onDelete: Function, onCheck: Function, onEdit: Function}>}
 */
const Task = ({ task, onDelete, onCheck, onEdit }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [isChecked, setIsChecked] = useState(task.completed);
  const [openModal, setOpenModal] = useState(false);

  /**
   * Opens the edit modal for the task.
   */
  const handleOpenEditModal = () => setOpenModal(true);

  /**
   * Closes the edit modal for the task.
   */
  const handleCloseModal = () => setOpenModal(false);

  const priorityIcons = {
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

  useEffect(() => {
    setIsChecked(task.completed);
  }, [task.completed]);

  /**
   * Toggles the expanded state of the task card.
   */
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /**
   * Handles marking the task as complete.
   */
  const handleComplete = () => {
    onCheck(task.id);
  };

  /**
   * Handles deleting the task.
   */
  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <>
        <Card
          style={{color: isChecked ? '#999999' : ''}}
          className="task-card"
          variant="outlined"
        >
          <CardActionArea
            onClick={handleExpandClick}
          >
            <CardHeader
              className="task-header"
              avatar={
                <Checkbox
                  color="default"
                  checked={isChecked}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleComplete();
                  }}
                />
              }
              title={
                <Box className="task-header-title">
                  <Typography className={"task-title"}>{task.title}</Typography>
                  <Tooltip
                    title={`Prioridad: ${priorityIcons[task.priority].label}`}
                  >
                    <ErrorOutlineOutlinedIcon
                      color={priorityIcons[task.priority].color}
                    />
                  </Tooltip>
                </Box>
              }
              subheader={<Typography 
                variant="subtitle2"
                color={moment(task.deadline).isBefore(moment()) ?  isChecked ? '#999999' : 'error.main' : ''}
                >{moment(task.deadline).format("DD-MM-YYYY h:mm a")}</Typography>}
            />
            </CardActionArea>
          <Collapse in={expanded} unmountOnExit>
            <Divider />
            <CardContent className="task-content" sx={{  
              '&:last-child' : {
                paddingBottom: 2
              }
              }}>
              <Typography paragraph>{task.description}</Typography>
              <Box className="task-buttons">
                <Button onClick={handleOpenEditModal}><EditOutlinedIcon /></Button>
                <Button color="error" onClick={handleDelete}>
                  <DeleteOutlineOutlinedIcon />
                </Button>
              </Box>
            </CardContent>
          </Collapse>
        </Card>
      <AddEditDialog
        isOpen={openModal}
        handleClose={handleCloseModal}
        task={task}
        onCreate={onEdit}
      />
    </>
  );
};

export default Task;
