import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, TextField, Button, Container, Paper, Typography } from '@mui/material';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Profile from './components/profile/Profile';
import Projects from './components/projects/Projects';
import Contributions from './components/contributions/Contributions';
import './App.css';

// Create a theme with more professional colors and typography
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0d47a1', // Deep blue
      light: '#5472d3',
      dark: '#002171',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1e88e5', // Lighter blue
      light: '#6ab7ff',
      dark: '#005cb2',
      contrastText: '#ffffff',
    },
    success: {
      main: '#43a047',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#5f6368',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        },
        elevation2: {
          boxShadow: '0 4px 15px rgba(0,0,0,0.07)',
        },
        elevation3: {
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  const [username, setUsername] = useState(localStorage.getItem('githubUsername') || '');
  const [inputUsername, setInputUsername] = useState(username);
  const [isConfigured, setIsConfigured] = useState(!!username);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      setUsername(inputUsername);
      setIsConfigured(true);
      localStorage.setItem('githubUsername', inputUsername);
    }
  };

  if (!isConfigured) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5',
          }}
        >
          <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h4" align="center" gutterBottom>
                GitHub Portfolio
              </Typography>
              <Typography variant="body1" align="center" paragraph>
                Enter your GitHub username to view your projects and contributions
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="GitHub Username"
                  variant="outlined"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  margin="normal"
                  placeholder="e.g., octocat"
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  View Portfolio
                </Button>
              </form>
            </Paper>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            bgcolor: '#f5f5f5',
          }}
        >
          <Header />
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Profile username={username} />} />
              <Route path="/projects" element={<Projects username={username} />} />
              <Route path="/contributions" element={<Contributions username={username} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          <Footer />
          <Box sx={{ position: 'fixed', bottom: 70, right: 20, zIndex: 1000 }}>
            <Button 
              size="small" 
              variant="contained" 
              color="primary"
              onClick={() => {
                localStorage.removeItem('githubUsername');
                setIsConfigured(false);
              }}
            >
              Change Username
            </Button>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
