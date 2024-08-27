import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../komponen/navbar/navbar'
import styles from './Editor.module.css';

const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.containerUtama}>
        <div className={styles.box}>
          <div >
            <img src="image/assets/1.png" alt="" className={styles.kelas} />
            <h2>Kelas</h2>
            <a href="/kelas" className={styles.abutton}>Lihat detail</a>
          </div>
        </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className={styles.box1}>
          <img src="image/assets/2.png" alt="" className={styles.kelas1} />
          <h2>Siswa</h2>
          <a href="/siswa" className={styles.abutton}>Lihat detail</a>
        </div>
      </div>
      <br /><br /><br /><br />
      <div>
        <div className={styles.containerUtama}>
          <div className={styles.box2}>
            <img src="image/assets/4.png" alt="" className={styles.kelas2} />
            <h2>Ujian</h2>
            <a href="/ujian" className={styles.abutton}>Lihat detail</a>
          </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div className={styles.box3}>
            <img src="image/assets/5.png" alt="" className={styles.kelas3} />
            <h2>Sesi Ujian</h2>
            <a href="/sesi" className={styles.abutton}>Lihat detail</a>
          </div>
        </div>
        <br /><br />
        <div className={styles.containerUtama}>
          <div className={styles.box4}>
            <img src="image/assets/6.png" alt="" className={styles.kelas4} />
            <h2>Bank Soal</h2>
            <a href="/banksoal" className={styles.abutton}>Lihat detail</a>
          </div>
        </div>
      </div>


      
    </div>
  );
};

export default Dashboard;
