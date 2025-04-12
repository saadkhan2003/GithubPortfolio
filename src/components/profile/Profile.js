import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Avatar, 
  Typography, 
  Paper, 
  Container, 
  Grid, 
  Chip, 
  Link, 
  Skeleton,
  Divider,
  Card,
  CardContent,
  LinearProgress,
  Button
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CodeIcon from '@mui/icons-material/Code';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import InsightsIcon from '@mui/icons-material/Insights';
import githubService from '../../services/githubService';

const Profile = ({ username }) => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        // Fetch profile and stats in parallel
        const [profileData, statsData] = await Promise.all([
          githubService.getUserProfile(username),
          githubService.getUserStats(username)
        ]);
        
        setProfile(profileData);
        setStats(statsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile data. Please check the username.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProfileData();
  }, [username]);

  // Get top programming languages based on repo count
  const getTopLanguages = () => {
    if (!stats || !stats.languages) return [];
    
    return Object.entries(stats.languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  // Get color for language
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Python: '#3572A5',
      Java: '#b07219',
      'C#': '#178600',
      PHP: '#4F5D95',
      Go: '#00ADD8',
      Ruby: '#701516',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Rust: '#dea584',
      Dart: '#00B4AB',
      // Add more languages as needed
    };
    return colors[language] || '#8E949E'; // Default color
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 4, 
              mb: 4, 
              borderRadius: 3, 
              background: 'linear-gradient(135deg, rgba(13, 71, 161, 0.05) 0%, rgba(33, 150, 243, 0.05) 100%)'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
              <Skeleton 
                variant="circular" 
                width={140} 
                height={140} 
                animation="wave" 
                sx={{ flexShrink: 0 }}
              />
              
              <Box sx={{ width: '100%' }}>
                <Skeleton variant="text" height={60} width="60%" animation="wave" />
                <Skeleton variant="text" height={30} width="40%" animation="wave" />
                <Skeleton variant="text" height={25} width="80%" animation="wave" />
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  <Skeleton variant="rounded" height={32} width={100} animation="wave" />
                  <Skeleton variant="rounded" height={32} width={100} animation="wave" />
                  <Skeleton variant="rounded" height={32} width={100} animation="wave" />
                </Box>
              </Box>
            </Box>
          </Paper>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 3 }}>
                <Skeleton variant="text" height={40} width="60%" animation="wave" />
                <Skeleton variant="text" height={20} width="90%" animation="wave" />
                <Skeleton variant="text" height={20} width="95%" animation="wave" />
                <Skeleton variant="text" height={20} width="80%" animation="wave" />
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 3 }}>
                <Skeleton variant="text" height={40} width="80%" animation="wave" />
                <Box sx={{ mt: 2 }}>
                  <Skeleton variant="text" height={25} width="100%" animation="wave" />
                  <Skeleton variant="rectangular" height={10} width="70%" animation="wave" sx={{ my: 1 }} />
                  <Skeleton variant="text" height={25} width="100%" animation="wave" />
                  <Skeleton variant="rectangular" height={10} width="40%" animation="wave" sx={{ my: 1 }} />
                  <Skeleton variant="text" height={25} width="100%" animation="wave" />
                  <Skeleton variant="rectangular" height={10} width="60%" animation="wave" sx={{ my: 1 }} />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
            <Typography variant="h5" color="error" gutterBottom>
              {error}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Please check the username and try again.
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Profile Header Section */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 3,
            backgroundImage: 'linear-gradient(135deg, rgba(13, 71, 161, 0.05) 0%, rgba(33, 150, 243, 0.05) 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Pattern */}
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              right: 0,
              width: '40%',
              height: '100%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10.5%) 0 0, radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10.5%) 8px 8px',
              backgroundSize: '16px 16px',
              opacity: 0.3,
              zIndex: 0
            }}
          />
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4, position: 'relative', zIndex: 1 }}>
            <Avatar
              src={profile?.avatar_url}
              alt={profile?.name || profile?.login}
              className="profile-avatar"
              sx={{
                width: 140,
                height: 140,
                border: '4px solid white',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                flexShrink: 0
              }}
            />
            
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { sm: 'space-between' }, alignItems: { xs: 'flex-start', sm: 'center' } }}>
                <Box>
                  <Typography variant="h3" fontWeight="bold" className="gradient-text" gutterBottom>
                    {profile?.name || profile?.login}
                  </Typography>
                  
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    @{profile?.login}
                  </Typography>
                </Box>
                
                <Button 
                  variant="outlined" 
                  color="primary" 
                  startIcon={<GitHubIcon />}
                  component={Link}
                  href={profile?.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: { xs: 1, sm: 0 }, borderRadius: 6, px: 2 }}
                >
                  View on GitHub
                </Button>
              </Box>
              
              {profile?.bio && (
                <Typography variant="body1" paragraph sx={{ mt: 1 }}>
                  {profile.bio}
                </Typography>
              )}
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {profile?.location && (
                  <Chip 
                    icon={<LocationOnIcon />} 
                    label={profile.location} 
                    variant="outlined" 
                    color="primary"
                    sx={{ borderRadius: 4 }}
                  />
                )}
                
                {profile?.email && (
                  <Chip 
                    icon={<EmailIcon />} 
                    label={profile.email} 
                    variant="outlined" 
                    color="primary"
                    component={Link}
                    href={`mailto:${profile.email}`}
                    clickable
                    sx={{ borderRadius: 4 }}
                  />
                )}
                
                {profile?.blog && (
                  <Chip 
                    icon={<LinkIcon />} 
                    label="Website" 
                    variant="outlined" 
                    color="primary"
                    component={Link}
                    href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    clickable
                    sx={{ borderRadius: 4 }}
                  />
                )}
                
                {profile?.twitter_username && (
                  <Chip 
                    icon={<TwitterIcon />} 
                    label={`@${profile.twitter_username}`} 
                    variant="outlined" 
                    color="primary"
                    component={Link}
                    href={`https://twitter.com/${profile.twitter_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    clickable
                    sx={{ borderRadius: 4 }}
                  />
                )}
              </Box>
              
              {/* GitHub Stats Cards */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6} sm={3}>
                  <Card sx={{ 
                    height: '100%', 
                    textAlign: 'center', 
                    background: 'rgba(255, 255, 255, 0.6)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                    }
                  }}>
                    <CardContent sx={{ p: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <FolderOpenIcon color="primary" sx={{ mb: 0.5 }} />
                        <Typography variant="h5" fontWeight="bold">{profile?.public_repos || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">Repositories</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <Card sx={{ 
                    height: '100%', 
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.6)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                    }
                  }}>
                    <CardContent sx={{ p: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <PeopleIcon color="primary" sx={{ mb: 0.5 }} />
                        <Typography variant="h5" fontWeight="bold">{profile?.followers || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">Followers</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <Card sx={{ 
                    height: '100%', 
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.6)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                    }
                  }}>
                    <CardContent sx={{ p: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <PersonAddIcon color="primary" sx={{ mb: 0.5 }} />
                        <Typography variant="h5" fontWeight="bold">{profile?.following || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">Following</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                  <Card sx={{ 
                    height: '100%', 
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.6)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                    }
                  }}>
                    <CardContent sx={{ p: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <StarIcon color="primary" sx={{ mb: 0.5 }} />
                        <Typography variant="h5" fontWeight="bold">{stats?.totalStars || 0}</Typography>
                        <Typography variant="body2" color="text.secondary">Stars</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
        
        {/* Additional Info Section */}
        <Grid container spacing={3}>
          {/* User Info */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom className="gradient-text">
                <InsightsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Activity Overview
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Card sx={{ 
                      mb: 2, 
                      background: 'rgba(13, 71, 161, 0.03)',
                      border: '1px solid rgba(13, 71, 161, 0.1)',
                      '&:hover': {
                        background: 'rgba(13, 71, 161, 0.05)',
                      }
                    }}>
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            Repositories
                          </Typography>
                          <FolderOpenIcon fontSize="small" color="primary" />
                        </Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                          {profile?.public_repos || 0}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Card sx={{ 
                      mb: 2, 
                      background: 'rgba(13, 71, 161, 0.03)',
                      border: '1px solid rgba(13, 71, 161, 0.1)',
                      '&:hover': {
                        background: 'rgba(13, 71, 161, 0.05)',
                      }
                    }}>
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            Stars Received
                          </Typography>
                          <StarIcon fontSize="small" color="primary" />
                        </Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                          {stats?.totalStars || 0}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Card sx={{ 
                      mb: 2, 
                      background: 'rgba(13, 71, 161, 0.03)',
                      border: '1px solid rgba(13, 71, 161, 0.1)',
                      '&:hover': {
                        background: 'rgba(13, 71, 161, 0.05)',
                      }
                    }}>
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            Forks Received
                          </Typography>
                          <ForkRightIcon fontSize="small" color="primary" />
                        </Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                          {stats?.totalForks || 0}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Most Popular Repositories
                </Typography>
                
                {stats?.starsPerRepo && stats.starsPerRepo.length > 0 ? (
                  <Box>
                    {stats.starsPerRepo.slice(0, 3).map((repo) => (
                      <Box key={repo.name} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1" fontWeight="500">
                            {repo.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StarIcon fontSize="small" color="secondary" />
                            <Typography variant="body2" sx={{ ml: 0.5 }}>
                              {repo.stars}
                            </Typography>
                          </Box>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={Math.min(100, (repo.stars / (stats.starsPerRepo[0].stars || 1)) * 100)} 
                          color="secondary"
                          sx={{ 
                            mt: 1, 
                            height: 6, 
                            borderRadius: 3,
                            backgroundColor: 'rgba(0,0,0,0.05)'
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No starred repositories found.
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>
          
          {/* Languages */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom className="gradient-text">
                <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Languages
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {getTopLanguages().length > 0 ? (
                  getTopLanguages().map(([language, count]) => (
                    <Box key={language} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box 
                            sx={{ 
                              width: 12, 
                              height: 12, 
                              borderRadius: '50%',
                              backgroundColor: getLanguageColor(language),
                              mr: 1
                            }}
                          />
                          <Typography variant="body1">
                            {language}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {count} {count === 1 ? 'repo' : 'repos'}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={Math.min(100, (count / getTopLanguages()[0][1]) * 100)} 
                        sx={{ 
                          mt: 1, 
                          height: 6, 
                          borderRadius: 3,
                          backgroundColor: 'rgba(0,0,0,0.05)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getLanguageColor(language)
                          }
                        }}
                      />
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No language data available.
                  </Typography>
                )}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              {profile?.created_at && (
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    GitHub Stats
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Joined GitHub
                    </Typography>
                    <Typography variant="body2">
                      {new Date(profile.created_at).toLocaleDateString(undefined, { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </Typography>
                  </Box>
                  
                  {profile?.company && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Company
                      </Typography>
                      <Typography variant="body2">
                        {profile.company}
                      </Typography>
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Watchers
                    </Typography>
                    <Typography variant="body2">
                      {stats?.totalWatchers || 0}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;