// src/components/VerifyEmail.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import api from '../../utils/authApi';

const VerifyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const params = new URLSearchParams(location.search);
                const token = params.get('token');
                await axios.get(`http://localhost:4000/auth/verify-email?token=${token}`);
                setMessage('Email verified successfully! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error) {
                setMessage('Verification failed. Invalid or expired token.');
            }
        };
        verifyEmail();
    }, [location, navigate]);

    return (
        <VerifyContainer>
            <h2>{message}</h2>
        </VerifyContainer>
    );
};

export default VerifyEmail;