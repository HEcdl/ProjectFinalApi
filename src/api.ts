import axios from 'axios';

const API_URL = 'https://randomuser.me/api/';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};