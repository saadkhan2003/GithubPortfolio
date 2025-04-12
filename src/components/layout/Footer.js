import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton, Divider, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(248, 249, 250, 0.8)' : theme.palette.grey[800],
        borderTop: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.09)',
        position: 'relative',
      }}
    >
      {/* Decorative top gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #0d47a1, #1e88e5, #0d47a1)',
        }}
      />
      
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GitHubIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="div" fontWeight={600} className="gradient-text">
                GitHub Portfolio
              </Typography>
            </Box>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 450 }}>
              Showcase your GitHub repositories in a beautiful, responsive and professional portfolio.
              Automatically syncs with your GitHub account to display your latest projects and contributions.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
              <IconButton 
                aria-label="GitHub" 
                component={Link}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: '#333', backgroundColor: 'rgba(0,0,0,0.04)' }
                }}
              >
                <GitHubIcon />
              </IconButton>
              
              <IconButton 
                aria-label="Twitter" 
                component={Link}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: '#1DA1F2', backgroundColor: 'rgba(29,161,242,0.1)' }
                }}
              >
                <TwitterIcon />
              </IconButton>
              
              <IconButton 
                aria-label="LinkedIn" 
                component={Link}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: '#0077B5', backgroundColor: 'rgba(0,119,181,0.1)' }
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                color="text.secondary"
                underline="hover"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                GitHub API
              </Link>
              <Link 
                href="https://react.dev" 
                target="_blank"
                rel="noopener noreferrer"
                color="text.secondary"
                underline="hover"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                React Documentation
              </Link>
              <Link 
                href="https://mui.com" 
                target="_blank"
                rel="noopener noreferrer"
                color="text.secondary"
                underline="hover"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                Material UI
              </Link>
              <Link 
                href="https://chartjs.org" 
                target="_blank"
                rel="noopener noreferrer"
                color="text.secondary"
                underline="hover"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                Chart.js
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              About This Project
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This portfolio showcases your GitHub repositories and contributions with a clean,
              professional interface. It automatically updates when you push new code to GitHub.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <CodeIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Built with React and Material UI
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, opacity: 0.6 }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Muhammad Saad Khan. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
            <Link href="#" color="text.secondary" underline="hover" variant="body2">
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" underline="hover" variant="body2">
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;