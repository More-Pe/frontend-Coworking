import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useAuth } from '../../contexts/AuthContext';
import { CSurfer } from '../CSurfer/CSurfer';

function NavBar() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
    <AppBar position="static" sx={{ width: '100%' }}>
      <Toolbar disableGutters sx={{ px: 2 }}>
        <HomeWorkIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          LAS NAVES
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
  id="menu-appbar"
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
  sx={{ display: { xs: 'block', md: 'none' } }}
>
  {[
    <MenuItem key="home" onClick={handleCloseNavMenu}>
      <CSurfer content={<Typography sx={{ textAlign: 'center' }}>Home</Typography>} path="/home" />
    </MenuItem>,
    !isLoggedIn && (
      [
        <MenuItem key="login" onClick={handleCloseNavMenu}>
          <CSurfer content={<Typography sx={{ textAlign: 'center' }}>Login</Typography>} path="/login" />
        </MenuItem>,
        <MenuItem key="register" onClick={handleCloseNavMenu}>
          <CSurfer content={<Typography sx={{ textAlign: 'center' }}>Register</Typography>} path="/register" />
        </MenuItem>,
      ]
    ),
    isLoggedIn && (
      [
        <MenuItem key="profile" onClick={handleCloseNavMenu}>
          <CSurfer content={<Typography sx={{ textAlign: 'center' }}>Profile</Typography>} path="/profile" />
        </MenuItem>,
        <MenuItem key="logout" onClick={handleLogout}>
          <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
        </MenuItem>,
        isAdmin && (
          <MenuItem key="admin" onClick={handleCloseNavMenu}>
            <CSurfer content={<Typography sx={{ textAlign: 'center' }}>Admin Dashboard</Typography>} path="/admin" />
          </MenuItem>
        ),
      ]
    ),
  ]}
</Menu>
        </Box>

        <HomeWorkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          LAS NAVES
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <CSurfer
            content={
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                Home
              </Button>
            }
            path="/home"
          />
          {!isLoggedIn && (
            <>
              <CSurfer
                content={
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    Login
                  </Button>
                }
                path="/login"
              />
              <CSurfer
                content={
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    Register
                  </Button>
                }
                path="/register"
              />
            </>
          )}
          {isLoggedIn && (
            <CSurfer
              content={
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  Profile
                </Button>
              }
              path="/profile"
            />
          )}
          {isAdmin && (
            <CSurfer
              content={
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  Admin Dashboard
                </Button>
              }
              path="/admin"
            />
          )}
          {isLoggedIn && (
            <Button
              sx={{ my: 2, color: 'white', display: 'block' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          {isLoggedIn && (
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
          )}
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
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
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <CSurfer
                content={<Typography sx={{ textAlign: 'center' }}>Profile</Typography>}
                path="/profile"
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
