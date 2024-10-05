import { useForm, Controller } from 'react-hook-form';
import { loginUser } from '../../services/AuthServices';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormLogin } from '../../types';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const CLogin = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormLogin>();

  const onSubmit = async (data: FormLogin) => {
    try {
      const response = await loginUser(data);
      if (response.success) {
        const decodedToken = jwtDecode(response.token);
        const passport = {
          token: response.token,
          tokenData: decodedToken,
        };
        localStorage.setItem('passport', JSON.stringify(passport));
        navigate('/profile');
      } else {
        alert(response.message);
      }
    } catch (error: any) {
      console.error('Error logging in:', error);
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
      <h2>Login</h2>

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
          minLength: {
            value: 8,
            message: 'Email must be at least 8 characters long',
          },
          maxLength: {
            value: 12,
            message: 'Email must be at most 12 characters long',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            value={field.value || ''}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            required
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
          />
        )}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default CLogin;
