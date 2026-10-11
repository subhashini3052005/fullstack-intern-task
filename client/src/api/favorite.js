
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/favorites';

export const getFavorites = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const addFavorite = async (templateId) => {
  const token = localStorage.getItem('token');

  const response = await axios.post(
    `${API_URL}/${templateId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const removeFavorite = async (templateId) => {
  const token = localStorage.getItem('token');

  const response = await axios.delete(
    `${API_URL}/${templateId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
