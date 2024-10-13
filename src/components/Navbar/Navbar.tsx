import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../../contexts/AuthContext';
import { CSurfer } from '../CSurfer/CSurfer';

function NavBar() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderNavLink = (text: string, path: string) => (
    <CSurfer
      content={
        <Button
          sx={{
            my: 2,
            color: 'black',
            display: 'block',
            position: 'relative',
            fontSize: { md: '1.1rem' },
            padding: { md: '10px 15px' },
            fontWeight: 'bold',
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
            '&::after': location.pathname === path ? {
              content: '""',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -2,
              borderRadius: '2em',
              height: '4px',
              backgroundColor: 'primary.main',
            } : {},
          }}>
          {text}
        </Button>
      }
      path={path}
    />
  );

  return (
    <AppBar position='static' sx={{ width: '100%', bgcolor: 'transparent', boxShadow: 'none' }}>
      <Toolbar disableGutters sx={{ px: 2, height: { md: '80px' } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              display: { xs: 'none', md: 'flex', xl: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 900,
              fontSize: '1.5rem',
              letterSpacing: '.3rem',
              color: 'primary.main',
              textDecoration: 'none',
              marginLeft: { md: '10%' },
              flexGrow: 1,
            }}>
            LAS NAVES
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='open menu'
              onClick={handleOpenNavMenu}
              color='primary'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
              {[
                <MenuItem key="home" onClick={handleCloseNavMenu}>{renderNavLink('Home', '/')}</MenuItem>,
                <MenuItem key="rooms" onClick={handleCloseNavMenu}>{renderNavLink('Rooms', '/rooms')}</MenuItem>,
                !isLoggedIn && <MenuItem key="login" onClick={handleCloseNavMenu}>{renderNavLink('Login', '/login')}</MenuItem>,
                !isLoggedIn && <MenuItem key="register" onClick={handleCloseNavMenu}>{renderNavLink('Register', '/register')}</MenuItem>,
                isLoggedIn && <MenuItem key="profile" onClick={handleCloseNavMenu}>{renderNavLink('Profile', '/profile')}</MenuItem>,
                isLoggedIn && isAdmin && <MenuItem key="admin" onClick={handleCloseNavMenu}>{renderNavLink('Admin Dashboard', '/admin')}</MenuItem>,
                isLoggedIn && <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>,
              ]}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant='h5'
            noWrap
            component='div'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 900,
              letterSpacing: '.3rem',
              color: 'primary.main',
              textDecoration: 'none',
            }}>
            LAS NAVES
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', xl: 'flex' }, justifyContent: 'center' }}>
            {renderNavLink('Home', '/')}
            {renderNavLink('Rooms', '/rooms')}
            {!isLoggedIn ? (
              <>
                {renderNavLink('Login', '/login')}
                {renderNavLink('Register', '/register')}
              </>
            ) : (
              <>
                {renderNavLink('Profile', '/profile')}
                {isAdmin && renderNavLink('Admin Dashboard', '/admin')}
                <Button onClick={handleLogout} sx={{ fontSize: '1.1rem', padding: '10px 15px', fontWeight: 'bold' }}>Logout</Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;