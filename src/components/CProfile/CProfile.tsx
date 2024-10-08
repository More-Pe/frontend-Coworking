import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ProfileImg from '../../assets/profile-img.png';
import { getOwnProfile, updateOwnProfile } from '../../services/PersonServices';
import { useAuth } from '../../contexts/AuthContext';

const CProfile = () => {
  const { token, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    startup: '',
    dni: '',
    phone: '',
});

useEffect(() => {
  if (!isLoggedIn) {
      navigate("/login");
  } else {
      const bringProfile = async () => {
          if (token) {
              try {
                  const response = await getOwnProfile(token);
                  const { first_name, last_name, email, password, startup, phone, dni } = response.data;
                  setFormData({
                      first_name, 
                      last_name,  
                      email,      
                      password, 
                      startup,    
                      dni,        
                      phone,      
                  });
                  console.log(response);
              } catch (error) {
                  console.error('Error fetching profile:', error);
              }
          }
      };
      bringProfile();
  }
}, [isLoggedIn, navigate, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  

  const handleSave = async () => {
    try {
      if (token) {
        const response = await updateOwnProfile(formData, token);
        console.log('Profile updated successfully:', response);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error); 
    }
  };

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
          src={ProfileImg}
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
          Profile
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label={formData.first_name}
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            disabled={!isEditing}
            sx={{ m: 1, width: '25ch' }}
          />
          <TextField
            label={formData.last_name}
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            disabled={!isEditing}
            sx={{ m: 1, width: '25ch' }}
          />
          <TextField
            label={formData.email}
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            sx={{ m: 1, width: '25ch' }}
          />
          <TextField
            label={formData.phone || "Input your phone"}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            sx={{ m: 1, width: '25ch' }}
          />
          <FormControl sx={{ m: 1, width: '25ch' }}>
            <InputLabel id="startup-label">{formData.startup || "Select a startup"} </InputLabel>
            <Select
              labelId="startup-label"
              label="Startup"
              name="startup"
              value={formData.startup}
              onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
              disabled={!isEditing}
            >
              <MenuItem value="Startup 1">Startup 1</MenuItem>
              <MenuItem value="Startup 2">Startup 2</MenuItem>
              {/* ... */}
            </Select>
          </FormControl>
          <TextField
            label={formData.password ? "Password" : "Password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={!isEditing}
            type="password"
            sx={{ m: 1, width: '25ch' }}
          />
          <TextField
            label={formData.dni || "Input yout DNI/NIE"}
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            disabled={!isEditing}
            sx={{ m: 1, width: '25ch' }}
          />
          <Button variant="contained" onClick={isEditing ? handleSave : handleEdit} sx={{ mt: 2 }}>
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default CProfile;