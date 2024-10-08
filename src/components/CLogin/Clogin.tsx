import { useForm, Controller } from 'react-hook-form';
import { loginUser } from '../../services/AuthServices';
import Box from '@mui/material/Box';
import { Typography, Button, TextField } from '@mui/material';
import { FormLogin } from '../../types';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Passport, CustomJwtPayload } from '../../types';

const CLogin = () => {
  const { setSessionData } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormLogin>();

  const onSubmit = async (data: FormLogin) => {
    try {
      const response = await loginUser(data);

      if (response.success && response.token) {
        const decodedToken = jwtDecode(response.token);
        const passport: Passport = {
          token: response.token,
          tokenData: decodedToken as CustomJwtPayload,
        };
        
        setSessionData(passport);
        navigate('/profile');
      } else {
        alert(response.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      				<Typography
					variant='h2'
					gutterBottom>
					Login
				</Typography>

      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            value={field.value}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            required
            autoComplete="email" 
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'The password must be at least 8 characters long',
          },
          maxLength: {
            value: 12,
            message: 'The password must be at most 12 characters long',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            value={field.value || ''}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            required
            autoComplete="current-password"
          />
        )}
      />
      <p>
        Don't have an account yet? <Link to="/register">Sign up here!</Link>
      </p>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default CLogin;