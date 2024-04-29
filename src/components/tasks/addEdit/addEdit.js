import React, { useCallback, useState } from "react";
import "./addEdit.css";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import moment from "moment";
import { toast } from "react-toastify";
import { postTask, putTask } from "../../../api/tasks";
import { useSelector } from "react-redux";
import RequiredInput from "../../utils/required-input/requiredInput";
import PriorityRating from "../../utils/priority-rating/priorityRating";

/**
 * The AddEditDialog component renders a dialog for adding or editing tasks.
 * @type {React.FC<{isOpen: boolean, handleClose: Function, task: Object, currentFolderId: number, onCreate: Function}>}
 */
const AddEditDialog = ({ isOpen, handleClose, task, currentFolderId, onCreate }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [deadlineDate, setDeadlineDate] = useState(
    moment(moment(task?.deadline)) || moment()
  );
  const [deadlineTime, setDeadlineTime] = useState(
    moment(moment(task?.deadline)) || moment()
  );
  const [priority, setPriority] = useState(task?.priority || 3);
  const currentUser = JSON.parse(
    useSelector((state) => state.auth.currentUser)
  );

  /**
   * Clears the form fields.
   */
  const clearFields = useCallback(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setDeadlineDate(moment(moment(task?.deadline)) || moment());
    setDeadlineTime(moment(moment(task?.deadline)) || moment());
    setPriority(task?.priority || 3);
  }, [task?.title, task?.description, task?.deadline, task?.priority]);

  /**
   * Closes the dialog and clears the form fields.
   */
  const handleCloseDialog = () => {
    clearFields();
    handleClose();
  };

  /**
   * Handles the submission of the add task form.
   */
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const formattedDeadline = moment
        .utc(deadlineDate)
        .local()
        .set({
          hour: moment(deadlineTime).hour(),
          minute: moment(deadlineTime).minute(),
        })
        .format("YYYY-MM-DD HH:mm:ssZ");

      const body = {
        title: title,
        description: description,
        assigned_to: currentUser.id,
        deadline: formattedDeadline,
        priority: priority,
        folder_id: currentFolderId,
      };

      const newTask = task ? await putTask(task.id, body) : await postTask(body);

      onCreate(newTask)
      handleCloseDialog();
      toast.success(`Tarea ${task ? 'editada' : 'creada'}.`);
    } catch (error) {
      toast.error(`Error al ${task ? 'editar' : 'crear'} tarea.`);
    }
  };

  return (
    <Dialog
      className="add-task-dialog"
      open={isOpen}
      onClose={handleCloseDialog}
      scroll={"body"}
    >
      <Paper className="add-task-box">
        <Box className="add-task-banner">
          {task ? (
            <>
              <TaskAltOutlinedIcon fontSize="large" color="primary" />
              <DialogTitle variant="h4" sx={{ paddingLeft: 1 }}>
                Editar tarea
              </DialogTitle>
            </>
          ) : (
            <>
              <AddTaskOutlinedIcon fontSize="large" color="primary" />
              <DialogTitle variant="h4" sx={{ paddingLeft: 1 }}>
                Crear tarea
              </DialogTitle>
            </>
          )}
        </Box>
        <FormControl component={"form"} onSubmit={handleAddTask}>
          <Box className="add-task-inputs">
            <Box mb={4}>
              <RequiredInput
                label="Título"
                value={title}
                maxLen={200}
                multiline
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box mb={5}>
              <RequiredInput
                label="Descripción"
                value={description}
                multiline
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box mb={3}>
              <FormControl>
                <Box className="task-date-time-picker">
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      className="date-picker"
                      label="Fecha límite"
                      format="DD-MM-YYYY"
                      minDate={moment()}
                      value={deadlineDate}
                      onChange={(date) => setDeadlineDate(date)}
                      slotProps={{
                        textField: {
                          helperText: deadlineDate && moment(deadlineDate).isBefore(moment(), 'day') ? 'Esta tarea ya esta vencida' : '',
                        },
                      }}
                    />
                    <TimePicker
                      className="time-picker"
                      value={deadlineTime}
                      onChange={(time) => setDeadlineTime(time)}
                    />
                  </LocalizationProvider>
                </Box>
              </FormControl>
            </Box>
            <Box mb={2}>
              <PriorityRating
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
            </Box>
            <Divider></Divider>
            <Box className="add-task-button">
              <Button color="error" onClick={handleCloseDialog}>
                <Typography>Cancelar</Typography>
              </Button>
              <Button type="submit" disabled={
                (
                  title === task?.title && description === task?.description && priority === task?.priority &&
                  moment(deadlineDate).isSame(moment(task.deadline)) && moment(deadlineTime).isSame(moment(task.deadline))
                ) ||
                description === "" || title === "" ||
                moment(deadlineDate).isBefore(moment(), 'day') || 
                (moment(deadlineDate).isSame(moment(), 'day') && moment(deadlineTime).isBefore(moment()))}>
                <Typography>Aceptar</Typography>
              </Button>
            </Box>
          </Box>
        </FormControl>
      </Paper>
    </Dialog>
  );
};

export default AddEditDialog;