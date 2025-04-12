import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Button, 
  Box, 
  useScrollTrigger, 
  Slide,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import InsightsIcon from '@mui/icons-material/Insights';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Hide app bar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'Projects', path: '/projects', icon: <CodeIcon /> },
    { name: 'Contributions', path: '/contributions', icon: <InsightsIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <GitHubIcon sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          GitHub Portfolio
        </Typography>
      </Box>
      <Divider />
      <List>
        {navLinks.map((link) => (
          <ListItem 
            button 
            key={link.name} 
            component={RouterLink} 
            to={link.path}
            selected={location.pathname === link.path}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              '&.Mui-selected': {
                bgcolor: 'rgba(13, 71, 161, 0.08)',
                color: 'primary.main',
                '& .MuiListItemIcon-root': {
                  color: 'primary.main',
                },
              },
              '&:hover': {
                bgcolor: 'rgba(13, 71, 161, 0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{link.icon}</ListItemIcon>
            <ListItemText primary={link.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar position="sticky" color="default" elevation={0} sx={{ 
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.09)'
        }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ py: 1 }}>
              <GitHubIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography
                variant="h6"
                noWrap
                component={RouterLink}
                to="/"
                sx={{
                  mr: 2,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '.05rem',
                  color: 'text.primary',
                  textDecoration: 'none',
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span className="gradient-text">GitHub Portfolio</span>
              </Typography>
              
              {isMobile ? (
                <IconButton
                  edge="end"
                  color="primary"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                <Box sx={{ display: 'flex' }}>
                  {navLinks.map((link) => (
                    <Button 
                      key={link.name}
                      color="inherit" 
                      component={RouterLink} 
                      to={link.path}
                      startIcon={link.icon}
                      sx={{ 
                        mx: 1,
                        fontWeight: 500,
                        color: location.pathname === link.path ? 'primary.main' : 'text.primary',
                        '&:hover': {
                          backgroundColor: 'rgba(13, 71, 161, 0.04)'
                        }
                      }}
                    >
                      {link.name}
                    </Button>
                  ))}
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;