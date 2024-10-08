import { Typography, Container, Box, Button} from "@mui/material";
import RoomImg from '../../assets/hot-desk-img.png';

const CRooms = () => {
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
					Welcome to Coworking Room
				</Typography>
				<Typography
					variant='body1'
					sx={{ margin: '16px 0' }}>
					We offer this space in Hot Desk modality. The capacity is for 26 persons.
				</Typography>
                <Typography
					variant='body1'
					sx={{ margin: '16px 0' }}>
					In this moment this room is occuped by: 5 persons.
				</Typography>
				<Button
					variant='contained'
					color='primary'
					size='large'>
					Check-in
				</Button>
                {/*Here go check in or check out in function to state (logged in) of person*/}
			</Box>
		</Container>  )
}

export default CRooms