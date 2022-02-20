import axios from 'axios';

export const fetchRepositories = (repoName, page, itemPerPage) => {
  const endpoint = `https://api.github.com/search/repositories`;
  
  const response = axios.get(`${endpoint}?q=${repoName} in:name&page=${page}&per_page=${itemPerPage}`);
  return response;
}