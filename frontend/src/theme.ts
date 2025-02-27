import { createTheme } from '@mui/material/styles';

// Import fonts in your index.css or create a separate fonts.css file
const theme = createTheme({
  palette: {
    primary: {
      main: '#69E1D9',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FF4A4A',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Uniwars, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      fontFamily: 'Uniwars, Arial, sans-serif',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      fontFamily: 'Uniwars, Arial, sans-serif',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      fontFamily: 'Uniwars, Arial, sans-serif',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      fontFamily: 'Uniwars, Arial, sans-serif',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      fontFamily: 'Uniwars, Arial, sans-serif',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      fontFamily: 'Uniwars, Arial, sans-serif',
    },
    body1: {
      fontFamily: 'JetBrains Mono, monospace',
    },
    body2: {
      fontFamily: 'JetBrains Mono, monospace',
    },
    button: {
      fontFamily: 'Uniwars, Arial, sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme; 