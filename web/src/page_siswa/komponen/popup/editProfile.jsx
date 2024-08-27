import React, { useState } from 'react';
import axios from 'axios';
import Styles from './editProfile.module.css';

const EditProfile = ({ show, onConfirm, onCancel, message }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pesan, setpesan] = useState('Kirim');
  const [kensel, setkensel] = useState('Batal');
  const [placeholder1, setplaceholder1] = useState('Username ')
  const [placeholder2, setplaceholder2] = useState('Password ')

  if (!show) return null;

  const handleConfirm = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_SERVER}/update/admin`, {
        username: username,
        password: password
      });
      setpesan("Sudah terkirim");
      setkensel("OK");
      setUsername('');
      setPassword('');
      setplaceholder1('Username telah diupdate');
      setplaceholder2('Password telah diupdate');
    } catch (error) {
      console.error('Error updating profile:', error);
      setpesan("Terjadi kesalahan saat mengirim");
    }
  };

  return (
    <div className={Styles.modalBackdrop}>
      <div className={Styles.modalContent}>
        <h2>{message}</h2>
        <div className={Styles.modalButtons}>
          <input 
            type="text" 
            className={Styles.input} 
            placeholder={placeholder1} 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <input 
            type="text" 
            className={Styles.input} 
            placeholder={placeholder2} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button onClick={handleConfirm} className={Styles.confirmButton}>{pesan}</button>
          <button onClick={onCancel} className={Styles.cancelButton}>{kensel}</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
