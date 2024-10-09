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
import { getPersons, updatePersonByAdmin } from "../../services/PersonServices";
import { User } from '../../types';
import { useAuth } from "../../contexts/AuthContext";

const PersonsTable = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) { 
        try {
          const allUsers = await getPersons(token);
          setUsers(allUsers.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      } else {
        console.error("Token not available");
      }
    };
    fetchUsers();
  }, [token]);

  const handleEditClick = (userId: number, userData: User) => {
    setEditRowId(userId);
    setEditedUser(userData);
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditedUser({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = async (userId: number) => {
    try {
      await updatePersonByAdmin(userId, editedUser);
      const updatedUsers = users.map((user) => (user.person_id === userId ? { ...user, ...editedUser } : user));
      setUsers(updatedUsers);
      setEditRowId(null);
      setEditedUser({});
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="editable table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Startup</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>DNI</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.person_id}>
              <TableCell>{user.person_id}</TableCell>
              <TableCell>
                {editRowId === user.person_id ? (
                  <TextField
                    name="role"
                    value={editedUser.role || user.role}
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  user.role
                )}
              </TableCell>
              <TableCell>
                {editRowId === user.person_id ? (
                  <TextField
                    name="email"
                    value={editedUser.email || user.email}
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  user.email
                )}
              </TableCell>

              <TableCell>
                {editRowId === user.person_id ? (
                  <TextField
                    name="first_name"
                    value={editedUser.first_name || user.first_name}
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  user.first_name
                )}
              </TableCell>

              <TableCell>
                {editRowId === user.person_id ? (
                  <TextField
                    name="last_name"
                    value={editedUser.last_name || user.last_name}
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  user.last_name
                )}
              </TableCell>
              <TableCell>
                {editRowId === user.person_id ? (
                  <TextField
                    name="startup"
                    value={editedUser.startup || user.startup}
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  user.startup
                )}
              </TableCell>
              <TableCell>
                {editRowId === user.person_id ? (
                  <TextField
                    name="phone"
                    value={editedUser.phone || user.phone}
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  user.phone
                )}
              </TableCell>
              <TableCell>
                {editRowId === user.person_id ? (
                  <TextField
                    name="dni"
                    value={editedUser.dni || user.dni}
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  user.dni
                )}
              </TableCell>
              <TableCell>{user.frequency_status}</TableCell>
              <TableCell>
                {editRowId === user.person_id ? (
                  <>
                    <IconButton onClick={() => handleSaveClick(user.person_id)}>
                      <Check />
                    </IconButton>
                    <IconButton onClick={handleCancelEdit}>
                      <Close />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => handleEditClick(user.person_id, user)}>
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

export default PersonsTable;
