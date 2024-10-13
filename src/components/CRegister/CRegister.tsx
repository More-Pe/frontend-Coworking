import { useState } from 'react';
import {
  Typography,
  Button,
  TextField,
  FormControl,
  FormHelperText,
  Box,
  Container,
  Grid,
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
      const result = await registerUser({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        startup: data.startup,
        dni: data.dni,
        phone: data.phone,
      });
      console.log('User successfully registered', result);
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', (error as Error).message);
      setError((error as Error).message);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={5} lg={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={RegisterImg}
              alt="register image"
              style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={7} lg={6}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            <Typography variant="h2">Become part of</Typography>
            <Typography variant="h1" gutterBottom>
              <strong>LAS NAVES.</strong>
            </Typography>
            <Typography variant="h3" gutterBottom>
              <span>Join the</span> <strong>innovation Hub!</strong>
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="startup"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.startup}>
                      <StartupSelect value={field.value} onChange={field.onChange} />
                      {errors.startup && (
                        <FormHelperText>{errors.startup.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'The password must be between 8 and 12 characters long',
                    },
                    maxLength: {
                      value: 12,
                      message: 'The password must be between 8 and 12 characters long',
                    },
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
            </Grid>
            <Typography sx={{ mt: 2 }}>
              Already have an account? <Link to="/login">Login here!</Link>
            </Typography>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CRegister;