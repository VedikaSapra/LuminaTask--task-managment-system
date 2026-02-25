import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await api.get('/missions/dashboard/');
                    setUser(response.data);
                } catch (error) {
                    console.error('Auth verification failed', error);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (username, password) => {
        const response = await api.post('/auth/login/', { username, password });
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        // Fetch user profile stats for the dashboard
        const profileResponse = await api.get('/missions/dashboard/');
        setUser(profileResponse.data);
        return response.data;
    };

    const refreshStats = async () => {
        try {
            const response = await api.get('/missions/dashboard/');
            setUser(response.data);
        } catch (error) {
            console.error('Failed to refresh hero stats', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    const updateProfile = async (profileData) => {
        const response = await api.put('/auth/profile/', profileData);
        setUser(response.data);
        return response.data;
    };

    return (
        <AuthContext.Provider value={{ user, setUser, refreshStats, updateProfile, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
