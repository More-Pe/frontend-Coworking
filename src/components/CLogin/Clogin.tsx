import { useForm, Controller } from 'react-hook-form';
import { loginUser } from '../../services/AuthServices';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormLogin } from '../../types';

const CLogin = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormLogin>();

  const onSubmit = async (data: FormLogin) => {
    try {
      const response = await loginUser(data);
      console.log('User successfully logged in:', response);
    } catch (error: any) {
      if (error.response) {
        console.error('Error logging:', error.response.data.message);
      } else {
        console.error('Request error:', error.message);
      }
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
      <h2>Iniciar Sesión</h2>

      <Controller
        name="email"
        control={control}
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
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
            required
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'The password must be 8 at least characters long',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
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

