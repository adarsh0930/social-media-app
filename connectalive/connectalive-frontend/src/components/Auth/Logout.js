// src/components/Auth/Logout.js
import React, { useEffect } from 'react';
import api from '../../utils/authApi';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            const token = localStorage.getItem('token');
            await api.post('/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.removeItem('token');
            navigate('/login');
        };
        logout();
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default Logout;
