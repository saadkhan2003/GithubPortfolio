import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Chip, 
  Skeleton,
  Link,
  Divider,
  Paper,
  IconButton,
  InputAdornment,
  TextField,
  Tabs,
  Tab,
  Menu,
  MenuItem
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import CodeIcon from '@mui/icons-material/Code';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UpdateIcon from '@mui/icons-material/Update';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import LaunchIcon from '@mui/icons-material/Launch';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FolderIcon from '@mui/icons-material/Folder';
import githubService from '../../services/githubService';

// Helper function to format dates
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper to get language color
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

const Projects = ({ username }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] =useState(null);
  const [tabValue, setTabValue] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('updated'); // 'updated', 'stars', 'name'
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc', 'desc'
  const [languageFilter, setLanguageFilter] = useState('all');
  const [bookmarkedProjects, setBookmarkedProjects] = useState(
    JSON.parse(localStorage.getItem('bookmarkedProjects') || '[]')
  );

  // Effect to fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await githubService.getUserRepos(username);
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load projects. Please try again.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchProjects();
  }, [username]);

  // Extract unique languages for the filter
  const languages = React.useMemo(() => {
    const langs = new Set(projects.filter(p => p.language).map(p => p.language));
    return ['all', ...Array.from(langs)].filter(Boolean);
  }, [projects]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...projects];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.name.toLowerCase().includes(query) || 
        (project.description && project.description.toLowerCase().includes(query))
      );
    }
    
    // Filter by tab
    if (tabValue === 'bookmarked') {
      result = result.filter(project => 
        bookmarkedProjects.includes(project.id)
      );
    } else if (tabValue === 'forked') {
      result = result.filter(project => project.fork);
    } else if (tabValue === 'source') {
      result = result.filter(project => !project.fork);
    }
    
    // Filter by language
    if (languageFilter !== 'all') {
      result = result.filter(project => project.language === languageFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'updated') {
        comparison = new Date(b.updated_at) - new Date(a.updated_at);
      } else if (sortBy === 'stars') {
        comparison = b.stargazers_count - a.stargazers_count;
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      }
      
      return sortDirection === 'desc' ? comparison : -comparison;
    });
    
    setFilteredProjects(result);
  }, [projects, searchQuery, tabValue, sortBy, sortDirection, languageFilter, bookmarkedProjects]);

  // Handle sort menu open
  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  // Handle sort menu close
  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  // Handle filter menu open
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  // Handle filter menu close
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Toggle project bookmark
  const toggleBookmark = (projectId) => {
    const updated = bookmarkedProjects.includes(projectId)
      ? bookmarkedProjects.filter(id => id !== projectId)
      : [...bookmarkedProjects, projectId];
    
    setBookmarkedProjects(updated);
    localStorage.setItem('bookmarkedProjects', JSON.stringify(updated));
  };

  // Skeleton loading state
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" gutterBottom className="gradient-text">
              My Projects
            </Typography>
            <Skeleton variant="rectangular" width={300} height={40} />
          </Box>
          
          <Skeleton variant="rectangular" height={48} width="100%" sx={{ mb: 3, borderRadius: 1 }} />
          
          <Box className="project-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} sx={{ height: '100%' }}>
                <CardContent>
                  <Skeleton variant="text" height={32} width="80%" />
                  <Skeleton variant="text" height={20} width="40%" sx={{ mb: 1 }} />
                  <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Skeleton variant="rounded" height={24} width={60} />
                    <Skeleton variant="rounded" height={24} width={60} />
                  </Box>
                  <Skeleton variant="text" height={24} width="60%" />
                </CardContent>
                <CardActions>
                  <Skeleton variant="rounded" height={36} width={120} />
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" color="error">{error}</Typography>
            <Typography sx={{ mt: 2 }}>
              Please check your connection and try again.
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  // No projects found
  if (projects.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom className="gradient-text">
            My Projects
          </Typography>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
            <FolderIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
            <Typography variant="h5" gutterBottom>No projects found</Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary">
              This GitHub account doesn't have any public repositories yet.
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  // No filtered projects found
  if (filteredProjects.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" className="gradient-text">
              My Projects
            </Typography>
            <TextField
              placeholder="Search projects..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 250 }}
            />
          </Box>
          
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="All Projects" value="all" />
              <Tab label="Bookmarked" value="bookmarked" />
              <Tab label="Source" value="source" />
              <Tab label="Forked" value="forked" />
            </Tabs>
          </Paper>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Button 
                startIcon={<SortIcon />}
                onClick={handleSortClick}
                variant="outlined"
                size="small"
                sx={{ mr: 1 }}
              >
                Sort by: {sortBy}
              </Button>
              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={handleSortClose}
              >
                <MenuItem onClick={() => { setSortBy('updated'); handleSortClose(); }}>
                  Recently Updated
                </MenuItem>
                <MenuItem onClick={() => { setSortBy('stars'); handleSortClose(); }}>
                  Stars
                </MenuItem>
                <MenuItem onClick={() => { setSortBy('name'); handleSortClose(); }}>
                  Name
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { 
                  setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc'); 
                  handleSortClose(); 
                }}>
                  {sortDirection === 'desc' ? 'Descending ↓' : 'Ascending ↑'}
                </MenuItem>
              </Menu>
              
              <Button 
                startIcon={<FilterListIcon />}
                onClick={handleFilterClick}
                variant="outlined"
                size="small"
              >
                Language: {languageFilter === 'all' ? 'All' : languageFilter}
              </Button>
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleFilterClose}
              >
                {languages.map(lang => (
                  <MenuItem 
                    key={lang} 
                    onClick={() => { setLanguageFilter(lang); handleFilterClose(); }}
                  >
                    {lang === 'all' ? 'All Languages' : lang}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            
            <Typography variant="body2" color="text.secondary">
              Showing 0 of {projects.length} repositories
            </Typography>
          </Box>
          
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
            <SearchIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
            <Typography variant="h5" gutterBottom>No matching projects found</Typography>
            <Typography sx={{ mt: 1 }} color="text.secondary">
              Try adjusting your search or filter criteria.
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              sx={{ mt: 3 }}
              onClick={() => {
                setSearchQuery('');
                setTabValue('all');
                setLanguageFilter('all');
              }}
            >
              Clear all filters
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" className="gradient-text">
            My Projects
          </Typography>
          <TextField
            placeholder="Search projects..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 250 }}
          />
        </Box>
        
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="All Projects" value="all" />
            <Tab label="Bookmarked" value="bookmarked" />
            <Tab label="Source" value="source" />
            <Tab label="Forked" value="forked" />
          </Tabs>
        </Paper>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Button 
              startIcon={<SortIcon />}
              onClick={handleSortClick}
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
            >
              Sort by: {sortBy}
            </Button>
            <Menu
              anchorEl={sortAnchorEl}
              open={Boolean(sortAnchorEl)}
              onClose={handleSortClose}
            >
              <MenuItem onClick={() => { setSortBy('updated'); handleSortClose(); }}>
                Recently Updated
              </MenuItem>
              <MenuItem onClick={() => { setSortBy('stars'); handleSortClose(); }}>
                Stars
              </MenuItem>
              <MenuItem onClick={() => { setSortBy('name'); handleSortClose(); }}>
                Name
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => { 
                setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc'); 
                handleSortClose(); 
              }}>
                {sortDirection === 'desc' ? 'Descending ↓' : 'Ascending ↑'}
              </MenuItem>
            </Menu>
            
            <Button 
              startIcon={<FilterListIcon />}
              onClick={handleFilterClick}
              variant="outlined"
              size="small"
            >
              Language: {languageFilter === 'all' ? 'All' : languageFilter}
            </Button>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
            >
              {languages.map(lang => (
                <MenuItem 
                  key={lang} 
                  onClick={() => { setLanguageFilter(lang); handleFilterClose(); }}
                >
                  {lang === 'all' ? 'All Languages' : lang}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            Showing {filteredProjects.length} of {projects.length} repositories
          </Typography>
        </Box>
        
        <Box className="project-grid">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {project.archived && (
                <Box className="status-indicator status-archived" title="Archived Repository" />
              )}
              
              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    {project.name}
                    {project.fork && (
                      <ForkRightIcon fontSize="small" color="action" sx={{ ml: 0.5 }} title="Forked Repository" />
                    )}
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => toggleBookmark(project.id)}
                    color={bookmarkedProjects.includes(project.id) ? 'secondary' : 'default'}
                  >
                    {bookmarkedProjects.includes(project.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2, 
                    height: '40px', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' 
                  }}
                >
                  {project.description || 'No description available'}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {project.language && (
                    <Chip 
                      icon={<CodeIcon />} 
                      label={project.language} 
                      size="small" 
                      variant="outlined" 
                      className="project-tag"
                      sx={{ 
                        borderColor: getLanguageColor(project.language),
                        '& .MuiChip-icon': { color: getLanguageColor(project.language) }
                      }}
                    />
                  )}
                  
                  {project.stargazers_count > 0 && (
                    <Chip 
                      icon={<StarIcon />} 
                      label={project.stargazers_count} 
                      size="small" 
                      color="secondary" 
                      variant="outlined"
                      className="project-tag"
                    />
                  )}
                  
                  {project.forks_count > 0 && (
                    <Chip 
                      icon={<ForkRightIcon />} 
                      label={project.forks_count} 
                      size="small" 
                      variant="outlined"
                      className="project-tag"
                    />
                  )}
                </Box>
                
                <Divider sx={{ my: 1.5 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <UpdateIcon fontSize="small" color="action" />
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                      {formatDate(project.updated_at)}
                    </Typography>
                  </Box>
                  
                  {project.visibility && (
                    <Chip 
                      icon={<VisibilityIcon />} 
                      label={project.visibility} 
                      size="small" 
                      color={project.visibility === 'public' ? 'success' : 'warning'} 
                      variant="outlined"
                      sx={{ height: 24 }}
                    />
                  )}
                </Box>
              </CardContent>
              
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button 
                  size="small" 
                  startIcon={<GitHubIcon />}
                  component={Link}
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  variant="outlined"
                  sx={{ borderRadius: 4 }}
                >
                  View on GitHub
                </Button>
                
                {project.homepage && (
                  <Button 
                    size="small"
                    component={Link}
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer" 
                    endIcon={<LaunchIcon />}
                    sx={{ borderRadius: 4 }}
                  >
                    Demo
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Projects;