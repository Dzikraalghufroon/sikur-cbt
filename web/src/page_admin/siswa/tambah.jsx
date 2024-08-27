import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './setting.module.css';
import Navbar from '../../komponen/navbar/navbar';

const Siswa = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [nisn, setNisn] = useState('');
  const [kelas, setKelas] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [kelasList, setKelasList] = useState([]); 

  useEffect(() => {

    const fetchKelas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_kelas`)//('http://localhost:2000/read-kelas');
        setKelasList(response.data); 
      } catch (error) {
        console.error('Error fetching kelas data', error);
      }
    };

    fetchKelas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/tambah_siswa`, { name, nisn, kelas, jenisKelamin, password })//('http://localhost:2000/siswa', { name, nisn, kelas, jenisKelamin, password });
      setMessage(response.data.text);
      if (response.data.stat) {
        navigate('/siswa');
      }
    } catch (error) {
      setMessage('Data gagal ditambah');
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>← Kembali</button>
        <form className={styles.formcontainer} onSubmit={handleSubmit}>
          <h1>Tambah Siswa</h1>
          <div className={styles.form}>
            <label htmlFor="name" className={styles.label}>Nama:</label>
            <input
              type="text"
              id="name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.form}>
            <label htmlFor="nisn" className={styles.label}>NISN:</label>
            <input
              type="number"
              id="nisn"
              className={styles.input}
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              required
            />
          </div>
          <div className={styles.form}>
            <label htmlFor="kelas" className={styles.label}>Kelas:</label>
            <select
              id="kelas"
              className={styles.input}
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              required
            >
              <option value="">Pilih kelas</option>
              {kelasList.map((kelasItem) => (
                <option key={kelasItem.id} value={kelasItem.nama}>
                  {kelasItem.nama}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.form}>
            <label htmlFor="jenisKelamin" className={styles.label}>Jenis Kelamin:</label>
            <select
              id="jenisKelamin"
              className={styles.input}
              value={jenisKelamin}
              onChange={(e) => setJenisKelamin(e.target.value)}
              required
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>
          <div className={styles.form}>
            <label htmlFor="password" className={styles.label}>Password:</label>
            <input
              type="text"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>Tambah</button>
          {message && <p>{message}</p>}
        </form>
      </div> 
    </div>
  );
};

export default Siswa;
