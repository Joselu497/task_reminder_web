import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../utils/logout";
import { getTasks, deleteTask, completeTask } from "../../api/tasks";
import Task from "./task/task";
import { toast } from "react-toastify";
import { SearchContext } from "../../routes/privateRoute";
import TaskCalendar from "./calendar/calendar";
import Folders from "./folders/folders";
import "./list.css";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AddEditDialog from "./addEdit/addEdit";
import ViewMenu from "./view-options/viewMenu";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import Pagination from "@mui/material/Pagination";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

/**
 * The Tasks component manages the display and management of tasks.
 */
const Tasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState();
  const [order, setOrder] = useState("title");
  const [limit, setLimit] = useState("-1");
  const [page, setPage] = useState(1);
  const [completed, setCompleted] = useState("false");
  const [status, setStatus] = useState("upcoming");
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [folder, setFolder] = useState();
  const searchContext = useContext(SearchContext);

  /**
   * Open the add task modal
   */
  const handleOpenAddModal = () => setOpenModal(true);
  /**
   * Close the modal
   */
  const handleCloseModal = () => setOpenModal(false);

  const selectedValue = order.startsWith("-") ? order.substring(1) : order;
  const translateOrder = {
    title: "Título",
    priority: "Prioridad",
    deadline: "Fecha límite",
  };

  /**
   * Fetch tasks from the API
   */
  const fetchTasks = useCallback(async () => {
    try {
      const offset = (page - 1) * limit;
      const tasksData = await getTasks(
        order,
        limit,
        offset,
        completed,
        status,
        searchContext.searchData,
        folder?.id
      );
      setTasks(tasksData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        onLogout(navigate, dispatch);
      } else {
        toast.error("Error al cargar tareas.");
      }
    }
  }, [
    navigate,
    dispatch,
    searchContext.searchData,
    order,
    limit,
    page,
    completed,
    status,
    folder,
  ]);

  /**
   * Fetch tasks and update loading status
   */
  useEffect(() => {
    fetchTasks().then(() => setIsLoading(false));
  }, [fetchTasks]);

  const handleTaskCreated = useCallback( async (updatedTask) => {
    setTasks((prevTasks) => {
      if (prevTasks.results.some((task) => task.id === updatedTask.id)) {
        return {
          ...prevTasks,
          results: prevTasks.results.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
          ),
        };
      } else {
        return {
          ...prevTasks,
          results: [...prevTasks.results, updatedTask],
        };
      }
    });
  }, [setTasks]);

  /**
   * Handle task deletion
   */
  const handleTaskDelete = useCallback(
    async (taskId) => {
      try {
        await deleteTask(taskId);
        toast.success("Tarea eliminada");
        setTasks((prevTasks) => ({
          ...prevTasks,
          results: prevTasks?.results.filter((task) => task.id !== taskId),
        }));
      } catch (error) {
        if (error.response && error.response.status === 401) {
          onLogout(navigate, dispatch);
        } else {
        toast.error("Error al eliminar tarea.");
        }
      }
    },
    [setTasks, navigate, dispatch]
  );

  /**
   * Handle task completion
   */
  const handleTaskCheck = useCallback(
    async (taskId) => {
      try {
        await completeTask(taskId);
        setTasks((prevTasks) => ({
          ...prevTasks,
          results: prevTasks?.results.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        }));
      } catch (error) {
        toast.error(error);
      }
    },
    [setTasks]
  );

  /**
   * Handle sorting order change
   */
  const handleOrder = useCallback(
    (event) => {
      setOrder(event.target.value);
    },
    [setOrder]
  );

  /**
   * Reverse the sorting order
   */
  const handleReverseOrder = useCallback(() => {
    setOrder((prevOrder) =>
      prevOrder.startsWith("-") ? prevOrder.substring(1) : `-${prevOrder}`
    );
  }, [setOrder]);

  /**
   * Handle page change
   */
  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    [setPage]
  );

  /**
   * Handle pagination limit change
   */
  const handleLimit = useCallback(
    (event) => {
      setLimit(event.target.value);
    },
    [setLimit]
  );

  /**
   * Handle completed tasks filter
   */
  const handleCompletedFilter = useCallback(
    (event, value) => {
      setCompleted(value);
    },
    [setCompleted]
  );

  /**
   * Handle task status filter
   */
  const handleStatusFilter = useCallback(
    (event, value) => {
      setStatus(value);
    },
    [setStatus]
  );

  /**
   * Handle folder selection
   */
  const handleFolder = useCallback(
    (value) => {
      setFolder(value);
    },
    [setFolder]
  );

  /**
   * Memoizing tasks for optimization
   */
  const memoizedTasks = useMemo(() => tasks, [tasks]);

  const pageCount = memoizedTasks?.count ? Math.ceil(tasks?.count / limit) : 0;

  return (
    <Box className="tasks-container">
      <Box className="folders">
        <Folders handleFolder={handleFolder} />
      </Box>
      <Box className="tasks">
        <Box className="option-bar">
          <Box className="top-option-bar">
            <Typography variant="h6" mb={0}>
              {!folder ? "Todas las tareas" : folder?.name}
            </Typography>
            <Box className="option-order-bar">
              <FormControl sx={{ minWidth: 140 }} size="small">
                <InputLabel>Ordenar por</InputLabel>
                <Select
                  value={order}
                  onChange={handleOrder}
                  label={"Ordenar por"}
                  renderValue={(value) => {
                    return value === ""
                      ? "Ordenar por"
                      : translateOrder[selectedValue];
                  }}
                >
                  <MenuItem value={"title"}>Título</MenuItem>
                  <MenuItem value={"-priority"}>Prioridad</MenuItem>
                  <MenuItem value={"deadline"}>Fecha límite</MenuItem>
                </Select>
              </FormControl>
              <IconButton onClick={handleReverseOrder}>
                <SwapVertOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
          <Box className="option-page-bar">
            <Pagination
              className="pagination-bar"
              count={pageCount}
              shape="rounded"
              size="small"
              page={page}
              onChange={handlePageChange}
            />
            <Box className="pagination-option">
              <ViewMenu
                handleLimit={handleLimit}
                handleCompleted={handleCompletedFilter}
                handleStatus={handleStatusFilter}
              ></ViewMenu>
            </Box>
          </Box>
        </Box>
        {isLoading ? (
          <Box className="loading">
            <CircularProgress />
          </Box>
        ) : (
          <Box className="list-box">
            {memoizedTasks?.results?.length > 0 ? (
              <Stack>
                <TransitionGroup>
                  {memoizedTasks?.results?.map((task) => (
                    <Collapse key={task.id}>
                      <Task
                        key={task.id}
                        task={task}
                        onDelete={handleTaskDelete}
                        onCheck={handleTaskCheck}
                        onEdit={handleTaskCreated}
                      />
                    </Collapse>
                  ))}
                </TransitionGroup>
              </Stack>
            ) : (
              <Typography>
                No hay tareas activas, presiona + para añadir
              </Typography>
            )}
          </Box>
        )}
        <Pagination
          className="pagination-bar"
          count={pageCount}
          shape="rounded"
          size="small"
          page={page}
          onChange={handlePageChange}
        />
        <Box className="fab-buttons">
          <Box className="add-button">
            <Tooltip title="Añadir tarea">
              <Fab color="primary" onClick={handleOpenAddModal}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <AddEditDialog
        isOpen={openModal}
        handleClose={handleCloseModal}
        currentFolderId={folder?.id}
        onCreate={handleTaskCreated}
      />
      <Box className="calendar-box">
        <TaskCalendar tasks={tasks} />
      </Box>
    </Box>
  );
};

export default Tasks;
