import axios from 'axios';

/**
 * Fetching the repositories with given parameters using `axios` library
 * @param {string} repoName Searched repository name
 * @param {number} page Page number of the items
 * @param {number} itemPerPage Number of items displayed per page
 * @return {Promise} Promise for the API response
 */
export const fetchRepositories = (repoName, page, itemPerPage) => {
  const endpoint = `https://api.github.com/search/repositories`;
  
  const response = axios.get(`${endpoint}?q=${repoName} in:name&page=${page}&per_page=${itemPerPage}`);
  return response;
}