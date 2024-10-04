import { createTheme, ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#011cb1',
      light: '#0025fd',
      dark: '#1a237e',
    },
    secondary: {
      main: '#17bfa9',
      light: '#64ffda',
      dark: '#0d7769',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;