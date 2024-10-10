import { useState, useEffect } from 'react';
import {
	Typography,
	Container,
	Box,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import RoomImg from '../../assets/hot-desk-img.png';
import { useAuth } from '../../contexts/AuthContext';
import { getCurrentPeopleInRoom } from '../../services/AccessServices';
import { getRoomById, getAllRooms } from '../../services/RoomServices';
import { Room } from '../../types';

const CRooms = () => {
	const { isVisitor, isLoggedIn } = useAuth();
	const [rooms, setRooms] = useState<Room[]>([]);
	const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
	const [currentAccess, setCurrentAccess] = useState(0); //Of room
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const response = await getAllRooms();
				setRooms(response.data);
			} catch (error) {
				console.error('Error fetching rooms:', error);
				setError('Rooms could not be loaded.');
			}
		};
		fetchRooms();
	}, []);

	const handleRoomSelect = async (roomId: number) => {
		try {
			const roomResponse = await getRoomById(roomId);
			setSelectedRoom(roomResponse.data);

			const currentPeopleResponse = await getCurrentPeopleInRoom(roomId);
			setCurrentAccess(currentPeopleResponse.data.count);
		} catch (error) {
			console.error('Error fetching room data:', error);
			setError('Room information could not be loaded.');
		}
	};

	return (
		<Container
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: 4,
				flexDirection: { xs: 'column', md: 'row' },
			}}>
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					justifyContent: { xs: 'center', md: 'flex-end' },
				}}>
				<img
					src={RoomImg}
					alt='Room'
					style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }}
				/>
			</Box>
			<Box
				sx={{
					flex: 1,
					textAlign: 'left',
					marginBottom: { xs: 4, md: 0 },
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'center',
				}}>
				<Typography
					variant='h2'
					gutterBottom>
					Welcome to Open Space
				</Typography>
				{error && <Typography color='error'>{error}</Typography>}
				<FormControl
					fullWidth
					sx={{ marginBottom: 2 }}>
					<InputLabel id='room-select-label'>Select a room</InputLabel>
					<Select
						labelId='room-select-label'
						value={selectedRoom?.room_id || ''}
						onChange={(e) => handleRoomSelect(Number(e.target.value))}
						label='Select a Room'>
						{Array.isArray(rooms) && rooms.length > 0 ? (
							rooms.map((room) => (
								<MenuItem
									key={room.room_id}
									value={room.room_id}>
									{room.room_name}
								</MenuItem>
							))
						) : (
							<MenuItem disabled>No rooms available</MenuItem>
						)}
					</Select>
				</FormControl>
				<Typography
					variant='h5'
					sx={{ margin: '16px 0' }}>
					{selectedRoom
						? `The ${selectedRoom.room_name} room has a capacity of ${selectedRoom.capacity} persons and is currently occupied by ${currentAccess} persons.`
						: ''}
				</Typography>
				{!isLoggedIn && (
					<Typography
						variant='h6'
						sx={{ margin: '16px 0' }}>
						To use any room, please <Link to='/login'>log in</Link> and then
						return to this page.
					</Typography>
				)}
				{isVisitor && selectedRoom && (
					<Typography
						variant='h6'
						sx={{ margin: '16px 0' }}>
						Authorization pending. Please check back later to access rooms.
					</Typography>
				)}
				{isLoggedIn && !isVisitor && selectedRoom && (
					<Button
						variant='contained'
						color='primary'
						size='large'>
						Check-in
					</Button>
				)}
			</Box>
		</Container>
	);
};

export default CRooms;
