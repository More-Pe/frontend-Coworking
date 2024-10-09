import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import { Edit, Check, Close } from "@mui/icons-material";
import { getAllStartups, updateStartup } from "../../services/StartupService";
import { useAuth } from "../../contexts/AuthContext";
import { Startup } from '../../types';

const StartupTable = () => {
  const { token } = useAuth();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editedStartup, setEditedStartup] = useState<Partial<Startup>>({});

  useEffect(() => {
    const fetchStartups = async () => {
        if (token) {
          try {
            const response = await getAllStartups();
            if (response && Array.isArray(response.data)) {
              setStartups(response.data); 
            } else {
              console.error("La respuesta no contiene un arreglo:", response);
              setStartups([]);
            }
          } catch (error) {
            console.error("Error fetching startups:", error);
          }
        } else {
          console.error("Token not available");
        }
      };
      fetchStartups();
  }, [token]);

  const handleEditClick = (startupId: number, startupData: Startup) => {
    setEditRowId(startupId);
    setEditedStartup(startupData);
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditedStartup({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedStartup((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = async (startupId: number) => {
    if (!token) {
      console.error("Token not available for updating startup");
      return;
    }
    try {
      await updateStartup(startupId, editedStartup, token);
      const updatedStartups = startups.map((startup) =>
        startup.startup_id === startupId ? { ...startup, ...editedStartup } : startup
      );
      setStartups(updatedStartups);
      setEditRowId(null);
      setEditedStartup({});
    } catch (error) {
      console.error("Error updating startup:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="editable table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Program</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {startups.map((startup) => (
            <TableRow key={startup.startup_id}>
              <TableCell>{startup.startup_id}</TableCell>
              <TableCell>
                {editRowId === startup.startup_id ? (
                  <TextField
                    name="name"
                    value={editedStartup.name ?? startup.name}
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  startup.name
                )}
              </TableCell>
              <TableCell>
                {editRowId === startup.startup_id ? (
                  <TextField
                    name="description"
                    value={editedStartup.description ?? startup.description} 
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  startup.description
                )}
              </TableCell>
              <TableCell>
                {editRowId === startup.startup_id ? (
                  <TextField
                    name="program"
                    value={editedStartup.program ?? startup.program} 
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  startup.program
                )}
              </TableCell>
              <TableCell>
                {editRowId === startup.startup_id ? (
                  <>
                    <IconButton onClick={() => handleSaveClick(startup.startup_id)}>
                      <Check />
                    </IconButton>
                    <IconButton onClick={handleCancelEdit}>
                      <Close />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => handleEditClick(startup.startup_id, startup)}>
                    <Edit />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StartupTable;
