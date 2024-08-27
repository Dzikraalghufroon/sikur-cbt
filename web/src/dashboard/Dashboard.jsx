import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import Sidenav from '../komponen/navbar/navbar'
// import { Container, Row, Col, Nav, Button } from 'react-bootstrap';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
            } else {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}`, {
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
        await axios.post(`${import.meta.env.VITE_SERVER}/logout`);
        localStorage.removeItem('token');
        navigate('/signin');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

  return (
    <div>

      <button onClick={handleLogout}>Asu</button>
      <Sidenav></Sidenav>
      
    </div>
  );
};

export default Dashboard;
