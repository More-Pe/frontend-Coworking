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
import {
	getCurrentPeopleInRoom,
	registerEntry,
	registerExit,
} from '../../services/AccessServices';
import { getRoomById, getAllRooms } from '../../services/RoomServices';
import { Room } from '../../types';

const CRooms = () => {
	const { isVisitor, isLoggedIn, token, passport } = useAuth();
	const [rooms, setRooms] = useState<Room[]>([]);
	const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
	const [currentAccess, setCurrentAccess] = useState(0);
	const [error, setError] = useState<string | null>(null);
	const [isCheckedIn, setIsCheckedIn] = useState(false);
	const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);

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

			if (passport && currentPeopleResponse.data.people) {
				const isUserInRoom = currentPeopleResponse.data.people.some(
					(person: any) => person.person_id === passport.tokenData.person_id,
				);
				setIsCheckedIn(isUserInRoom);
				setCurrentRoomId(isUserInRoom ? roomId : null);
			}
		} catch (error) {
			console.error('Error fetching room data:', error);
			setError('Room information could not be loaded.');
		}
	};

	const handleCheckInOut = async () => {
		if (!token || !selectedRoom) return;

		try {
			if (isCheckedIn) {
				await registerExit(selectedRoom.room_id, token);
				setIsCheckedIn(false);
				setCurrentRoomId(null);
			} else {
				await registerEntry(selectedRoom.room_id, token);
				setIsCheckedIn(true);
				setCurrentRoomId(selectedRoom.room_id);
			}
			// Refresh the current access count and check user status
			const currentPeopleResponse = await getCurrentPeopleInRoom(
				selectedRoom.room_id,
			);
			setCurrentAccess(currentPeopleResponse.data.count);
			if (passport && currentPeopleResponse.data.people) {
				const isUserInRoom = currentPeopleResponse.data.people.some(
					(person: any) => person.person_id === passport.tokenData.person_id,
				);
				setIsCheckedIn(isUserInRoom);
			}
		} catch (error) {
			console.error('Error during check-in/out:', error);
			setError('Failed to check-in/out. Please try again.');
		}
	};

	return (
		<Container
			sx={{
				minWidth: '85vw',
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
					justifyContent: { xs: 'center', md: 'center' },
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
				<Typography variant='h2'>Enjoy flexibility with</Typography>
				<Typography
					variant='h1'
					gutterBottom>
					<strong>HOT DESK.</strong>
				</Typography>
				<Typography
					variant='h3'
					gutterBottom>
					<span>The perfect modality for</span>{' '}
					<strong>team players!</strong>
				</Typography>
				<Typography
					variant='h5'
					sx={{ margin: '16px 0' }}>
					<strong>Real-Time Availability</strong>:{' '}
					<span>Check room availability in real-time</span>
					<br />
					<strong>No Reservations Needed</strong>:{' '}
					<span> Just check-in and check-out.</span>
					<br />
					<strong>Authorized Access Only</strong>:{' '}
					<span> Make sure you're authorized to enjoy our spaces.</span>
					<br />
				</Typography>
				<Typography
					variant='h4'
					gutterBottom>
					Take a look!
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
						variant='outlined'
						color={isCheckedIn ? 'error' : 'success'}
						size='large'
						onClick={handleCheckInOut}>
						{isCheckedIn ? 'Check-out' : 'Check-in'}
					</Button>
				)}
				{isCheckedIn && currentRoomId !== selectedRoom?.room_id && (
					<Typography
						variant='body1'
						color='error'
						sx={{ mt: 2 }}>
						You are currently checked in to another room. Please select that
						room to check out.
					</Typography>
				)}
			</Box>
		</Container>
	);
};

export default CRooms;
