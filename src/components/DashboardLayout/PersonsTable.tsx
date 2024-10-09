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

const PersonsTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  
  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getPersons();
      setUsers(allUsers.data);
    };
    fetchUsers();
  }, []);

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
    setEditedUser((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = async (userId: number) => {
    await updatePersonByAdmin(userId, editedUser);
    const updatedUsers = users.map((user) => (user.person_id === userId ? { ...user, ...editedUser } : user));
    setUsers(updatedUsers);
    setEditRowId(null);
    setEditedUser({});
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="editable table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>First Name</TableCell>
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
                    name="email"
                    value={editedUser.email || ""}
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
                    value={editedUser.first_name || ""}
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  user.first_name
                )}
              </TableCell>

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
