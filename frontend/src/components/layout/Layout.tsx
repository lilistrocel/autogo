import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Badge,
  IconButton,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import '@fontsource/jetbrains-mono';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/600.css';
import '@fontsource/jetbrains-mono/700.css';

interface LayoutProps {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#69E1D9',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF4A4A',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono", monospace',
    h1: { fontFamily: '"JetBrains Mono", monospace' },
    h2: { fontFamily: '"JetBrains Mono", monospace' },
    h3: { fontFamily: '"JetBrains Mono", monospace' },
    h4: { fontFamily: '"JetBrains Mono", monospace' },
    h5: { fontFamily: '"JetBrains Mono", monospace' },
    h6: { fontFamily: '"JetBrains Mono", monospace' },
    subtitle1: { fontFamily: '"JetBrains Mono", monospace' },
    subtitle2: { fontFamily: '"JetBrains Mono", monospace' },
    body1: { fontFamily: '"JetBrains Mono", monospace' },
    body2: { fontFamily: '"JetBrains Mono", monospace' },
    button: { fontFamily: '"JetBrains Mono", monospace' },
    caption: { fontFamily: '"JetBrains Mono", monospace' },
    overline: { fontFamily: '"JetBrains Mono", monospace' },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#69E1D9',
          boxShadow: '0 2px 4px rgba(105, 225, 217, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#69E1D9',
          '&:hover': {
            backgroundColor: '#5BC9C2',
          },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: '#FF4A4A',
        },
      },
    },
  },
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static" sx={{ mb: 4 }}>
          <Toolbar 
            sx={{ 
              px: { xs: 2, sm: 4 },
              minHeight: { xs: '56px', sm: '64px' },
              height: { xs: '56px', sm: '64px' }
            }}
          >
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                flexGrow: 1,
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="AutoSHOP Logo"
                sx={{
                  height: { xs: '32px', sm: '36px' },
                  mr: 2,
                  objectFit: 'contain',
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                color="inherit"
                component={RouterLink}
                to="/shops"
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '0.95rem' },
                  px: { xs: 1.5, sm: 2 },
                  fontWeight: 500,
                  letterSpacing: '0.02em'
                }}
              >
                Shops
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/admin/shops"
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '0.95rem' },
                  px: { xs: 1.5, sm: 2 },
                  fontWeight: 500,
                  letterSpacing: '0.02em'
                }}
              >
                Manage Shops
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/admin/products"
                sx={{ 
                  fontSize: { xs: '0.9rem', sm: '0.95rem' },
                  px: { xs: 1.5, sm: 2 },
                  fontWeight: 500,
                  letterSpacing: '0.02em'
                }}
              >
                Manage Products
              </Button>
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/cart"
                sx={{ 
                  ml: { xs: 0.5, sm: 1 },
                  padding: { xs: 1, sm: 1.2 }
                }}
              >
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartIcon sx={{ fontSize: { xs: '1.3rem', sm: '1.4rem' } }} />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4 }, pb: 6 }}>
          {children}
        </Container>
        <Box
          component="footer"
          sx={{
            py: 4,
            px: 2,
            mt: 'auto',
            backgroundColor: '#F8F9FA',
            borderTop: '1px solid',
            borderColor: 'rgba(105, 225, 217, 0.1)',
          }}
        >
          <Container maxWidth="lg">
            <Typography 
              variant="body2" 
              color="text.secondary" 
              align="center"
              sx={{
                fontSize: '0.85rem',
                letterSpacing: '0.02em'
              }}
            >
              © {new Date().getFullYear()} AutoSHOP. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout; 