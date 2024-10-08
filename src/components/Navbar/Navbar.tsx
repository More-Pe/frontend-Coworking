import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ManageAccounts from '@mui/icons-material/ManageAccounts';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useAuth } from '../../contexts/AuthContext';
import { CSurfer } from '../CSurfer/CSurfer';

function NavBar() {
	const { isLoggedIn, isAdmin, logout } = useAuth();
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null,
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null,
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		logout();
		handleCloseUserMenu();
		navigate('/home');
	};

	return (
		<AppBar
			position='static'
			sx={{ width: '100%', bgcolor: 'transparent', boxShadow: 'none' }}>
			<Toolbar
				disableGutters
				sx={{ px: 2 }}>
				<HomeWorkIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
				<Typography
					variant='h6'
					noWrap
					component='div'
					sx={{
						mr: 2,
						display: { xs: 'none', md: 'flex' },
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.3rem',
						color: 'primary.main',
						textDecoration: 'none',
					}}>
					LAS NAVES
				</Typography>

				<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
					<IconButton
						size='large'
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						onClick={handleOpenNavMenu}
						color='inherit'>
						<MenuIcon />
					</IconButton>
					<Menu
						id='menu-appbar'
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{ display: { xs: 'block', md: 'none' } }}>
						{[
							<MenuItem
								key='home'
								onClick={handleCloseNavMenu}>
								<CSurfer
									content={
										<Typography sx={{ textAlign: 'center' }}>Home</Typography>
									}
									path='/home'
								/>
							</MenuItem>,
							!isLoggedIn && [
								<MenuItem
									key='login'
									onClick={handleCloseNavMenu}>
									<CSurfer
										content={
											<Typography sx={{ textAlign: 'center' }}>
												Login
											</Typography>
										}
										path='/login'
									/>
								</MenuItem>,
								<MenuItem
									key='register'
									onClick={handleCloseNavMenu}>
									<CSurfer
										content={
											<Typography sx={{ textAlign: 'center' }}>
												Register
											</Typography>
										}
										path='/register'
									/>
								</MenuItem>,
							],
							isLoggedIn && [
								<MenuItem
									key='profile'
									onClick={handleCloseNavMenu}>
									<CSurfer
										content={
											<Typography sx={{ textAlign: 'center' }}>
												Profile
											</Typography>
										}
										path='/profile'
									/>
								</MenuItem>,
								<MenuItem
									key='logout'
									onClick={handleLogout}>
									<Typography sx={{ textAlign: 'center' }}>Logout</Typography>
								</MenuItem>,
								isAdmin && (
									<MenuItem
										key='admin'
										onClick={handleCloseNavMenu}>
										<CSurfer
											content={
												<Typography sx={{ textAlign: 'center' }}>
													Admin Dashboard
												</Typography>
											}
											path='/admin'
										/>
									</MenuItem>
								),
							],
						]}
					</Menu>
				</Box>
				<Typography
					variant='h5'
					noWrap
					component='div'
					sx={{
						mr: 2,
						display: { xs: 'flex', md: 'none' },
						flexGrow: 1,
						fontFamily: 'monospace',
						fontWeight: 700,
						letterSpacing: '.3rem',
						color: 'primary.main',
						textDecoration: 'none',
					}}>
					LAS NAVES
				</Typography>
				<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
					<CSurfer
						content={
							<Button
								sx={{
									my: 2,
									color: 'black',
									display: 'block',
									position: 'relative',
									'&:hover::after': {
										content: '""',
										position: 'absolute',
										left: 0,
										right: 0,
										bottom: -2,
                    borderRadius: '2em',
										height: '4px',
										backgroundColor: 'primary.main',
									},
								}}>
								{' '}
								{/* Subrayado al pasar el mouse */}
								Home
							</Button>
						}
						path='/home'
					/>
					{!isLoggedIn && (
						<>
							<CSurfer
								content={
									<Button
										sx={{
											my: 2,
											color: 'black',
											display: 'block',
											position: 'relative',
											'&:hover::after': {
												content: '""',
												position: 'absolute',
												left: 0,
												right: 0,
												bottom: -2,
                        borderRadius: '2em',
                        height: '4px',
												backgroundColor: 'primary.main',
											},
										}}>
										Login
									</Button>
								}
								path='/login'
							/>
							<CSurfer
								content={
									<Button
										sx={{
											my: 2,
											color: 'black',
											display: 'block',
											position: 'relative',
											'&:hover::after': {
												content: '""',
												position: 'absolute',
												left: 0,
												right: 0,
												bottom: -2,
                        borderRadius: '2em',
                        height: '4px',												
                        backgroundColor: 'primary.main',
											},
										}}>
										Register
									</Button>
								}
								path='/register'
							/>
						</>
					)}
					{isLoggedIn && (
						<CSurfer
							content={
								<Button
									sx={{
										my: 2,
										color: 'black',
										display: 'block',
										position: 'relative',
										'&:hover::after': {
											content: '""',
											position: 'absolute',
											left: 0,
											right: 0,
											bottom: -2,
                      borderRadius: '2em',
                      height: '4px',											
                      backgroundColor: 'primary.main',
										},
									}}>
									Profile
								</Button>
							}
							path='/profile'
						/>
					)}
					{isAdmin && (
						<CSurfer
							content={
								<Button
									sx={{
										my: 2,
										color: 'black',
										display: 'block',
										position: 'relative',
										'&:hover::after': {
											content: '""',
											position: 'absolute',
											left: 0,
											right: 0,
											bottom: -2,
                      borderRadius: '2em',
                      height: '4px',											
                      backgroundColor: 'primary.main',
										},
									}}>
									Admin Dashboard
								</Button>
							}
							path='/admin'
						/>
					)}
					{isLoggedIn && (
						<Button
							sx={{
								my: 2,
								color: 'black',
								display: 'block',
								position: 'relative',
								'&:hover::after': {
									content: '""',
									position: 'absolute',
									left: 0,
									right: 0,
									bottom: -2,
                  borderRadius: '2em',
                  height: '4px',									
                  backgroundColor: 'primary.main',
								},
							}}
							onClick={handleLogout}>
							Logout
						</Button>
					)}
				</Box>
        <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'flex-end', pr: { xs: 1, sm: 4 } }}>
					{isLoggedIn && (
						<Tooltip title='Open settings'>
      <IconButton
        onClick={handleOpenUserMenu}
        size="large"
        sx={{
          p: 0,
          ml: { xs: -2, sm: -4 },
        }}
      >
        <ManageAccounts
          sx={{
            fontSize: '2rem',
            color: 'primary.main',
          }}
        /></IconButton>
						</Tooltip>
					)}
					<Menu
						sx={{ mt: '45px' }}
						id='menu-appbar'
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}>
						<MenuItem onClick={handleCloseUserMenu}>
							<CSurfer
								content={
									<Typography sx={{ textAlign: 'center' }}>Profile</Typography>
								}
								path='/profile'
							/>
						</MenuItem>
						<MenuItem onClick={handleLogout}>
							<Typography sx={{ textAlign: 'center' }}>Logout</Typography>
						</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default NavBar;
