import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getRecommendations = async (data) => {
  const res = await axios.post(`${BACKEND_URL}/api/recommend`, data);
  return res.data;
};
