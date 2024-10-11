import React, { useState, useEffect } from 'react';
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
  Alert,
  AlertColor,
  SelectChangeEvent,
} from '@mui/material';
import { Edit, Check, Close, Delete } from '@mui/icons-material';
import {
  getAllStartups,
  updateStartup,
  deleteStartup,
  getStartupPrograms,
} from '../../../services/StartupService';
import { useAuth } from '../../../contexts/AuthContext';
import { Startup } from '../../../types';
import ProgramSelect from './ProgramSelect';

const StartupTable: React.FC = () => {
  const { token } = useAuth();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editedStartup, setEditedStartup] = useState<Partial<Startup>>({});
  const [programs, setPrograms] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success');

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getStartupPrograms();
        if (response && response.success) {
          setPrograms(response.data);
        } else {
          console.error('Error fetching programs:', response);
          setPrograms([]);
        }
      } catch (error) {
        console.error('Error fetching programs:', error);
        setPrograms([]);
      }
    };

    fetchPrograms();
  }, []);

  useEffect(() => {
    const fetchStartups = async () => {
      if (token) {
        try {
          const response = await getAllStartups();
          if (response && response.success && Array.isArray(response.data)) {
            setStartups(response.data);
          } else {
            console.error('La respuesta no contiene un arreglo válido:', response);
            setStartups([]);
          }
        } catch (error) {
          console.error('Error fetching startups:', error);
          setStartups([]);
        }
      } else {
        console.error('Token not available');
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

  const handleDeleteClick = async (startupId: number) => {
    if (!token) {
      setAlertMessage('Token not available for deleting startup');
      setAlertSeverity('error');
      return;
    }
    if (window.confirm('Are you sure you want to delete this startup?')) {
      try {
        await deleteStartup(startupId, token);
        setStartups(startups.filter((startup) => startup.startup_id !== startupId));
        setAlertMessage('Startup deleted successfully');
        setAlertSeverity('success');
      } catch (error) {
        console.error('Error deleting startup:', error);
        setAlertMessage('Error deleting startup');
        setAlertSeverity('error');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedStartup((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgramChange = (event: SelectChangeEvent<string>) => {
    setEditedStartup((prev) => ({ ...prev, program: event.target.value }));
  };

  const handleSaveClick = async (startupId: number) => {
    if (!token) {
      setAlertMessage('Token not available for updating startup');
      setAlertSeverity('error');
      return;
    }
    try {
      await updateStartup(startupId, editedStartup, token);
      setStartups(startups.map((startup) =>
        startup.startup_id === startupId ? { ...startup, ...editedStartup } : startup
      ));
      setEditRowId(null);
      setEditedStartup({});
      setAlertMessage('Startup updated successfully');
      setAlertSeverity('success');
    } catch (error) {
      console.error('Error updating startup:', error);
      setAlertMessage('Error updating startup');
      setAlertSeverity('error');
    }
  };

  return (
    <>
      {alertMessage && (
        <Alert
          severity={alertSeverity}
          onClose={() => setAlertMessage(null)}
          sx={{ mb: 2 }}
        >
          {alertMessage}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="editable table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Program</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
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
                    <ProgramSelect
                      programs={programs}
                      value={editedStartup.program ?? startup.program}
                      onChange={handleProgramChange}
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
                <TableCell>
                  <IconButton onClick={() => handleDeleteClick(startup.startup_id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StartupTable;