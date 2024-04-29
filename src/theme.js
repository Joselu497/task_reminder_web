import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00e676',
      light: '#33eb91',
      dark: '#00a152',
      contrastText: '#fff',
    },
    background: {
      default: '#f7f7f7',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif',
    ].join(','),
  },
});

export default theme;