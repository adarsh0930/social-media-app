// src/components/Auth/Login.js
import React, { useState } from 'react';
import api from '../../utils/authApi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;

  form {
    width: 300px;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({ identifier: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', formData);
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        setMessage('Login successful');
        const redirectPath = response?.data?.message === 'Complete your profile' ? '/complete-profile' : '/profile';
        navigate(redirectPath);
      } else {
        setMessage('Login failed');
      }
    } catch (error) {
      setMessage(error?.response?.data?.error || 'Login failed');
    }
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="text" name="identifier" placeholder="Username or Email" value={formData.identifier} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
        <p>{message}</p>
      </form>
    </LoginContainer>
  );
};

export default Login;
