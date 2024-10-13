import { Box, Typography, Container } from '@mui/material';
import NotFoungImg from '../../assets/not-found-img.png';

const NotFound = () => {
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
				<Typography variant='h2'>OOPS! This corner is</Typography>
				<Typography
					variant='h1'
					gutterBottom>
					<strong>EMPTY.</strong>
				</Typography>
				<Typography
					variant='h4'
					gutterBottom>
					<span>The page you're trying to visit doesn't exist. But</span> <strong>don't worry</strong><span>,
					there's still <strong>a lot to explore</strong> on our website!</span> 
				</Typography>
			</Box>
		</Container>
	);
};
export default NotFound;
