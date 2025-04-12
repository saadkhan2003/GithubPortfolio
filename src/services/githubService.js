import axios from 'axios';

// GitHub API base URL
const BASE_URL = 'https://api.github.com';

// Replace with your GitHub username when using the app
const DEFAULT_USERNAME = 'yourusername';

/**
 * Service to interact with GitHub API
 */
const githubService = {
  /**
   * Get user profile data
   * @param {string} username - GitHub username
   * @returns {Promise} User profile data
   */
  getUserProfile: async (username = DEFAULT_USERNAME) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  /**
   * Get user repositories
   * @param {string} username - GitHub username
   * @param {number} perPage - Number of repos per page
   * @returns {Promise} User repositories
   */
  getUserRepos: async (username = DEFAULT_USERNAME, perPage = 100) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/${username}/repos?per_page=${perPage}&sort=updated&direction=desc`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user repositories:', error);
      throw error;
    }
  },

  /**
   * Get user contributions (events)
   * @param {string} username - GitHub username
   * @returns {Promise} User events/contributions
   */
  getUserContributions: async (username = DEFAULT_USERNAME) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${username}/events?per_page=100`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user contributions:', error);
      throw error;
    }
  },

  /**
   * Get user stats (stars, forks, etc.)
   * @param {string} username - GitHub username
   * @returns {Promise} Object containing user stats
   */
  getUserStats: async (username = DEFAULT_USERNAME) => {
    try {
      const repos = await githubService.getUserRepos(username);
      
      // Calculate stats
      const stats = {
        totalStars: 0,
        totalForks: 0,
        totalWatchers: 0,
        languages: {},
        starsPerRepo: [],
      };
      
      repos.forEach(repo => {
        stats.totalStars += repo.stargazers_count;
        stats.totalForks += repo.forks_count;
        stats.totalWatchers += repo.watchers_count;
        
        // Add language data
        if (repo.language) {
          stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1;
        }
        
        stats.starsPerRepo.push({
          name: repo.name,
          stars: repo.stargazers_count
        });
      });
      
      // Sort repos by stars
      stats.starsPerRepo.sort((a, b) => b.stars - a.stars);
      
      return stats;
    } catch (error) {
      console.error('Error calculating user stats:', error);
      throw error;
    }
  }
};

export default githubService;