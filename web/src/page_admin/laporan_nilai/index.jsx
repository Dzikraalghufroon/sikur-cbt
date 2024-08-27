import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './setting.module.css';
import Navbar from '../../komponen/navbar/navbar'

const NilaiSiswa = () => {
    const [name, setName] = useState('');
    const [mapel, setmapel] = useState('');
    const navigate = useNavigate();
    const [page, setpage] = useState("");
    const [SiswaLiss, setSiswaLiss] = useState([]);


    useEffect(() => {

        const fetchKelas = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER}/read_kelas`);//('http://localhost:2000/read-soal');
                setSiswaLiss(response.data);
            } catch (error) {
                console.error('Error fetching kelas data', error);
            }
        };

        fetchKelas();
    }, []);




    return (
        <div>
            <Navbar></Navbar>
            <div className={styles.container}>
                <div>

                </div>
                <h2 className={styles.heading}>Lihat hasil ujian siswa</h2>
                <div className={styles.formGroup}>


                    <label htmlFor="kelas" className={styles.label}></label>
                    <select
                        id="kelas"
                        className={styles.input}
                        value={page}
                        onChange={(e) => setpage(e.target.value)}
                        required
                    >
                        <option value="">Pilih Kelas</option>
                        {SiswaLiss.map((kelasItem) => (
                            <option key={kelasItem.id} value={kelasItem.nama}>
                                {kelasItem.nama}
                            </option>
                        ))}
                    </select>
                    <Link to={`/nilai/${page}`}>
                        <button className={styles.button}>Masuk</button>
                    </Link>
                </div><br /><br /><br /><br />
                <h2 className={styles.heading}>Hapus status ujian</h2>
                <div className={styles.formGroup}>


                    <label htmlFor="kelas" className={styles.label}></label>
                    <select
                        id="kelas"
                        className={styles.input}
                        value={page}
                        onChange={(e) => setpage(e.target.value)}
                        required
                    >
                        <option value="">Pilih Kelas</option>
                        {SiswaLiss.map((kelasItem) => (
                            <option key={kelasItem.id} value={kelasItem.nama}>
                                {kelasItem.nama}
                            </option>
                        ))}
                    </select>
                    <Link to={`/status/ujian/${page}`}>
                        <button className={styles.button}>Masuk</button>
                    </Link>
                </div>
                
            </div>
        </div>
    );
};

export default NilaiSiswa;
