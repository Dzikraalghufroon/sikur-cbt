import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/signin');
                } else {
                    const response = await axios.get('http://localhost:5000/dashboard', {
                        headers: {
                            Authorization: token,
                        },
                    });
                    if (response.status !== 200) {
                        navigate('/signin');
                    }
                }
            } catch (error) {
                navigate('/signin');
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout');
            localStorage.removeItem('token');
            navigate('/signin');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
