import axios from 'axios';

const api = axios.create({
  baseURL: process.env.POSTGRES_URI ?? process.env.NEXT_PUBLIC_POSTGRES_URI,
});

export default api;
