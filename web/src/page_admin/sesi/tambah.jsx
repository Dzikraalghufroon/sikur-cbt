import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './setting.module.css';
import Navbar from '../../komponen/navbar/navbar';

const Siswa = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [banksoal, setBanksoal] = useState([]);
  const [selectedBanksoal, setSelectedBanksoal] = useState('');
  const [status, setstatus] = useState('');
  const [jadwal, setJadwal] = useState('');
  const [durasi, setdurasi] = useState('');
  const [message, setMessage] = useState('');
  const [kelas, setkelas] = useState([]);
  const [selectedkelas, setSelectedkelas] = useState('');
  const [jadwal_berakhir, setjadwal_berakhir] = useState('');

  useEffect(() => {
    const fetchBanksoal = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_ujian_sesi`);
        setBanksoal(response.data);
      } catch (error) {
        console.error("Gagal mengambil data", error);
        setMessage('Gagal mengambil data');
      }
    };
    fetchBanksoal();
  }, []);

  useEffect(() => {
    const fetchkelas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_kelas`);
        setkelas(response.data);
      } catch (error) {
        console.error("Gagal mengambil data", error);
        setMessage('Gagal mengambil data');
      }
    };
    fetchkelas();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const statusInt = parseInt(status, 10);
    const durasiInt = parseInt(durasi, 10);

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/tambah_sesi`, {
        name,
        banksoal: selectedBanksoal,
        kelas: selectedkelas,
        status: statusInt,
        durasi:durasiInt,
        jadwal,
        jadwal_berakhir
      });
      setMessage(response.data.text);
      if (response.data.stat) {
        navigate('/sesi');
      }
    } catch (error) {
      setMessage('Data gagal ditambah');
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.containerTambah}>
        <form className={styles.form} onSubmit={handleSubmit}><br /><br />
          <h1>Tambah Ujian</h1>
          <div className={styles.formGroup}>
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
          <div className={styles.formGroup}>
            <label htmlFor="banksoal" className={styles.label}>Ujian:</label>
            <select
              id="banksoal"
              className={styles.input}
              value={selectedBanksoal}
              onChange={(e) => setSelectedBanksoal(e.target.value)}
              required
            >
              <option value="">Pilih ujian</option>
              {banksoal.map((banksoalItem) => (
                <option key={banksoalItem.id} value={banksoalItem.mapel}>
                  {banksoalItem.mapel}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="kelas" className={styles.label}>kelas:</label>
            <select
              id="kelas"
              className={styles.input}
              value={selectedkelas}
              onChange={(e) => setSelectedkelas(e.target.value)}
              required
            >
              <option value="">Pilih ujian</option>
              {kelas.map((kelasItem) => (
                <option key={kelasItem.id} value={kelasItem.nama}>
                  {kelasItem.nama}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status" className={styles.label}>status:</label>
            <select
              id="status"
              className={styles.input}
              value={status}
              onChange={(e) => setstatus(e.target.value)}
              required
            >
              <option value="">Pilih Opsi</option>
              <option value="1">Ya</option>
              <option value="0">Tidak</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="durasi" className={styles.label}>Durasi (dalam menit dan berupa angka):</label>
            <input
              type="text"
              id="durasi"
              className={styles.input}
              value={durasi}
              onChange={(e) => {
                const value = e.target.value;
                if (!isNaN(value) && Number.isInteger(Number(value))) {
                  setdurasi(value);
                }
              }}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="jadwal" className={styles.label}>Jadwal(mulai):</label>
            <input
              type="datetime-local"
              id="jadwal"
              className={styles.inputtanggal}
              value={jadwal}
              onChange={(e) => setJadwal(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="jadwal" className={styles.label}>Jadwal(berakhir):</label>
            <input
              type="datetime-local"
              id="jadwal"
              className={styles.inputtanggal}
              value={jadwal_berakhir}
              onChange={(e) => setjadwal_berakhir(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>Tambah</button>
          {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Siswa;
