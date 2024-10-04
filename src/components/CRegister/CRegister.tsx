import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import { registerUser } from '../../services/AuthServices';
import { FormRegister } from '../../types';


const CRegister = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormRegister>();

  const onSubmit = async (data: FormRegister) => {
    try {
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
    } catch (error) {
      console.error('Error registering user:', (error as Error).message);
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
      <h2>Register</h2>

      <Controller
        name="firstName"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ''}
            required
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message : ''}
          />
        )}
      />

      <Controller
        name="startup"
        control={control}
        rules={{ required: 'El startup es obligatorio' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Startup"
            error={!!errors.startup}
            helperText={errors.startup ? errors.startup.message : ''}
            required
          />
        )}
      />

      <Controller
        name="dni"
        control={control}
        rules={{
          pattern: {
            value: /^[XYZ]?\d{5,8}[A-Z]$/,
            message: 'Formato de DNI inválido',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="DNI"
            error={!!errors.dni}
            helperText={errors.dni ? errors.dni.message : ''}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        rules={{
          pattern: {
            value: /^[6-9]\d{8}$/,
            message: 'Invalid phone format',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Phone"
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ''}
          />
        )}
      />

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
            helperText={errors.password ? errors.password.message : ''}
            required
          />
        )}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
};

export default CRegister;
