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
} from '@mui/material';
import { Edit, Check, Close, Delete } from '@mui/icons-material';
import { getAllRooms, updateRoom, deleteRoom } from '../../services/RoomServices';
import { Room } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const RoomsTable = () => {
  const { token } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editRowId, setEditRowId] = useState<number | null>(null);
  const [editedRoom, setEditedRoom] = useState<Partial<Room>>({})

  useEffect(() => {
    const fetchRooms = async () => {
      if (token) {
        try {
          const response = await getAllRooms();
          if (response && Array.isArray(response.data)) {
            setRooms(response.data);
          } else {
            console.error("La respuesta no contiene un arreglo:", response);
            setRooms([]);
          }
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      } else {
        console.error("Token not available");
      }
    };
    fetchRooms();
  }, [token]);

  const handleEditClick = (roomId: number, roomData: Room) => {
    setEditRowId(roomId);
    setEditedRoom(roomData);
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditedRoom({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedRoom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = async (roomId: number) => {
    if (!token) {
      console.error("Token not available for updating room");
      return;
    }
    try {
      await updateRoom(roomId, editedRoom, token);
      const updatedRooms = rooms.map((room) =>
        room.room_id === roomId ? { ...room, ...editedRoom } : room
      );
      setRooms(updatedRooms);
      setEditRowId(null);
      setEditedRoom({});
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  const handleDeleteClick = async (roomId: number) => {
    if (!token) {
      console.error("Token not available for deleting room");
      return;
    }
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await deleteRoom(roomId, token);
        const updatedRooms = rooms.filter((room) => room.room_id !== roomId);
        setRooms(updatedRooms);
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="editable table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Room Name</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Room Type</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.room_id}>
              <TableCell>{room.room_id}</TableCell>
              <TableCell>
                {editRowId === room.room_id ? (
                  <TextField
                    name="room_name"
                    value={editedRoom.room_name ?? room.room_name}
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  room.room_name
                )}
              </TableCell>
              <TableCell>
                {editRowId === room.room_id ? (
                  <TextField
                    name="capacity"
                    value={editedRoom.capacity ?? room.capacity}
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  room.capacity
                )}
              </TableCell>
              <TableCell>
                {editRowId === room.room_id ? (
                  <TextField
                    name="room_type"
                    value={editedRoom.room_type ?? room.room_type}
                    onChange={handleInputChange}
                    variant="standard"
                  />
                ) : (
                  room.room_type
                )}
              </TableCell>
              <TableCell>
                {editRowId === room.room_id ? (
                  <>
                    <IconButton onClick={() => handleSaveClick(room.room_id)}>
                      <Check />
                    </IconButton>
                    <IconButton onClick={handleCancelEdit}>
                      <Close />
                    </IconButton>
                  </>
                ) : (
                  <IconButton onClick={() => handleEditClick(room.room_id, room)}>
                    <Edit />
                  </IconButton>
                )}
              </ TableCell>
              <TableCell>
                <IconButton onClick={() => handleDeleteClick(room.room_id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomsTable;