import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
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

const pages = ['Home'];
const settings = ['Profile', 'Logout'];

function NavBar() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
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
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>
                  <NavLink to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {page}
                  </NavLink>
                </Typography>
              </MenuItem>
            ))}

            {!isLoggedIn && (
              <>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <NavLink to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Register
                    </NavLink>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <NavLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Login
                    </NavLink>
                  </Typography>
                </MenuItem>
              </>
            )}

            {isAdmin && (
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>
                  <NavLink to="/admin-dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Admin Dashboard
                  </NavLink>
                </Typography>
              </MenuItem>
            )}
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
          {pages.map((page) => (
            <Button
              key={page}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={NavLink}
              to={`/${page.toLowerCase()}`}
            >
              {page}
            </Button>
          ))}

          {!isLoggedIn && (
            <>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={NavLink}
                to="/register"
              >
                Register
              </Button>
              <Button
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={NavLink}
                to="/login"
              >
                Login
              </Button>
            </>
          )}
          
          {isAdmin && (
            <Button
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={NavLink}
              to="/admin-dashboard"
            >
              Admin Dashboard
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
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: 'center' }}>
                  {setting === 'Logout' ? (
                    <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
                      {setting}
                    </span>
                  ) : (
                    <Link to={`/${setting.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {setting}
                    </Link>
                  )}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
