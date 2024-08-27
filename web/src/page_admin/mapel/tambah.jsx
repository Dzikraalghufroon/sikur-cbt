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
      const response = await axios.post(`${import.meta.env.VITE_SERVER}/tambah_mapel`, { name })//('http://localhost:2000/mapel', { name });
      setMessage(response.data.text);
      if (response.data.stat) {
        navigate('/mapel');
      }
    } catch (error) {
      setMessage('Data gagal ditambah');
    }
    setMessage('Pelajaran berhasil ditambahkan');
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
          <h2 className={styles.title}>Tambah Pelajaran</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="name">Nama Pelajaran:</label>
            <input
              className={styles.input}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan Nama Pelajaran"
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

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../../komponen/navbar/navbar';
// import styles from './setting.module.css';

// const Mapel = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_SERVER}/tambah_mapel`, { name })//('http://localhost:2000/mapel', { name });
//       setMessage(response.data.text);
//       if (response.data.stat) {
//         navigate('/mapel');
//       }
//     } catch (error) {
//       setMessage('Data gagal ditambah');
//     }
//   };

//   return (

//     <div>
//       <Navbar></Navbar>
//       <div className={styles.containerTambah}>
//         <button className={styles.backButton}>Kembali</button>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <h2 className={styles.title}>Tambah Pelajaran</h2>
//           <label className={styles.label} htmlFor="name">Nama Pelajaran:</label>
//           <input
//             className={styles.input}
//             type="text"
//             id="name"
//             placeholder="Masukkan Nama Pelajaran"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <div className={styles.buttonGroup}>
//             <button className={styles.submitButton} type="submit">Simpan</button>
//             <button className={styles.resetButton} type="button" onClick={handleReset}>Reset</button>
//           </div>
//           {message && (
//             <p>{message}</p>
//           )}
//         </form>
//         {/* <Navbar /> */}
//       </div>
//     </div>

//   );
// };

// export default Mapel;
