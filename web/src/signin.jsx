import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/SignIn.css';

const SignIn = () => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/test');
    }
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/siswa-login`, { name, pass });
      if (response.data.stat) {
        localStorage.setItem('token', response.data.data.token);
        setMessage('Sign-in successful!');
        setSuccess(true);
        navigate('/dashboard'); // Redirect to dashboard on successful sign in
      } else {
        setMessage(response.data.text);
        setSuccess(false);
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      setMessage('Sign-in failed. Please try again.');
      setSuccess(false);
    }
  };

  return (
    <dir>
    <div className="container-utama">
      <form className="form" onSubmit={handleSignIn}>
        <h2 className="title">Sign In Siswa</h2>
        <label className="label" htmlFor="name">Name:</label>
        <input
          className="input"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="label" htmlFor="pass">Password:</label>
        <input
          className="input"
          type="password"
          id="pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <button className="button" type="submit">Sign In</button>
        {message && (
          <p className={`message ${success ? 'success' : 'error'}`}>{message}</p>
        )}
      </form>
    </div>
    
    </dir>
  );
};

export default SignIn;
