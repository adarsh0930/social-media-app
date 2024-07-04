// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';  // Adjust the base URL as needed

export const signup = async (userData) => {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};
