import { Box, Typography } from '@mui/material';

const DefaultComponent = () => {
	return (
		<>
			<Box
				sx={{
					flex: 2,
					textAlign: 'left',
					marginBottom: { xs: 4, md: 0 },
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'center',
				}}>
				<Typography variant='h2'>You've got</Typography>
				<Typography
					variant='h1'
					gutterBottom>
					<strong>CONTROL.</strong>
				</Typography>
				<Typography
					variant='h3'
					gutterBottom>
					<span>Manage space and get</span> <strong>reports!</strong>
				</Typography>
				<Typography
					variant='h6'
					sx={{ margin: '16px 0' }}>
					<strong>PERSONS:</strong>{' '}
					<span>
						View, edit, and delete users. To approve coworking access, change
						the role to "user".
					</span>
					<br />
					<strong>ROOMS:</strong>{' '}
					<span>
						View, edit room names, manage capacity, or delete rooms. Oversee and
						manage startups by editing or changing their programs.
					</span>
					<br />
					<strong>STARTUPS:</strong>{' '}
					<span>View, edit, reassign programs, or delete startups from the platform.</span>
					<br />
					<strong>REPORTS:</strong> <br />
					<span>
						✧ Daily Report: Includes the total number of accesses, absences, frequent and infrequent users, peak hour, room-wise access data, and a list of users with coworking access.
						<br />
						✧ Reports by Period: Generate comprehensive reports based on selected time periods for more detailed analysis. <br />✧ Monitor real-time room usage data, ensuring you stay updated on current occupancy levels and trends.
					</span>
					<br />
				</Typography>
			</Box>
		</>
	);
};

export default DefaultComponent;
