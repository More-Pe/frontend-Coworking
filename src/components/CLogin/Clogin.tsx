import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';

interface IFormInput {
  firstName: string;
  lastName?: string;
  startup: string;
  dni?: string;
  phone?: string;
  email: string;
  password: string;
}

const CLogin = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
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
      {/* First Name */}
      <Controller
        name="firstName"
        control={control}
        rules={{ required: 'First name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ''}
            required
          />
        )}
      />

      {/* Last Name (Optional) */}
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

      {/* Startup */}
      <Controller
        name="startup"
        control={control}
        rules={{ required: 'Startup is required' }}
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

      {/* DNI (Optional) */}
      <Controller
        name="dni"
        control={control}
        rules={{
          pattern: {
            value: /^[XYZ]?\d{5,8}[A-Z]$/,
            message: 'Invalid DNI format',
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

      {/* Phone (Optional) */}
      <Controller
        name="phone"
        control={control}
        rules={{
          pattern: {
            value: /^[6-9]\d{8}$/,
            message: 'Invalid phone number format',
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

      {/* Email */}
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

      {/* Password */}
      <Controller
        name="password"
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be between 8 and 12 characters',
          },
          maxLength: {
            value: 12,
            message: 'Password must be between 8 and 12 characters',
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

      {/* Submit Button */}
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default CLogin;
