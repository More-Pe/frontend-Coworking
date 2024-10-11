import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Typography,
	Button,
	Container,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import ProfileImg from '../../assets/profile-img.png';
import { getOwnProfile, updateOwnProfile } from '../../services/PersonServices';
import { useAuth } from '../../contexts/AuthContext';

const CProfile = () => {
	const { token, isLoggedIn } = useAuth();
	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		startup: '',
		dni: '',
		phone: '',
	});

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/login');
		} else {
			const bringProfile = async () => {
				if (token) {
					try {
						const response = await getOwnProfile(token);
						const {
							first_name,
							last_name,
							email,
							password,
							startup,
							phone,
							dni,
						} = response.data;
						setFormData({
							first_name,
							last_name,
							email,
							password,
							startup,
							dni,
							phone,
						});
					} catch (error) {
						console.error('Error fetching profile:', error);
					}
				}
			};
			bringProfile();
		}
	}, [isLoggedIn, navigate, token]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = async () => {
		try {
			if (token) {
				const response = await updateOwnProfile(formData, token);
				console.log('Profile updated successfully:', response);
				setIsEditing(false);
			}
		} catch (error) {
			console.error('Error updating profile:', error);
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
					src={ProfileImg}
					alt='Placeholder'
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
					width: '100%',
					maxWidth: '600px',
				}}>
				<Typography variant="h2" gutterBottom>
					Hello again, {formData.first_name}!
				</Typography>
				<Typography variant='h5' sx={{ margin: '16px 0' }}>
					Log in and dive into your workspace.
				</Typography>
				<Box
					component='form'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						width: '100%',
					}}>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
						<Box sx={{ flex: '1 1 45%', mt: 1, mb: 1}}>
							<TextField
								label='First Name'
								name='first_name'
								autoComplete='first_name'
								value={formData.first_name}
								onChange={handleChange}
								disabled={!isEditing}
								fullWidth
							/>
						</Box>
						<Box sx={{ flex: '1 1 45%', mt: 1, mb: 1}}>
							<TextField
								label='Last Name'
								name='last_name'
								autoComplete='last_name'
								value={formData.last_name}
								onChange={handleChange}
								disabled={!isEditing}
								fullWidth
							/>
						</Box>
					</Box>
					<Box sx={{ width: '100%', mt: 2 }}>
						<TextField
							label='Email'
							name='email'
							autoComplete='email'
							value={formData.email}
							onChange={handleChange}
							disabled={!isEditing}
							fullWidth
						/>
					</Box>
					<Box sx={{ width: '100%', mt: 2 }}>
						<TextField
							label='Phone'
							name='phone'
							autoComplete='phone'
							value={formData.phone || 'Input yout phone number'}
							onChange={handleChange}
							disabled={!isEditing}
							fullWidth
						/>
					</Box>
					<Box sx={{ width: '100%', mt: 2 }}>
						<FormControl fullWidth>
							<InputLabel id='startup-label'>
								{formData.startup || 'Select a startup'}
							</InputLabel>
							<Select
								labelId='startup-label'
								label='Startup'
								autoComplete='startup'
								name='startup'
								value={formData.startup || ''}
								onChange={(e) =>
									handleChange(e as React.ChangeEvent<HTMLInputElement>)
								}
								disabled={!isEditing}>
								<MenuItem value='Startup 1'>Startup 1</MenuItem>
								<MenuItem value='Startup 2'>Startup 2</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ width: '100%', mt: 2 }}>
						<TextField
							label={formData.password ? 'Password' : 'Password'}
							name='password'
							autoComplete='password'
							value={formData.password}
							onChange={handleChange}
							disabled={!isEditing}
							type='password'
							fullWidth
						/>
					</Box>
          <Box sx={{ width: '100%', mt: 2 }}>
						<TextField
							label='Email'
							name='email'
							autoComplete='email'
							value={formData.email}
							onChange={handleChange}
							disabled={!isEditing}
							fullWidth
						/>
					</Box>
					<Box sx={{ width: '100%', mt: 2 }}>
						<TextField
							label='DNI/NIE'
							name='DNI/NIE'
							autoComplete='dni'
							value={formData.dni || 'Input yor DNI or NIE'}
							onChange={handleChange}
							disabled={!isEditing}
							fullWidth
						/>
					</Box>
					<Button
						variant='contained'
						onClick={isEditing ? handleSave : handleEdit}
						sx={{ mt: 2 }}>
						{isEditing ? 'Save' : 'Edit'}
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default CProfile;