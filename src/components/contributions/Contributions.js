import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent, Skeleton } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import githubService from '../../services/githubService';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Contributions = ({ username }) => {
  const [contributionData, setContributionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        // Fetch events from the GitHub API
        const events = await githubService.getUserContributions(username);
        
        // Process the event data
        const processedData = processContributionData(events);
        setContributionData(processedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load contribution data. Please try again.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchContributions();
  }, [username]);

  // Process GitHub events into chart data
  const processContributionData = (events) => {
    // Group events by type
    const eventTypes = {};
    const eventsByDate = {};
    
    // Get last 30 days for our chart
    const dates = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dates.push(dateStr);
      eventsByDate[dateStr] = 0;
    }
    
    // Count events by type and date
    events.forEach(event => {
      // Count by type
      const type = event.type;
      eventTypes[type] = (eventTypes[type] || 0) + 1;
      
      // Count by date (for the activity chart)
      const eventDate = event.created_at.split('T')[0];
      if (eventsByDate[eventDate] !== undefined) {
        eventsByDate[eventDate] += 1;
      }
    });
    
    // Prepare chart data for activity over time
    const activityData = {
      labels: dates.map(date => {
        const [, month, day] = date.split('-'); // Removed unused 'year' variable
        return `${month}/${day}`;
      }),
      datasets: [
        {
          label: 'Activity',
          data: dates.map(date => eventsByDate[date] || 0),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    // Sort event types by count
    const sortedEventTypes = Object.entries(eventTypes)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    
    return {
      eventTypes: sortedEventTypes,
      activityData,
      totalEvents: events.length,
    };
  };

  // Skeleton loading state
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            My Contributions
          </Typography>
          
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Skeleton variant="rectangular" height={300} />
          </Paper>
          
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Card>
                  <CardContent>
                    <Skeleton variant="text" height={40} />
                    <Skeleton variant="text" height={60} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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

  // No contribution data
  if (!contributionData || contributionData.totalEvents === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            My Contributions
          </Typography>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">No recent contribution data found</Typography>
            <Typography sx={{ mt: 2 }}>
              No public GitHub activity in the last 90 days.
            </Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Recent GitHub Activity',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} events`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Events'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    },
  };

  // Convert event types to cards
  const eventTypeCards = Object.entries(contributionData.eventTypes)
    .slice(0, 4) // Show only top 4 event types
    .map(([type, count]) => {
      // Create a more user-friendly label
      const typeLabel = type.replace('Event', '').split(/(?=[A-Z])/).join(' ');
      
      return (
        <Grid item xs={12} sm={6} md={3} key={type}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {typeLabel}
              </Typography>
              <Typography variant="h4" color="primary">
                {count}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                contributions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          My Contributions
        </Typography>
        
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Bar options={chartOptions} data={contributionData.activityData} height={80} />
        </Paper>
        
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Contribution Summary
        </Typography>
        
        <Grid container spacing={3}>
          {eventTypeCards}
        </Grid>
      </Box>
    </Container>
  );
};

export default Contributions;