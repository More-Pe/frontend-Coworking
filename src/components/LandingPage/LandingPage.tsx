import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import HomeImg from '../../assets/home-img.png';

const LandingPage: React.FC = () => {
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
					Welcome to Our Service
				</Typography>
				<Typography
					variant='body1'
					sx={{ margin: '16px 0' }}>
					We offer the best solutions to boost your business. Our platform
					provides an easy-to-use interface and a powerful set of tools to
					manage your operations effectively.
				</Typography>
				<Button
					variant='contained'
					color='primary'
					size='large'>
					Get Started
				</Button>
			</Box>
			<Box
				sx={{
					flex: 1,
					display: 'flex',
					justifyContent: { xs: 'center', md: 'flex-end' },
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
