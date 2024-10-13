import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { CSurfer } from '../CSurfer/CSurfer';
import HomeImg from '../../assets/home-img.png';

const LandingPage: React.FC = () => {
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
					textAlign: 'left',
					marginBottom: { xs: 4, md: 0 },
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'center',
				}}>
				<Typography variant='h2'>Welcome to</Typography>
				<Typography
					variant='h1'
					gutterBottom>
					<strong>LAS NAVES.</strong>
				</Typography>
				<Typography
					variant='h3'
					gutterBottom>
					<span>The perfect coworking space for</span>{' '}
					<strong>innovative startups!</strong>
				</Typography>
				<Typography
					variant='h5'
					sx={{ margin: '16px 0' }}>
					✧<strong> Exclusive Access:</strong>{' '}
					<span>For authorized members only.</span>
					<br />
					✧<strong> Premium Services:</strong>{' '}
					<span>Enjoy our dining area, meeting rooms, and more.</span>
					<br />
					✧<strong> Easy Booking:</strong>{' '}
					<span>Manage your time and space with our user-friendly app.</span>
					<br />
					✧<strong> Flexible Hours:</strong>{' '}
					<span>Monday to Friday from 8:30 AM to 6:15 PM.</span>
					<br />
				</Typography>
				<Typography
					variant='h4'
					gutterBottom>
					All for free! Get started!
				</Typography>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						marginTop: 2,
					}}>
					<CSurfer
						content={
							<Button
								variant='outlined'
								color='primary'
								size='large'>
								Register
							</Button>
						}
						path='/register'></CSurfer>
					<CSurfer
						content={
							<Button
								variant='outlined'
								color='primary'
								size='large'>
								Login
							</Button>
						}
						path='/login'></CSurfer>
				</Box>
			</Box>
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					justifyContent: { xs: 'center', md: 'center' },
				}}>
				<img
					src={HomeImg}
					alt='Placeholder'
					style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }}
				/>
			</Box>
		</Container>
	);
};

export default LandingPage;
