import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const SignIn = () => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      navigate('/user-dashboard');
    }
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/signin/user`, { name, pass }, { withCredentials: true });
      if (response.data.stat) {
        localStorage.setItem('userToken', response.data.data.token);
        setMessage('Sign-in successful!');
        setSuccess(true);
        navigate('/user-dashboard');
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

    <div className={styles.pageContainer}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src="img-01.png" alt="Login Illustration" className={styles.loginImage} />
        </div>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSignIn}>
            <h2 className={styles.title}>Sign In Siswa</h2>
            <label className={styles.label} htmlFor="name">Name:</label>
            <input
              className={styles.input}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className={styles.label} htmlFor="pass">Password:</label>
            <div className={styles.passwordWrapper}>
              <input
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                id="pass"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.hide}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button className={styles.button} type="submit">Sign In</button>
            {message && (
              <p className={`${styles.message} ${success ? styles.success : styles.error}`}>{message}</p>
            )}
          </form>
          <button className={styles.logout} onClick={()=>navigate("/admin-signin")}>Login sebagai Operator</button>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
