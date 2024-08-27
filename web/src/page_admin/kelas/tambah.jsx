import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css';
import axios from 'axios';
import Navbar from '../../komponen/navbar/navbar';

const TambahPelajaran = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/tambah_kelas`, {name})//('http://localhost:2000/kelas', { name });
      setMessage(response.data.text);
      if (response.data.stat) {
        navigate('/kelas');
      }
    } catch (error) {
      setMessage('Data gagal ditambah / data sudah ada');
    }
  };

  const handleReset = () => {
    setName('');
    setMessage('');
  };

  return (
    <div>
      <Navbar/>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>← Kembali</button>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Tambah Kelas</h2>
          <p>(Format kelas contoh: 12.IPA.1 (tanpa spasi))</p><br /><br />
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="name">Nama kelas:</label>
            <input
              className={styles.input}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan Nama kelas"
              required
            />
            <div className={styles.buttonGroup}>
              <button className={styles.saveButton} type="submit">Simpan</button>
              <button className={styles.resetButton} type="button" onClick={handleReset}>Reset</button>
            </div>
            {message && (
              <p>{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TambahPelajaran;
