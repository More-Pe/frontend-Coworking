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
	SelectChangeEvent,
} from '@mui/material';
import ProfileImg from '../../assets/profile-img.png';
import { getOwnProfile, updateOwnProfile } from '../../services/PersonServices';
import { useAuth } from '../../contexts/AuthContext';
import { getAllStartups } from '../../services/StartupService';


interface Startup {
	startup_id: number;
	name: string;
  }
  
  interface ProfileData {
	first_name: string;
	last_name: string;
	email: string;
	phone?: string;
	dni?: string;
	startup?: string | Startup;
  }
  
  const CProfile: React.FC = () => {
	const { token, isLoggedIn } = useAuth();
	const navigate = useNavigate();
	const [originalData, setOriginalData] = useState<ProfileData | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<ProfileData>({
	  first_name: '',
	  last_name: '',
	  email: '',
	  phone: '',
	  dni: '',
	  startup: '',
	});
  
	const [startups, setStartups] = useState<Startup[]>([]);
  
	useEffect(() => {
	  if (!isLoggedIn) {
		navigate('/login');
	  } else {
		const fetchData = async () => {
		  if (token) {
			try {
			  const profileResponse = await getOwnProfile(token);
			  if (profileResponse.success && profileResponse.data) {
				setFormData(profileResponse.data);
			  }
  
			  const startupsResponse = await getAllStartups();
			  if (startupsResponse.success && startupsResponse.data) {
				setStartups(startupsResponse.data);
			  }
			} catch (error) {
			  console.error('Error fetching data:', error);
			}
		  }
		};
		fetchData();
	  }
	}, [isLoggedIn, navigate, token]);
  
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	  const { name, value } = e.target;
	  setFormData({ ...formData, [name]: value });
	};
  
	const handleStartupChange = (event: SelectChangeEvent<number>) => {
	  const startupId = event.target.value as number;
	  const selectedStartup = startups.find(
		(startup) => startup.startup_id === startupId,
	  );
	  if (selectedStartup) {
		setFormData({
		  ...formData,
		  startup: selectedStartup.name,
		});
	  }
	};
  
	const handleEdit = () => {
	  setIsEditing(true);
	  setOriginalData(formData);
	};
  
	const handleSave = async () => {
	  try {
		if (token) {
		  const response = await updateOwnProfile(formData, token);
		  if (response.success) {
			console.log('Profile updated successfully:', response);
			setIsEditing(false);
			setOriginalData(null);
			setFormData(response.data);
		  } else {
			console.error('Error updating profile:', response.message);
		  }
		}
	  } catch (error) {
		console.error('Error updating profile:', error);
	  }
	};
  
	const handleCancel = () => {
	  if (originalData) {
		setFormData(originalData);
	  }
	  setIsEditing(false);
	  setOriginalData(null);
	};
  
	const getStartupId = (): number => {
	  if (typeof formData.startup === 'string') {
		const foundStartup = startups.find(s => s.name === formData.startup);
		return foundStartup ? foundStartup.startup_id : 0;
	  } else if (formData.startup && 'startup_id' in formData.startup) {
		return formData.startup.startup_id;
	  }
	  return 0;
	};
  
	const getStartupName = (): string => {
	  if (typeof formData.startup === 'string') {
		return formData.startup;
	  } else if (formData.startup && 'name' in formData.startup) {
		return formData.startup.name;
	  }
	  return 'No startup selected';
	};

	return (
		<Container
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 1,
				flexDirection: { xs: 'column', md: 'row' },
			}}>
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					justifyContent: { xs: 'center', md: 'center' },
				}}>
				<img
					src={ProfileImg}
					alt='profile page'
					style={{ height: '45rem' }}
				/>
			</Box>
			<Box
				sx={{
					flex: 2,
					textAlign: 'left',
					marginBottom: { xs: 4, md: 0 },
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'center',
					width: '100%',
					maxWidth: '60vw',
				}}>
				<Typography variant='h2'>This is your profile,</Typography>
				<Typography
					variant='h1'
					gutterBottom>
					<strong>{formData.first_name.toUpperCase()}.</strong>
				</Typography>

				<Typography
					variant='h3'
					gutterBottom>
					<span>Manage your</span> <strong>info!</strong>
				</Typography>
				<Box
					component='form'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						width: '100%',
					}}>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'space-between',
							width: '100%',
						}}>
						<Box sx={{ flex: '1 1 48%', mt: 1, mb: 1 }}>
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
						<Box sx={{ flex: '1 1 48%', mt: 1, mb: 1 }}>
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
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							justifyContent: 'space-between',
							width: '100%',
						}}>
						<Box sx={{ flex: '1 1 48%', mt: 1, mb: 1 }}>
							<TextField
								label='Phone'
								name='phone'
								autoComplete='phone'
								value={formData.phone || 'Input your phone number'}
								onChange={handleChange}
								disabled={!isEditing}
								fullWidth
							/>
						</Box>
						<Box sx={{ flex: '1 1 48%', mt: 1, mb: 1 }}>
							<TextField
								label='DNI/NIE'
								name='dni'
								autoComplete='dni'
								value={formData.dni || 'Input your DNI or NIE'}
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
        <FormControl fullWidth>
          <InputLabel id='startup-label'>Startup</InputLabel>
          <Select
            labelId='startup-label'
            label='Startup'
            name='startup'
            value={getStartupId()}
            onChange={handleStartupChange}
            disabled={!isEditing}
          >
            {isEditing ? (
              startups.map((startup) => (
                <MenuItem
                  key={startup.startup_id}
                  value={startup.startup_id}
                >
                  {startup.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={getStartupId()}>
                {getStartupName()}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							width: '100%',
							mt: 2,
						}}>
						{isEditing ? (
							<>
								<Button
									variant='contained'
									onClick={handleSave}
									sx={{ mr: 1 }}>
									Save
								</Button>
								<Button
									variant='outlined'
									onClick={handleCancel}>
									Cancel
								</Button>
							</>
						) : (
							<Button
								variant='contained'
								onClick={handleEdit}>
								Edit
							</Button>
						)}
					</Box>
				</Box>
			</Box>
		</Container>
	);
};

export default CProfile;
