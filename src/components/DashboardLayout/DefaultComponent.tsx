import { Box, Typography } from "@mui/material"

const DefaultComponent = () => {
  return (
    <>
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
					You've got control!
				</Typography>
				<Typography
					variant='h5'
					sx={{ margin: '16px 0' }}>
					Step into your admin dashboard, where every decision is at your fingertips. Easily manage people, rooms, and reports with precision. Stay informed, stay efficient, and steer your operations towards success!
				</Typography>
			</Box>
    </>
  )
}

export default DefaultComponent