import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./folders.css";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/reducers/authReducer";
import Folder from "./folder/folder";
import { useSelector } from "react-redux";
import {
  getFolders,
  deleteFolder,
  putFolder,
  postFolder,
} from "../../../api/folders";
import { toast } from "react-toastify";

/**
 * Displays a list of folders with options to add, edit, and delete folders.
 * @type {React.FC<{handleFolder: Function}>}
 */
const Folders = ({ handleFolder }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [folders, setFolders] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [newFolderFormOpen, setNewFolderFormOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(0);
  const currentUser = JSON.parse(
    useSelector((state) => state.auth.currentUser)
  );

  /**
   * Open the new folder form
   */
  const handleNewFolderFormOpen = () => {
    setNewFolderFormOpen(true);
  };

  /**
   * Close the new folder form
   */
  const handleNewFolderFormClose = () => {
    setNewFolderFormOpen(false);
  };

  /**
   * Fetch folders from the API
   */
  const fetchFolders = useCallback(async () => {
    try {
      const foldersData = await getFolders();
      setFolders(foldersData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        navigate("/login");
      } else {
        toast.error("Error al cargar carpetas.");
      }
    }
  }, [dispatch, navigate]);

  /**
   * Fetch folders and update loading status
   */
  useEffect(() => {
    fetchFolders().then(() => setIsLoading(false));
  }, [fetchFolders]);

  /**
   * Handle folder selection
   */
  const handleSelectFolder = useCallback(
    (value) => {
      setSelectedFolder(value.id || 0);
      handleFolder(value);
    },
    [handleFolder]
  );

  /**
   * Add or edit a folder
   */
  const handleAddFolder = useCallback(
    async (name, id) => {
      try {
        const body = {
          name: name,
          assigned_to: currentUser.id,
        };

        const newFolder = id
          ? await putFolder(id, body)
          : await postFolder(body);

        toast.success(`Carpeta ${id ? "editada" : "creada"}.`);

        setFolders((prevFolders) => {
          if (id) {
            return {
              ...prevFolders,
              results: prevFolders.results.map((folder) =>
                folder.id === newFolder.id ? newFolder : folder
              ),
            };
          } else {
            return {
              ...prevFolders,
              results: [...prevFolders.results, newFolder],
            };
          }
        });
      } catch (error) {
        toast.error(`Error al ${id ? "editar" : "crear"} carpeta.`);
      }
    },
    [currentUser.id]
  );

  /**
   * Handle folder deletion
   */
  const handleDeleteFolder = useCallback(
    async (folderId) => {
      if (folderId) {
        try {
          await deleteFolder(folderId);
          toast.success("Carpeta eliminada");
          setFolders((prevFolders) => ({
            ...prevFolders,
            results: prevFolders.results.filter(
              (folder) => folder.id !== folderId
            ),
          }));
          handleSelectFolder(0);
        } catch (error) {
          toast.error("Error al eliminar carpeta.");
        }
      } else {
        setNewFolderFormOpen(false);
      }
    },
    [setFolders, handleSelectFolder]
  );

  /**
   * Memoizing folders for optimization
   */
  const memoizedFolders = useMemo(() => folders, [folders]);

  return (
    <>
      <Box className="top-option-bar">
        <Typography variant="h6" mb={0}>
          Carpetas
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            disableElevation
            onClick={handleNewFolderFormOpen}
          >
            Nueva Carpeta
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mt: 1 }}></Divider>
      {isLoading ? (
        <Box className="loading">
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <List className="folder-list">
            <ListItemButton
              selected={selectedFolder === 0}
              value=""
              onClick={(e) => handleSelectFolder(0)}
              sx={{ padding: 0 }}
            >
              <CardHeader
                title={<Typography>{"Todas las tareas"}</Typography>}
              />
            </ListItemButton>
            <TransitionGroup>
              {memoizedFolders?.results?.map((folder, index) => (
                <Collapse key={index}>
                  <Divider></Divider>
                  <ListItemButton
                    selected={selectedFolder === folder.id}
                    value={folder.id}
                    onClick={(e) => handleSelectFolder(folder)}
                    sx={{ padding: 0 }}
                  >
                    <Folder
                      key={folder.id}
                      folder={folder}
                      onCreate={handleAddFolder}
                      onDelete={handleDeleteFolder}
                      isSelected={selectedFolder === folder.id}
                    />
                  </ListItemButton>
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        </Box>
      )}
      {newFolderFormOpen && (
        <>
          <Divider></Divider>
          <Folder
            isNew
            onCreate={handleAddFolder}
            onClose={handleNewFolderFormClose}
            onDelete={handleDeleteFolder}
          />
        </>
      )}
    </>
  );
};

export default Folders;
