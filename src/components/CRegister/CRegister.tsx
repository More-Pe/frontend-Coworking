import { useState } from 'react';
import {
	Typography,
	Button,
	TextField,
	MenuItem,
	InputLabel,
	FormControl,
	Select,
	FormHelperText,
	Box,
	Container,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { registerUser } from '../../services/AuthServices';
import { FormRegister } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import RegisterImg from '../../assets/woman-left.png';

const CRegister = () => {
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormRegister>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			startup: '',
			dni: '',
			phone: '',
		},
	});

	const onSubmit = async (data: FormRegister) => {
		try {
			setError('');
			const result = await registerUser({
				first_name: data.firstName,
				last_name: data.lastName,
				email: data.email,
				password: data.password,
				startup: data.startup,
				dni: data.dni,
				phone: data.phone,
			});
			console.log('User successfully registered', result);
			navigate('/login');
		} catch (error) {
			console.error('Error registering user:', (error as Error).message);
			setError((error as Error).message);
		}
	};

	const startups = [
		'Startup A',
		'Startup B',
		'Startup C',
		'Startup D',
		'Startup E',
	];

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
					src={RegisterImg}
					alt='Placeholder'
					style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }}
				/>
			</Box>
			<Box
				component='form'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100%',
					maxWidth: '600px',
				}}
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				autoComplete='off'>
				<Typography variant='h2' gutterBottom>
        Join The Community!
				</Typography>
        <Typography
					variant='body1'
					sx={{ margin: '16px 0' }}>
			Sign up now to unlock your workspace.
				</Typography>

				{error && <p style={{ color: 'red' }}>{error}</p>}

				<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
					<Box sx={{ flex: '1 1 45%', m: '1'}}>
						<Controller
							name='firstName'
							control={control}
							rules={{ required: 'First name is required' }}
							render={({ field }) => (
								<TextField
									{...field}
									label='First Name'
									error={!!errors.firstName}
									helperText={errors.firstName ? errors.firstName.message : ''}
									required
									autoComplete='given-name'
									fullWidth
								/>
							)}
						/>
					</Box>
					<Box sx={{ flex: '1 1 45%', m: '1'}}>
						<Controller
							name='lastName'
							control={control}
							rules={{ required: 'Last name is required' }}
							render={({ field }) => (
								<TextField
									{...field}
									label='Last Name'
									error={!!errors.lastName}
									helperText={errors.lastName ? errors.lastName.message : ''}
									required
									autoComplete='family-name'
									fullWidth
								/>
							)}
						/>
					</Box>
				</Box>
				<Box sx={{ width: '100%', mt: 2 }}>
					<Controller
						name='startup'
						control={control}
						defaultValue=''
						render={({ field }) => (
							<FormControl fullWidth error={!!errors.startup}>
								<InputLabel id='startup-label'>Startup</InputLabel>
								<Select
									{...field}
									labelId='startup-label'
									value={field.value || ''}
									onChange={field.onChange}>
									{startups.map((startup) => (
										<MenuItem key={startup} value={startup}>
											{startup}
										</MenuItem>
									))}
								</Select>
								{errors.startup && (
									<FormHelperText>{errors.startup.message}</FormHelperText>
								)}
							</FormControl>
						)}
					/>
				</Box>
				
				<Box sx={{ width: '100%', mt: 2 }}>
					<Controller
						name='email'
						control={control}
						rules={{
							required: 'Email is required',
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: 'Invalid email format',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Email'
								error={!!errors.email}
								helperText={errors.email ? errors.email.message : ''}
								required
								autoComplete='email'
								fullWidth
							/>
						)}
					/>
				</Box>

				<Box sx={{ width: '100%', mt: 2 }}>
					<Controller
						name='password'
						control={control}
						rules={{
							required: 'Password is required',
							minLength: {
								value: 8,
								message: 'The password must be between 8 and 12 characters long',
							},
							maxLength: {
								value: 12,
								message: 'The password must be between 8 and 12 characters long',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Password'
								type='password'
								error={!!errors.password}
								helperText={errors.password ? errors.password.message : ''}
								required
								autoComplete='new-password'
								fullWidth
							/>
						)}
					/>
				</Box>

				<Box sx={{ width: '100%', mt: 2 }}>
					<Controller
						name='dni'
						control={control}
						rules={{
							pattern: {
								value:
									/^(?:[0-9]{8}[A-Z]|X[0-9]{7}[A-Z]|Y[0-9]{7}[A-Z]|Z[0-9]{7}[A-Z])$/,
								message: 'Invalid DNI/NIE format',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='DNI'
								error={!!errors.dni}
								helperText={errors.dni ? errors.dni.message : ''}
								fullWidth
							/>
						)}
					/>
				</Box>

				<Box sx={{ width: '100%', mt: 2 }}>
					<Controller
						name='phone'
						control={control}
						rules={{
							pattern: {
								value: /^(?:6|7|9)\d{8}$/,
								message: 'Invalid phone number format',
							},
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label='Phone'
								error={!!errors.phone}
								helperText={errors.phone ? errors.phone.message : ''}
								fullWidth
							/>
						)}
					/>
				</Box>

				<Box sx={{ width: '100%', mt: 2, textAlign: 'center' }}>
					<Typography>
						Already have an account? <Link to='/login'>Login here!</Link>
					</Typography>
				</Box>
				<Button
					type='submit'
					variant='contained'
					sx={{ mt: 2 }}>
					Sign Up
				</Button>
			</Box>
		</Container>
	);
};

export default CRegister;