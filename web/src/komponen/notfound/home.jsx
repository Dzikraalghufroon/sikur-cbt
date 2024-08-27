import React from 'react';
import Styles from './Home.module.css'; 
//import Gambar from './bg.png';

const NotFound = () => {
  return (
    <div className={Styles.pageContainer} >
      
      <nav className={Styles.navbar}>
        <div className={Styles.navLogo}>Sikur-CBT</div>
        <ul className={Styles.navLinks}>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      <main className={Styles.mainContent}>
        <div className={Styles.errorContainer}>
          <h1 className={Styles.errorCode}>404</h1>
          <h2 className={Styles.errorMessage}>Halaman yang Anda Tuju Tidak Tersedia</h2>
          <p className={Styles.suggestion}>Coba periksa URL atau kembali ke halaman sebelumnya.</p>
          <a href="/" className={Styles.homeButton}>Kembali ke Beranda</a>
        </div>
      </main>

      <footer className={Styles.footer}>
        <p>&copy; 2024 Sikur. All Rights Reserved.</p>
        <ul className={Styles.footerLinks}>
          <li><a href="/about">TENTANG</a></li>
          <li><a href="/contact">CONTACT</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default NotFound;
