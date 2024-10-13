import { Box, Typography, Container } from '@mui/material';
import NotFoungImg from '../../assets/not-found-img.png';

const NotFound = () => {
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
					src={NotFoungImg}
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
				}}>
				<Typography
					variant='h2'
					gutterBottom>
					Oops! This corner is empty...
				</Typography>
				<Typography
					variant='h5'
					sx={{ margin: '16px 0' }}>
					The page you're trying to visit doesn't exist. But don't worry,
					there's still a lot to explore on our website!
				</Typography>
			</Box>
		</Container>
	);
};
export default NotFound;
