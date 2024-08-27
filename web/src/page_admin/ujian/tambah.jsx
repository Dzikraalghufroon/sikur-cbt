import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './setting.module.css';
import Navbar from '../../komponen/navbar/navbar';

const Siswa = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mapel, setMapel] = useState([]);
  const [selectedMapel, setSelectedMapel] = useState([]);
  const [kelasList, setKelasList] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState('');
  const [deskripsi, setdeskripsi] = useState('');
  const [acakSoal, setsoal] = useState('');
  const [acakJawaban, setjawaban] = useState('');
  const [nilai, setnilai] = useState('');
  const [durasi, setDurasi] = useState('');
  const [message, setMessage] = useState('');
  const [banksoal, setbanksoal] = useState([]);
  const [selectedbanksoal, setselectedbanksoal] = useState([]);

  useEffect(() => {
    const fetchKelas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_kelas`);//('http://localhost:2000/read-kelas');
        setKelasList(response.data);
      } catch (error) {
        console.error('Error fetching kelas data', error);
      }
    };

    fetchKelas();
  }, []);

  useEffect(() => {
    const fetchMapel = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_mapel`);//('http://localhost:2000/read-mapel');
        setMapel(response.data);
      } catch (error) {
        console.error("gagal", error);
      };
    };
    fetchMapel();
  }, [])

  useEffect(() => {
    const fetchbanksoal = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_banksoal`);//('http://localhost:2000/read-banksoal');
        setbanksoal(response.data);
      } catch (error) {
        console.error("gagal", error);
      };
    };
    fetchbanksoal();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const acakSoalInt = parseInt(acakSoal, 10);
    const acakJawabanInt = parseInt(acakJawaban, 10);
    const nilaiInt = parseInt(nilai, 10);

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/tambah_ujian`,{//('http://localhost:2000/ujian', {
        mapel: selectedMapel,
        banksoal: selectedbanksoal,
        kelas: selectedKelas,
        deskripsi,
        acakSoal: acakSoalInt,
        acakJawaban: acakJawabanInt,
        nilai: nilaiInt,
        durasi
      });
      setMessage(response.data.text);
      if (response.data.stat) {
        navigate('/ujian');
      }
    } catch (error) {
      setMessage('Data gagal ditambah');
    }
  };
  

  return (
    <div>
<Navbar></Navbar>
      <br /><br /><br /><br />
      <div className={styles.containerTambah}>
        <form className={styles.form} onSubmit={handleSubmit}><br /><br /><br />
          <h1>Tambah Ujian</h1>
          {/* <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Nama:</label>
            <input
              type="text"
              id="name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div> */}
          <div className={styles.formGroup}>
            <label htmlFor="mapel" className={styles.label}>Mata Pelajaran:</label>
            <select
              id="mapel"
              className={styles.input}
              value={selectedMapel}
              onChange={(e) => setSelectedMapel(e.target.value)}
              required
            >
              <option value="">Pilih Mata Pelajaran</option>
              {mapel.map((mapelItem) => (
                <option key={mapelItem.id} value={mapelItem.nama}>
                  {mapelItem.nama}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="banksoal" className={styles.label}>Pilih banksoal:</label>
            <select
              id="banksoal"
              className={styles.input}
              value={selectedbanksoal}
              onChange={(e) => setselectedbanksoal(e.target.value)}
              required
            >
              <option value="">Pilih banksoal</option>
              {banksoal.map((mapelItem) => (
                <option key={mapelItem.id} value={mapelItem.name}>
                  {mapelItem.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="kelaslist" className={styles.label}>Kelas:</label>
            <select
              id="kelaslist"
              className={styles.input}
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
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
          <div className={styles.formGroup}>
            <label htmlFor="deskripsi" className={styles.label}>Deskripsi:</label>
            <input
              type="text"
              id="deskripsi"
              className={styles.input}
              value={deskripsi}
              onChange={(e) => setdeskripsi(e.target.value)}
              required
            />
          </div>
          {/* <div className={styles.formGroup}>
            <label htmlFor="acaksoal" className={styles.label}>Acak Soal:</label>
            <select
              id="acaksoal"
              className={styles.input}
              value={acakSoal}
              onChange={(e) => setsoal(e.target.value)}
              required
            >
              <option value="">Pilih Opsi</option>
              <option value="1">Ya</option>
              <option value="0">Tidak</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="acakjawaban" className={styles.label}>Acak Jawaban:</label>
            <select
              id="acakjawaban"
              className={styles.input}
              value={acakJawaban}
              onChange={(e) => setjawaban(e.target.value)}
              required
            >
              <option value="">Pilih Opsi</option>
              <option value="1">Ya</option>
              <option value="0">Tidak</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="nilai" className={styles.label}>Tampilkan nilai:</label>
            <select
              id="nilai"
              className={styles.input}
              value={nilai}
              onChange={(e) => setnilai(e.target.value)}
              required
            >
              <option value="">Pilih Opsi</option>
              <option value="1">Ya</option>
              <option value="0">Tidak</option>
            </select>
          </div> */}
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
                  setDurasi(value);
                }
              }}
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

/*
  useEffect(() => {
    const fetchMapel = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_banksoal`);//('http://localhost:2000/read-mapel');
        setMapel(response.data);
      } catch (error) {
        console.error("gagal", error);
      };
    };
    fetchMapel();
  }, []) */