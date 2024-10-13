import { useState } from 'react';
import {
  Typography,
  Button,
  TextField,
  FormControl,
  FormHelperText,
  Box,
  Container,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { registerUser } from '../../services/AuthServices';
import { FormRegister } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import RegisterImg from '../../assets/woman-left.png';
import StartupSelect from '../StartupSelect/StartupSelect';

const CRegister = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormRegister>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      startup: '',
      dni: '',
      phone: '',
    },
  });

  const onSubmit = async (data: FormRegister) => {
    try {
      setError('');
      await registerUser({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        startup: data.startup,
        dni: data.dni,
        phone: data.phone,
      });
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', (error as Error).message);
      setError((error as Error).message);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
        {/* Imagen */}
        <Box sx={{ flexBasis: '50%', display: 'flex', justifyContent: 'center', mb: { xs: 4, md: 0 } }}>
          <img
            src={RegisterImg}
            alt="register image"
            style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }}
          />
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          sx={{ flexBasis: '50%', maxWidth: '600px', mx: 'auto' }}
        >
          <Typography variant="h2">Become part of</Typography>
          <Typography variant="h1" gutterBottom>
            <strong>LAS NAVES.</strong>
          </Typography>
          <Typography variant="h3" gutterBottom>
            <span>Join the</span> <strong>innovation Hub!</strong>
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: '100%' }}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    required
                    autoComplete="given-name"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last name is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    required
                    autoComplete="family-name"
                    fullWidth
                  />
                )}
              />
            </Box>
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
                  helperText={errors.email?.message}
                  required
                  autoComplete="email"
                  fullWidth
                />
              )}
            />
            <Controller
              name="startup"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.startup}>
                  <StartupSelect value={field.value} onChange={field.onChange} />
                  {errors.startup && <FormHelperText>{errors.startup.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: { value: 8, message: 'Minimum 8 characters' },
                maxLength: { value: 12, message: 'Maximum 12 characters' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  required
                  autoComplete="new-password"
                  fullWidth
                />
              )}
            />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: '100%' }}>
              <Controller
                name="dni"
                control={control}
                rules={{
                  pattern: {
                    value: /^(?:[0-9]{8}[A-Z]|X[0-9]{7}[A-Z]|Y[0-9]{7}[A-Z]|Z[0-9]{7}[A-Z])$/,
                    message: 'Invalid DNI/NIE format',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="DNI"
                    error={!!errors.dni}
                    helperText={errors.dni?.message}
                    fullWidth
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                rules={{
                  pattern: {
                    value: /^(?:6|7|9)\d{8}$/,
                    message: 'Invalid phone number format',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    fullWidth
                  />
                )}
              />
            </Box>
          </Box>
          <Typography sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Login here!</Link>
          </Typography>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CRegister;
